from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.models.schemas import (
    ChatRequest, ChatResponse, PassageMetadata, SearchQuery, BhishmaRequest, BhishmaResponse
)
from app.services.llm_service import llm_service
from app.services.kb_service import kb_service
from app.rag.theme_classifier import THEME_KEYWORDS

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok", "system": "SHANTI AI Backend RAG Pipeline", "version": "1.0.0"}

@router.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Query message cannot be empty.")
    return llm_service.generate_chat_response(request)

@router.get("/themes")
def get_themes():
    all_passages = kb_service.get_all_passages()
    theme_counts = {}
    for p in all_passages:
        for t in p.theme:
            # Capitalize theme name
            cap_t = t.capitalize()
            theme_counts[cap_t] = theme_counts.get(cap_t, 0) + 1

    theme_list = []
    for theme_name, keywords in THEME_KEYWORDS.items():
        theme_list.append({
            "name": theme_name,
            "count": theme_counts.get(theme_name, 1),
            "keywords": keywords[:4]
        })
    return theme_list

@router.get("/passages", response_model=List[PassageMetadata])
def get_passages(
    query: Optional[str] = Query(None, description="Search query string"),
    theme: Optional[str] = Query(None, description="Filter by theme"),
    sub_parva: Optional[str] = Query(None, description="Filter by sub-parva (Rajadharma, Apaddharma, Mokshadharma)")
):
    return kb_service.search_passages(query=query, theme=theme, sub_parva=sub_parva)

@router.get("/passages/{passage_id}", response_model=PassageMetadata)
def get_passage_by_id(passage_id: str):
    passage = kb_service.get_passage_by_id(passage_id)
    if not passage:
        raise HTTPException(status_code=404, detail=f"Passage '{passage_id}' not found in Shanti Parva knowledge base.")
    return passage

@router.post("/search", response_model=List[PassageMetadata])
def search_passages_post(search_req: SearchQuery):
    return kb_service.search_passages(query=search_req.query, theme=search_req.theme, sub_parva=search_req.sub_parva)

@router.post("/bhishma-teach", response_model=BhishmaResponse)
def bhishma_teach(request: BhishmaRequest):
    if not request.situation or not request.situation.strip():
        raise HTTPException(status_code=400, detail="Situation description cannot be empty.")
    return llm_service.generate_bhishma_response(request)
