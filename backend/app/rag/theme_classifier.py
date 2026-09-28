from typing import List, Dict

THEME_KEYWORDS: Dict[str, List[str]] = {
    "Dharma": ["dharma", "righteous", "moral", "ethics", "duty", "principle", "right", "wrong", "integrity", "virtue"],
    "Duty": ["duty", "responsibility", "obligation", "role", "work", "task", "struggling with responsibilities", "job", "action"],
    "Leadership": ["leader", "leadership", "king", "ruler", "boss", "manager", "governance", "authority", "subordinates", "team"],
    "Justice": ["justice", "fairness", "impartial", "punishment", "tyranny", "rights", "equity", "law", "victim", "unfair"],
    "Anger": ["anger", "angry", "furious", "rage", "irritated", "disrespect", "disrespected", "revenge", "tempest", "mad", "hate"],
    "Self-Control": ["self-control", "discipline", "control", "restraint", "calm", "mastery", "patience", "emotion", "impulse", "pause"],
    "Grief": ["grief", "sorrow", "loss", "losing", "death", "parting", "separation", "mourn", "sadness", "broken", "hurt"],
    "Fear": ["fear", "afraid", "scared", "anxiety", "worry", "failure", "failing", "uncertainty", "panic", "insecurity", "future"],
    "Conflict": ["conflict", "argument", "fight", "enmity", "enemy", "retaliation", "dispute", "hostility", "clash", "war"],
    "Relationships": ["relationship", "friend", "friendship", "enemy", "family", "partner", "trust", "betrayal", "allies", "bond"],
    "Desire": ["desire", "craving", "wanting", "greed", "lust", "pleasure", "temptation", "material", "seeking", "more"],
    "Attachment": ["attachment", "possessive", "clinging", "driftwood", "impermanence", "letting go", "dependency", "bound"],
    "Knowledge": ["knowledge", "wisdom", "ignorance", "vidya", "clarity", "understanding", "truth", "learning", "light"],
    "Wisdom": ["wisdom", "discernment", "insight", "prudence", "deep understanding", "philosophy", "intellect", "reason"],
    "Decision Making": ["decision", "choice", "choose", "dilemma", "confused", "option", "path", "deciding", "crossroads"],
    "Responsibility": ["responsibility", "accountability", "stewardship", "burden", "care", "taking charge", "duty"],
    "Ethics": ["ethics", "moral", "honesty", "truth", "cheating", "lying", "compromise", "values", "character"],
    "Power": ["power", "strength", "control", "influence", "tyranny", "authority", "dominance", "status"],
    "Peace": ["peace", "tranquility", "calmness", "harmony", "serenity", "stillness", "quiet", "resolution"],
    "Detachment": ["detachment", "renunciation", "tyaga", "freedom", "unaffected", "letting go", "independence", "autonomy"],
    "Human Conduct": ["conduct", "behavior", "action", "manner", "speech", "thought", "character", "reputation"]
}

def classify_themes(query: str) -> List[str]:
    query_lower = query.lower()
    matched_themes = []
    
    for theme, keywords in THEME_KEYWORDS.items():
        for kw in keywords:
            if kw in query_lower:
                if theme not in matched_themes:
                    matched_themes.append(theme)
                break
                
    # Default fallback if no theme explicitly detected
    if not matched_themes:
        matched_themes = ["Dharma", "Decision Making", "Wisdom"]
        
    return matched_themes[:3]  # Return top 3 detected themes
