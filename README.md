# SHANTI AI – Ancient Wisdom, Modern Questions

> **Academic Project Title**: SHANTI AI – Ancient Wisdom, Modern Questions  
> **Target Academic Level**: 2nd-Year Robotics and Artificial Intelligence Student  
> **Domain**: Artificial Intelligence • Natural Language Processing • Retrieval-Augmented Generation (RAG) • Classical Indian Literature (Mahabharata Shanti Parva)

---

## Executive Summary & Core Principle

**SHANTI AI** is an academic AI-powered conversational application specifically built on **Shanti Parva** (Book 12) of the Mahabharata. Unlike generic chatbot systems, SHANTI AI uses **Retrieval-Augmented Generation (RAG)** to retrieve verified, authentic source passages before synthesizing answers.

The core execution pipeline follows:

$$\text{User's Real-Life Problem} \xrightarrow{\text{NLP & Theme Detection}} \text{Authentic Shanti Parva RAG Retrieval} \xrightarrow{\text{Simple Translation}} \text{AI Interpretation} \xrightarrow{\text{Modern Self-Reflection}}$$

### Strict Source Transparency & Anti-Hallucination
1. **Source Grounded**: Every quote, verse number, and chapter reference originates directly from verified Shanti Parva records (`shanti_parva_kb.json`). Zero verses or citations are fabricated by the AI.
2. **Explicit Interpretation Labels**: Modern applications are explicitly labeled as **AI Interpretation** to ensure users do not confuse ancient text with contemporary advice.
3. **Structured 7-Part Output**:
   - `YOUR CONCERN`: Synthesized query summary.
   - `THEME IDENTIFIED`: Categorization into ancient ethical themes.
   - `FROM SHANTI PARVA`: Verified source translation, transliteration, and metadata.
   - `WHAT THE TEACHING MEANS`: Plain-language explanation.
   - `A MODERN PERSPECTIVE`: Grounded AI interpretation.
   - `REFLECT ON THIS`: 2–3 structured self-examination questions.
   - `IMPORTANT NOTE`: Safety disclaimer for emergency, psychological, or medical situations.

---

## Project Structure

```
shanti-ai/
├── frontend/                  # React + TypeScript + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/        # Navbar, Footer, ThemeBadge, SourceDrawer
│   │   │   ├── home/          # Hero, WhatIsShantiParva, HowItWorks, ThemeGrid
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── HomePage.tsx               # Landing page with manuscript theme
│   │   │   ├── ChatPage.tsx               # Ask Shanti AI (7-part RAG UI)
│   │   │   ├── BhishmaPage.tsx            # What Would Bhishma Teach? scenario feature
│   │   │   ├── ExplorePage.tsx            # Shanti Parva catalog search & filters
│   │   │   ├── JournalPage.tsx            # Wisdom Journal for saved entries
│   │   │   ├── HowItWorksPage.tsx         # RAG Architecture & Vector Inspector
│   │   │   └── AcademicPage.tsx           # Project report & Viva Defense Guide
│   │   ├── services/          # API & LocalStorage services with automatic fallback
│   │   └── types/             # TypeScript definitions
│   └── package.json
├── backend/                   # Python FastAPI Backend
│   ├── app/
│   │   ├── api/routes.py      # REST Endpoints (/chat, /themes, /passages, /bhishma-teach)
│   │   ├── rag/               # RAG Engine, TF-IDF Vectorizer, Theme Classifier
│   │   ├── services/          # Knowledge Base & LLM Services
│   │   └── main.py            # FastAPI Application entrypoint
│   └── requirements.txt
├── data/
│   └── shanti_parva/
│       └── shanti_parva_kb.json # Verified dataset of authentic Rajadharma, Apaddharma, Mokshadharma passages
├── .env.example
└── README.md
```

---

## How to Run the Application

### 1. Running the Python FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
python app/main.py
```
> The backend server will launch at `http://127.0.0.1:8000` (API documentation available at `http://127.0.0.1:8000/docs`).

### 2. Running the React Frontend
```bash
cd frontend
npm install
npm run dev
```
> The frontend application will start at `http://localhost:5173`.

> [!NOTE]
> **Client-Side Fallback Capability**: If the frontend is run standalone without launching the Python backend, the app automatically engages a client-side RAG fallback engine so all pages, searches, and chat functions remain 100% operational!

---

## Academic Viva Defense Q&A

- **Q: Why Shanti Parva specifically?**  
  *A:* Shanti Parva (Book 12 of Mahabharata) contains Bhishma's comprehensive discourses on governance (*Rajadharma*), crisis management (*Apaddharma*), and emotional self-control (*Mokshadharma*), offering ideal ground for ethical AI reflection.

- **Q: How does RAG improve safety and accuracy over standard LLMs?**  
  *A:* Standard LLMs often hallucinate Sanskrit verses or blend myth with factual quotes. RAG forces the model to synthesize responses strictly using retrieved documents, guaranteeing factual source integrity.

- **Q: How are similarity scores calculated?**  
  *A:* The RAG engine uses TF-IDF vectorization and Cosine Similarity:
  $$\text{Cosine Similarity}(\vec{Q}, \vec{D}) = \frac{\vec{Q} \cdot \vec{D}}{\|\vec{Q}\| \|\vec{D}\|}$$
