import re
from typing import List, Tuple, Dict, Any
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.services.kb_service import kb_service
from app.models.schemas import PassageMetadata

class RAGEngine:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
        self._build_index()

    def _build_index(self):
        self.passages = kb_service.get_all_passages()
        if not self.passages:
            self.corpus = []
            self.doc_vectors = None
            return

        # Prepare rich corpus from summary, translation, part, themes, keywords
        self.corpus = [
            f"{p.summary} {p.translation} {p.part or ''} {' '.join(p.themes or p.theme)} {' '.join(p.keywords)}"
            for p in self.passages
        ]
        self.doc_vectors = self.vectorizer.fit_transform(self.corpus)

    def retrieve(self, query: str, top_k: int = 2) -> Tuple[List[PassageMetadata], Dict[str, Any]]:
        if not self.passages or self.doc_vectors is None:
            self._build_index()

        if not self.corpus:
            return [], {"status": "Empty Knowledge Base"}

        query_vector = self.vectorizer.transform([query])
        similarities = cosine_similarity(query_vector, self.doc_vectors)[0]

        # Rank indices by score
        ranked_indices = similarities.argsort()[::-1]
        
        retrieved_passages = []
        debug_scores = []

        for idx in ranked_indices[:top_k]:
            score = float(similarities[idx])
            passage = self.passages[idx].model_copy()
            passage.similarity_score = round(score, 4)
            retrieved_passages.append(passage)
            debug_scores.append({
                "id": passage.id,
                "section": passage.section,
                "score": round(score, 4),
                "summary": passage.summary,
                "source_url": passage.source_url
            })

        # Token match fallback if top TF-IDF score is low
        if debug_scores and debug_scores[0]["score"] < 0.01:
            tokens = [w for w in re.findall(r'\w+', query.lower()) if len(w) > 3]
            for passage in self.passages:
                p_text = f"{passage.summary} {passage.translation} {' '.join(passage.keywords)} {' '.join(passage.themes or passage.theme)}".lower()
                matched_count = sum(1 for t in tokens if t in p_text)
                if matched_count > 0:
                    retrieved_passages = [passage.model_copy()]
                    retrieved_passages[0].similarity_score = round(0.4 + (matched_count * 0.1), 2)
                    debug_scores = [{
                        "id": passage.id,
                        "section": passage.section,
                        "score": retrieved_passages[0].similarity_score,
                        "summary": passage.summary,
                        "source_url": passage.source_url
                    }]
                    break

        # Absolute default fallback
        if not retrieved_passages:
            retrieved_passages = [self.passages[0].model_copy()]
            retrieved_passages[0].similarity_score = 0.5000

        debug_info = {
            "total_kb_documents": len(self.passages),
            "top_k_retrieved": len(retrieved_passages),
            "similarity_scores": debug_scores,
            "vectorizer_vocab_size": len(self.vectorizer.vocabulary_) if hasattr(self.vectorizer, "vocabulary_") else 0
        }

        return retrieved_passages, debug_info

rag_engine = RAGEngine()
