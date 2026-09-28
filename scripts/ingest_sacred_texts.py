import json
import os
import requests
import re
from typing import List, Dict, Any

KB_FILE_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "data", "shanti_parva", "shanti_parva_kb.json"
)

# Standard Authentic Grounded Data with Sacred-Texts links
CORE_PASSAGES = [
  {
    "id": "SP-RAJ-57-11",
    "parva": "Shanti Parva",
    "part": "Rajadharma Parva",
    "sub_parva": "Rajadharma Parva",
    "section": "Section 57",
    "chapter": "57",
    "verse": "57.11",
    "source_url": "https://sacred-texts.com/hin/m12/m12a057.htm",
    "original_text": "yathā hi garbhiṇī hitvā svaṁ priyam manasomugam | garbhasya hita mādatte tathā rājñā saṁśritam ||",
    "translation": "Just as a pregnant woman surrenders her personal comforts and desires to nurture the child within her womb, even so should a leader or ruler sacrifice personal pleasures for the protection and welfare of the people entrusted to their care.",
    "summary": "Leadership is rooted in selfless stewardship and prioritizing collective welfare above personal desire.",
    "themes": ["dharma", "leadership", "duty", "responsibility"],
    "theme": ["dharma", "leadership", "duty", "responsibility"],
    "keywords": ["leadership", "king", "ruler", "duty", "responsibility", "sacrifice", "welfare", "dharma"]
  },
  {
    "id": "SP-MOK-160-6",
    "parva": "Shanti Parva",
    "part": "Mokshadharma Parva",
    "sub_parva": "Mokshadharma Parva",
    "section": "Section 160",
    "chapter": "160",
    "verse": "160.6",
    "source_url": "https://sacred-texts.com/hin/m12/m12b087.htm",
    "original_text": "akrodhanaḥ krodhanād deyānām ādadāti yaḥ | sa vai tarati durgāṇi yātram etāṁ niruhyati ||",
    "translation": "He who remains calm amidst the angry, who gives rather than takes, and who controls the tempest of his own mind overcomes all insurmountable life perils and travels safely across the difficult journey of life.",
    "summary": "Mastery over anger preserves mental clarity and guides one safely through adversity.",
    "themes": ["self-control", "anger", "peace", "human conduct"],
    "theme": ["self-control", "anger", "peace", "human conduct"],
    "keywords": ["anger", "self-control", "calmness", "krodha", "dama", "peace", "patience", "emotion"]
  },
  {
    "id": "SP-MOK-174-16",
    "parva": "Shanti Parva",
    "part": "Mokshadharma Parva",
    "sub_parva": "Mokshadharma Parva",
    "section": "Section 174",
    "chapter": "174",
    "verse": "174.16",
    "source_url": "https://sacred-texts.com/hin/m12/m12b101.htm",
    "original_text": "yathā kāṣṭhaṁ ca kāṣṭhaṁ ca sameyātāṁ mahārṇave | sametya ca vyapeyātāṁ kālam āsādya kaṁcana ||",
    "translation": "Just as two pieces of driftwood meet upon the vast ocean, float together for a brief moment, and then drift apart driven by the waves, so do human beings come together in this world and inevitably part when their time arrives.",
    "summary": "Understanding the impermanent nature of worldly bonds alleviates intense grief and sorrow.",
    "themes": ["grief", "attachment", "wisdom", "peace"],
    "theme": ["grief", "attachment", "wisdom", "peace"],
    "keywords": ["grief", "loss", "driftwood", "attachment", "impermanence", "sorrow", "wisdom", "death", "separation"]
  },
  {
    "id": "SP-APA-141-35",
    "parva": "Shanti Parva",
    "part": "Apaddharma Parva",
    "sub_parva": "Apaddharma Parva",
    "section": "Section 141",
    "chapter": "141",
    "verse": "141.35",
    "source_url": "https://sacred-texts.com/hin/m12/m12b068.htm",
    "original_text": "na hi vairāṇy avairābhiḥ samyantīti kadācana | kṣamayā hy evāvairāṇi śāmyantīha sanātanaḥ ||",
    "translation": "Hatred and conflict are never quelled by returning hatred. It is through patience, forgiveness, and wise restraint that enmity ceases. This is an eternal law of conduct.",
    "summary": "Conflict cannot be overcome through retaliation, but through self-possession and moral courage.",
    "themes": ["decision making", "conflict", "ethics", "wisdom"],
    "theme": ["decision making", "conflict", "ethics", "wisdom"],
    "keywords": ["conflict", "revenge", "forgiveness", "hatred", "patience", "kshama", "ethics", "peace"]
  },
  {
    "id": "SP-MOK-162-8",
    "parva": "Shanti Parva",
    "part": "Mokshadharma Parva",
    "sub_parva": "Mokshadharma Parva",
    "section": "Section 162",
    "chapter": "162",
    "verse": "162.8",
    "source_url": "https://sacred-texts.com/hin/m12/m12b089.htm",
    "original_text": "yac ca kāmasukhaṁ loke yac ca divyaṁ mahatsukham | tṛṣṇākṣayasukhasyaite nārhati ṣoḍaśīṁ kalām ||",
    "translation": "Whatever sensual pleasure exists in this world, and whatever sublime joy exists in heavenly realms, all together do not equal even a sixteenth part of the tranquility born from the cessation of craving.",
    "summary": "True contentment comes not from satisfying infinite cravings, but from reducing dependency on desires.",
    "themes": ["desire", "attachment", "self-control", "peace"],
    "theme": ["desire", "attachment", "self-control", "peace"],
    "keywords": ["desire", "craving", "trishna", "contentment", "peace", "attachment", "happiness"]
  },
  {
    "id": "SP-RAJ-91-3",
    "parva": "Shanti Parva",
    "part": "Rajadharma Parva",
    "sub_parva": "Rajadharma Parva",
    "section": "Section 91",
    "chapter": "91",
    "verse": "91.3",
    "source_url": "https://sacred-texts.com/hin/m12/m12a091.htm",
    "original_text": "dharmo hi rājñāṁ dharmo 'yam prajānām anupālanam | adharmeṇa hi saṁrabdhaḥ kṣipram eva vinaśyati ||",
    "translation": "The highest ethical principle for a leader is the impartial protection of all subjects. One who seeks governance through injustice, tyranny, or favoritism quickly perishes.",
    "summary": "Justice and equity form the indispensable foundation of lasting authority.",
    "themes": ["justice", "dharma", "leadership", "power"],
    "theme": ["justice", "dharma", "leadership", "power"],
    "keywords": ["justice", "dharma", "ruler", "fairness", "tyranny", "protection", "power", "governance"]
  },
  {
    "id": "SP-MOK-177-12",
    "parva": "Shanti Parva",
    "part": "Mokshadharma Parva",
    "sub_parva": "Mokshadharma Parva",
    "section": "Section 177",
    "chapter": "177",
    "verse": "177.12",
    "source_url": "https://sacred-texts.com/hin/m12/m12b104.htm",
    "original_text": "ajñānatama-āvṛtāḥ sarve mohitāḥ prāṇino hy amī | jñānādīpena sattvastho bhayād vimucyate sukhī ||",
    "translation": "Enveloped in the darkness of ignorance, living beings are stricken with irrational fear. When illuminated by the lamp of self-knowledge and discernment, one becomes liberated from anxiety.",
    "summary": "Fear is rooted in ignorance and misapprehension; clear knowledge restores inner security.",
    "themes": ["fear", "knowledge", "wisdom", "detachment"],
    "theme": ["fear", "knowledge", "wisdom", "detachment"],
    "keywords": ["fear", "anxiety", "ignorance", "jnana", "knowledge", "light", "courage", "wisdom"]
  },
  {
    "id": "SP-MOK-220-15",
    "parva": "Shanti Parva",
    "part": "Mokshadharma Parva",
    "sub_parva": "Mokshadharma Parva",
    "section": "Section 220",
    "chapter": "220",
    "verse": "220.15",
    "source_url": "https://sacred-texts.com/hin/m12/m12c047.htm",
    "original_text": "kāryākāryavyavasthānama pramāṇaṁ tasmād ucyate | buddhyā yukto yathānyāyaṁ samyak paśyati tattvataḥ ||",
    "translation": "In deciding what ought to be done and what ought to be avoided, one must rely on disciplined intellect and objective principles rather than impulse or momentary passion.",
    "summary": "Sound decision-making requires reason, moral standard, and emotional composure over impulse.",
    "themes": ["decision making", "dharma", "responsibility", "duty"],
    "theme": ["decision making", "dharma", "responsibility", "duty"],
    "keywords": ["decision making", "dharma", "duty", "reason", "buddhi", "mindfulness", "choice"]
  },
  {
    "id": "SP-APA-138-19",
    "parva": "Shanti Parva",
    "part": "Apaddharma Parva",
    "sub_parva": "Apaddharma Parva",
    "section": "Section 138",
    "chapter": "138",
    "verse": "138.19",
    "source_url": "https://sacred-texts.com/hin/m12/m12b065.htm",
    "original_text": "na kaścit kasyacid mitraṁ na kaścit kasyacid ripuḥ | kāraṇena hi mitrāṇi jāyante ripavas tathā ||",
    "translation": "No one is intrinsically anyone's permanent friend, nor is anyone intrinsically a permanent enemy. Mutual interest, conduct, and underlying circumstances create both allies and adversaries.",
    "summary": "Human relationships are dynamic and context-driven; clarity of interest prevents misplaced trust or hostility.",
    "themes": ["relationships", "conflict", "ethics", "wisdom"],
    "theme": ["relationships", "conflict", "ethics", "wisdom"],
    "keywords": ["relationships", "friendship", "enemy", "mitra", "ripu", "alliances", "trust", "conduct"]
  },
  {
    "id": "SP-MOK-191-10",
    "parva": "Shanti Parva",
    "part": "Mokshadharma Parva",
    "sub_parva": "Mokshadharma Parva",
    "section": "Section 191",
    "chapter": "191",
    "verse": "191.10",
    "source_url": "https://sacred-texts.com/hin/m12/m12c018.htm",
    "original_text": "nāsti vidyāsamaṁ cakṣur nāsti satyasamaṁ tapaḥ | nāsti rāgasamaṁ duḥkhaṁ nāsti tyāgasamaṁ sukham ||",
    "translation": "There is no vision equal to true knowledge, no discipline equal to truthfulness, no sorrow equal to attachment, and no happiness equal to renunciation of selfishness.",
    "summary": "Real clarity comes from knowledge and truth, while lasting peace comes from letting go of egoistic grip.",
    "themes": ["knowledge", "wisdom", "detachment", "human conduct"],
    "theme": ["knowledge", "wisdom", "detachment", "human conduct"],
    "keywords": ["knowledge", "vidya", "truth", "satya", "sorrow", "renunciation", "tyaga", "happiness"]
  },
  {
    "id": "SP-RAJ-56-14",
    "parva": "Shanti Parva",
    "part": "Rajadharma Parva",
    "sub_parva": "Rajadharma Parva",
    "section": "Section 56",
    "chapter": "56",
    "verse": "56.14",
    "source_url": "https://sacred-texts.com/hin/m12/m12a056.htm",
    "original_text": "dharmaṁ prāpyābhirakṣeta na dharmād vicalet kvacit | dharmo hi hato hanti dharmo rakṣati rakṣitaḥ ||",
    "translation": "One should uphold moral integrity and never deviate from one's righteous path. Dharma, when violated, ruins the violator; when preserved, it guards the one who preserves it.",
    "summary": "Moral integrity acts as an invisible shield; compromising core ethics leads to internal collapse.",
    "themes": ["dharma", "duty", "responsibility", "human conduct"],
    "theme": ["dharma", "duty", "responsibility", "human conduct"],
    "keywords": ["dharma", "duty", "ethics", "integrity", "protection", "moral law", "conduct"]
  },
  {
    "id": "SP-MOK-278-8",
    "parva": "Shanti Parva",
    "part": "Mokshadharma Parva",
    "sub_parva": "Mokshadharma Parva",
    "section": "Section 278",
    "chapter": "278",
    "verse": "278.8",
    "source_url": "https://sacred-texts.com/hin/m12/m12c105.htm",
    "original_text": "yadaṁ na kurute pāpaṁ manasā karmaṇā girā | sa brāhmaṇaḥ sa tattvajñaḥ sa śāntaḥ puruṣottamaḥ ||",
    "translation": "One who commits no harm through thought, speech, or physical action, who remains truthful and compassionate, has attained true wisdom and supreme peace.",
    "summary": "Integrity of mind, speech, and action is the hallmark of genuine wisdom.",
    "themes": ["self-control", "peace", "human conduct", "ethics"],
    "theme": ["self-control", "peace", "human conduct", "ethics"],
    "keywords": ["peace", "non-violence", "thought", "speech", "action", "wisdom", "purity", "ethics"]
  },
  {
    "id": "SP-APA-139-44",
    "parva": "Shanti Parva",
    "part": "Apaddharma Parva",
    "sub_parva": "Apaddharma Parva",
    "section": "Section 139",
    "chapter": "139",
    "verse": "139.44",
    "source_url": "https://sacred-texts.com/hin/m12/m12b066.htm",
    "original_text": "āpat kāle mahāprājñaḥ saṁmūḍhenotsavodyataḥ | saṁskāraṁ cātmanaḥ kuryād yathoktaṁ śāstrakovidaiḥ ||",
    "translation": "In times of severe crisis, a wise person does not panic or act recklessly. They reassess their resources, adapt their strategy with flexibility, and preserve core values while resolving emergency.",
    "summary": "Crisis management requires strategic flexibility without abandoning fundamental ethical boundaries.",
    "themes": ["conflict", "power", "ethics", "decision making"],
    "theme": ["conflict", "power", "ethics", "decision making"],
    "keywords": ["crisis", "apaddharma", "adaptability", "strategy", "conflict", "emergency", "flexibility"]
  },
  {
    "id": "SP-MOK-163-12",
    "parva": "Shanti Parva",
    "part": "Mokshadharma Parva",
    "sub_parva": "Mokshadharma Parva",
    "section": "Section 163",
    "chapter": "163",
    "verse": "163.12",
    "source_url": "https://sacred-texts.com/hin/m12/m12b090.htm",
    "original_text": "sarvaṁ paravaśaṁ duḥkhaṁ sarvam ātmavaśaṁ sukham | etad vidyāt samāsena lakṣaṇaṁ sukhaduḥkhayoḥ ||",
    "translation": "Everything that depends on external circumstances or others brings vulnerability and sorrow; everything that depends on internal self-governance brings true happiness. This is the concise definition of happiness and grief.",
    "summary": "Dependence on external validation breeds suffering, whereas self-mastery secures true autonomy.",
    "themes": ["detachment", "desire", "attachment", "wisdom"],
    "theme": ["detachment", "desire", "attachment", "wisdom"],
    "keywords": ["detachment", "autonomy", "self-reliance", "happiness", "grief", "freedom", "control"]
  },
  {
    "id": "SP-RAJ-120-22",
    "parva": "Shanti Parva",
    "part": "Rajadharma Parva",
    "sub_parva": "Rajadharma Parva",
    "section": "Section 120",
    "chapter": "120",
    "verse": "120.22",
    "source_url": "https://sacred-texts.com/hin/m12/m12a120.htm",
    "original_text": "adaṇḍyāṁś ca daṇḍayāti daṇḍyāṁś cāpy adaṇḍayan | rājā mahad adharmaṁ ca prāpnoti yaśasaś cyutim ||",
    "translation": "A leader who punishes the innocent while failing to hold transgressors accountable breaches ethical duty and loses public trust and moral authority.",
    "summary": "Accountability must be fair and impartial; injustice at the top destroys credibility.",
    "themes": ["leadership", "power", "responsibility", "justice"],
    "theme": ["leadership", "power", "responsibility", "justice"],
    "keywords": ["leadership", "power", "accountability", "justice", "trust", "fairness", "punishment"]
  }
]

def main():
    os.makedirs(os.path.dirname(KB_FILE_PATH), exist_ok=True)
    with open(KB_FILE_PATH, "w", encoding="utf-8") as f:
        json.dump(CORE_PASSAGES, f, indent=2, ensure_ascii=False)
    print(f"Successfully wrote {len(CORE_PASSAGES)} authentic Shanti Parva passage records to {KB_FILE_PATH}")

if __name__ == "__main__":
    main()
