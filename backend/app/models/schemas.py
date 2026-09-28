from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ChatRequest(BaseModel):
    message: str = Field(..., description="The user's real-life problem or philosophical query")
    use_live_api: Optional[bool] = Field(False, description="Whether to use live LLM API if key is present")

class PassageMetadata(BaseModel):
    id: str
    parva: str = "Shanti Parva"
    part: Optional[str] = "Rajadharma Parva"
    sub_parva: Optional[str] = "Rajadharma Parva"
    section: str
    chapter: str
    verse: Optional[str] = ""
    source_url: Optional[str] = "https://sacred-texts.com/hin/m12/"
    themes: List[str] = Field(default_factory=list)
    theme: List[str] = Field(default_factory=list)
    original_text: str
    translation: str
    summary: str
    keywords: List[str]
    similarity_score: Optional[float] = 0.0

class ChatResponse(BaseModel):
    user_concern_summary: str
    themes: List[str]
    sources: List[PassageMetadata]
    teaching_explanation: str
    modern_perspective: str
    reflection_questions: List[str]
    important_note: str
    is_demo_mode: bool = True
    retrieval_debug: Optional[Dict[str, Any]] = None

class SearchQuery(BaseModel):
    query: str
    theme: Optional[str] = None
    part: Optional[str] = None
    sub_parva: Optional[str] = None

class BhishmaRequest(BaseModel):
    situation: str

class BhishmaResponse(BaseModel):
    situation_summary: str
    relevant_principle: str
    source: PassageMetadata
    ai_interpretation: str
    reflection: List[str]
    is_demo_mode: bool = True
