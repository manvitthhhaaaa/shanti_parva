import os
import requests
import json
from typing import List, Dict, Any, Optional
from app.models.schemas import ChatRequest, ChatResponse, PassageMetadata, BhishmaRequest, BhishmaResponse
from app.rag.theme_classifier import classify_themes
from app.rag.rag_engine import rag_engine

GEMINI_SYSTEM_INSTRUCTION = """You are Shanti AI.

Use the retrieved Shanti Parva source material as the factual basis for claims about Shanti Parva.

Never invent quotations, verses, chapter numbers, section numbers, or teachings.

If the retrieved material is insufficient, explicitly say that the available source material is insufficient.

Clearly distinguish:

SOURCE
INTERPRETATION
MODERN REFLECTION

Do not present AI interpretation as an ancient quotation."""

SAFETY_DISCLAIMER_TEXT = (
    "IMPORTANT NOTE: Philosophical reflection on ancient wisdom is intended for moral clarity, self-examination, "
    "and personal perspective. It is NOT a substitute for professional medical diagnosis, mental health therapy, "
    "legal counsel, or emergency assistance. If you are experiencing a crisis or severe distress, please consult a qualified professional."
)

class LLMService:
    def __init__(self):
        self.gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        self.openai_key = os.getenv("OPENAI_API_KEY")

    def generate_chat_response(self, request: ChatRequest) -> ChatResponse:
        user_query = request.message.strip()
        
        # 1. Theme classification (20 Themes)
        themes = classify_themes(user_query)
        
        # 2. RAG Retrieval
        retrieved_sources, debug_info = rag_engine.retrieve(user_query, top_k=2)

        if not retrieved_sources:
            return ChatResponse(
                user_concern_summary=f"You expressed a concern regarding: '{user_query}'",
                themes=themes,
                sources=[],
                teaching_explanation="The available source material does not provide enough evidence for this specific query.",
                modern_perspective="Without retrieved source material, Shanti AI refrains from generating ungrounded claims.",
                reflection_questions=[
                    "What core principle matters most to you in this situation?",
                    "How can thoughtful reflection bring clarity to your decision?"
                ],
                important_note=SAFETY_DISCLAIMER_TEXT,
                is_demo_mode=True if not self.gemini_key else False,
                retrieval_debug=debug_info
            )

        primary_source = retrieved_sources[0]

        # 3. If Gemini Key is present and live API requested, call Gemini API
        if self.gemini_key and request.use_live_api:
            gemini_res = self._call_gemini_api(user_query, retrieved_sources, themes)
            if gemini_res:
                gemini_res.retrieval_debug = debug_info
                return gemini_res

        # 4. Fallback Grounded Engine (Demo Mode)
        summary_text = self._build_concern_summary(user_query)
        explanation_text = self._build_explanation(primary_source)
        modern_perspective_text = self._build_modern_perspective(user_query, primary_source, themes)
        reflection_questions = self._build_reflection_questions(themes, primary_source)

        return ChatResponse(
            user_concern_summary=summary_text,
            themes=themes,
            sources=retrieved_sources,
            teaching_explanation=explanation_text,
            modern_perspective=modern_perspective_text,
            reflection_questions=reflection_questions,
            important_note=SAFETY_DISCLAIMER_TEXT,
            is_demo_mode=True if not self.gemini_key else False,
            retrieval_debug=debug_info
        )

    def generate_bhishma_response(self, request: BhishmaRequest) -> BhishmaResponse:
        situation = request.situation.strip()
        themes = classify_themes(situation)
        retrieved_sources, _ = rag_engine.retrieve(situation, top_k=1)
        
        if not retrieved_sources:
            from app.services.kb_service import kb_service
            primary_source = kb_service.get_all_passages()[0]
        else:
            primary_source = retrieved_sources[0]

        situation_summary = f"You described a situation involving: '{situation}'"
        relevant_principle = primary_source.summary
        ai_interpretation = (
            f"Relevant teachings associated with Bhishma's discourse in Shanti Parva emphasize that when facing {', '.join(themes).lower()}, "
            f"a wise leader acts not out of emotional impulse or immediate desire, but through enduring duty ({primary_source.part or 'Rajadharma'}). "
            f"Bhishma's dialogue with Yudhishthira stresses prioritizing long-term stewardship over temporary friction."
        )
        reflections = [
            "What long-term consequences will your choice produce beyond immediate benefit?",
            "If your action were evaluated by a trusted mentor, would it stand the test of integrity?",
            "What would change if you approached this challenge with emotional calm rather than urgency?"
        ]

        return BhishmaResponse(
            situation_summary=situation_summary,
            relevant_principle=relevant_principle,
            source=primary_source,
            ai_interpretation=ai_interpretation,
            reflection=reflections,
            is_demo_mode=True if not self.gemini_key else False
        )

    def _call_gemini_api(self, query: str, sources: List[PassageMetadata], themes: List[str]) -> Optional[ChatResponse]:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.gemini_key}"
            
            context_text = "\n\n".join([
                f"Source [{s.id}]: Parva: {s.parva}, Part: {s.part}, Section: {s.section}, Chapter: {s.chapter}, URL: {s.source_url}\n"
                f"Translation: \"{s.translation}\"\nSummary: {s.summary}"
                for s in sources
            ])

            prompt = f"""{GEMINI_SYSTEM_INSTRUCTION}

USER QUERY: "{query}"

RETRIEVED SHANTI PARVA CONTEXT:
{context_text}

Respond in valid JSON with this exact schema:
{{
  "user_concern_summary": "...",
  "teaching_explanation": "...",
  "modern_perspective": "...",
  "reflection_questions": ["Q1", "Q2", "Q3"]
}}"""

            headers = {"Content-Type": "application/json"}
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"temperature": 0.2, "responseMimeType": "application/json"}
            }

            res = requests.post(url, headers=headers, json=payload, timeout=10)
            if res.status_code == 200:
                result_json = res.json()
                text_content = result_json["candidates"][0]["content"]["parts"][0]["text"]
                parsed = json.loads(text_content)
                return ChatResponse(
                    user_concern_summary=parsed.get("user_concern_summary", f"Concern regarding '{query}'"),
                    themes=themes,
                    sources=sources,
                    teaching_explanation=parsed.get("teaching_explanation", sources[0].translation),
                    modern_perspective=parsed.get("modern_perspective", "AI Interpretation grounded in source."),
                    reflection_questions=parsed.get("reflection_questions", ["What outcome do you want?"]),
                    important_note=SAFETY_DISCLAIMER_TEXT,
                    is_demo_mode=False
                )
        except Exception as e:
            print("Gemini API call failed, falling back to grounded demo mode:", e)
        return None

    def _build_concern_summary(self, query: str) -> str:
        q_lower = query.lower()
        if "angry" in q_lower or "anger" in q_lower or "revenge" in q_lower or "mad" in q_lower or "krodha" in q_lower:
            return "You are dealing with feelings of anger, resentment, or an impulse to react to disrespect or conflict."
        elif "fail" in q_lower or "afraid" in q_lower or "fear" in q_lower or "anxiety" in q_lower:
            return "You are navigating anxiety, fear of failure, or uncertainty regarding your future path and capabilities."
        elif "grief" in q_lower or "losing" in q_lower or "loss" in q_lower or "sorrow" in q_lower:
            return "You are processing sorrow, separation, or the pain of losing someone or something meaningful."
        elif "conflict" in q_lower or "fight" in q_lower or "enmity" in q_lower:
            return "You are experiencing interpersonal tension or conflict, seeking a constructive resolution."
        elif "decision" in q_lower or "choose" in q_lower or "dilemma" in q_lower:
            return "You are facing an important decision or moral dilemma, weighing personal desire against responsibility."
        elif "responsibility" in q_lower or "duty" in q_lower or "role" in q_lower:
            return "You are reflecting on your moral responsibilities, duty, and governance in your personal or professional life."
        else:
            return f"You are seeking philosophical perspective and moral clarity regarding: '{query}'."

    def _build_explanation(self, source: PassageMetadata) -> str:
        return (
            f"In {source.part or 'Shanti Parva'} ({source.section}, Chapter {source.chapter}), the teaching states: "
            f"\"{source.translation}\" "
            f"This passage highlights that {source.summary.lower()}"
        )

    def _build_modern_perspective(self, query: str, source: PassageMetadata, themes: List[str]) -> str:
        return (
            f"(AI Interpretation) From a contemporary perspective, the ancient teaching of {source.themes[0] if source.themes else 'Dharma'} in {source.section} suggests that your current situation is fundamentally a test of {', '.join(themes).lower()}. "
            f"While modern life presents different tools and contexts, the psychological pattern remains unchanged: reacting impulsively to immediate friction often clouds judgment. "
            f"Applying this principle suggests stepping back from immediate emotional reactivity, prioritizing long-term integrity over momentary vindication, and taking control of your internal state."
        )

    def _build_reflection_questions(self, themes: List[str], source: PassageMetadata) -> List[str]:
        if "Anger" in themes or "Self-Control" in themes:
            return [
                "What outcome do you actually want from this situation?",
                "Will acting from anger move you closer to that outcome, or will it create further entanglement?",
                "What would change in your clarity if you paused for 24 hours before responding?"
            ]
        elif "Grief" in themes or "Attachment" in themes:
            return [
                "How can acknowledging impermanence help you honor what was lost while remaining present in your life?",
                "What internal strength can you cultivate to move through this period of sadness with self-compassion?",
                "Who or what in your present life can offer grounded support right now?"
            ]
        elif "Decision Making" in themes or "Dharma" in themes or "Duty" in themes:
            return [
                "If you remove immediate fear or personal desire from the choice, which option best aligns with your core values?",
                "What long-term responsibilities are you accountable for in this situation?",
                "What advice would you give to a friend facing this exact same dilemma?"
            ]
        else:
            return [
                "What is the underlying cause of distress in this situation?",
                "How does prioritizing self-control and wisdom change your perspective?",
                "What single small step can you take today aligned with your higher principles?"
            ]

llm_service = LLMService()
