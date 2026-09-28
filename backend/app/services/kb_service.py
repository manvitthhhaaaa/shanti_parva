import json
import os
from typing import List, Optional
from app.models.schemas import PassageMetadata

def find_kb_file() -> str:
    possible_paths = [
        # 4 dirnames from backend/app/services/kb_service.py -> shanti-ai/data/shanti_parva/shanti_parva_kb.json
        os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))), "data", "shanti_parva", "shanti_parva_kb.json"),
        # 3 dirnames
        os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "data", "shanti_parva", "shanti_parva_kb.json"),
        # Current working dir
        os.path.join(os.getcwd(), "data", "shanti_parva", "shanti_parva_kb.json"),
        # Parent of current working dir
        os.path.join(os.path.dirname(os.getcwd()), "data", "shanti_parva", "shanti_parva_kb.json"),
    ]
    for p in possible_paths:
        if os.path.exists(p):
            return p
    return possible_paths[0]

KB_FILE_PATH = find_kb_file()

class KnowledgeBaseService:
    def __init__(self, filepath: str = None):
        self.filepath = filepath or find_kb_file()
        self.passages: List[PassageMetadata] = []
        self.load_passages()

    def load_passages(self):
        resolved_path = find_kb_file()
        if os.path.exists(resolved_path):
            self.filepath = resolved_path
            with open(resolved_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                self.passages = [PassageMetadata(**item) for item in data]
        else:
            self.passages = []

    def get_all_passages(self) -> List[PassageMetadata]:
        return self.passages

    def get_passage_by_id(self, passage_id: str) -> Optional[PassageMetadata]:
        for p in self.passages:
            if p.id.lower() == passage_id.lower():
                return p
        return None

    def search_passages(self, query: Optional[str] = None, theme: Optional[str] = None, part: Optional[str] = None, sub_parva: Optional[str] = None) -> List[PassageMetadata]:
        results = self.passages
        target_part = part or sub_parva
        if target_part and target_part.strip():
            results = [
                p for p in results if (
                    (p.part and target_part.lower() in p.part.lower()) or 
                    (p.sub_parva and target_part.lower() in p.sub_parva.lower())
                )
            ]
        if theme and theme.strip():
            t_lower = theme.lower()
            results = [
                p for p in results if (
                    any(t_lower in t.lower() for t in p.themes) or
                    any(t_lower in t.lower() for t in p.theme)
                )
            ]
        if query and query.strip():
            q_lower = query.lower()
            results = [
                p for p in results if (
                    q_lower in p.translation.lower() or
                    q_lower in p.summary.lower() or
                    q_lower in p.original_text.lower() or
                    any(q_lower in kw.lower() for kw in p.keywords) or
                    any(q_lower in t.lower() for t in p.themes) or
                    any(q_lower in t.lower() for t in p.theme)
                )
            ]
        return results

kb_service = KnowledgeBaseService()
