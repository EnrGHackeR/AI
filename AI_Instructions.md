# 🧠 Smart Resource Allocation (SRA)

## 📄 Product Requirements Document (PRD) + AI Implementation Guide

---

## 1. Project Overview

**Project Name:** Smart Resource Allocation  

This project is an AI-driven NGO platform designed to bridge the gap between community needs and volunteer resources.

It is built as a hackathon project to demonstrate how Artificial Intelligence and Machine Learning can solve real-world coordination problems efficiently.

---

## 2. Problem Statement

In crisis situations or everyday community needs, NGOs face major challenges:

- Lack of coordination between volunteers and people in need  
- Slow manual processes  
- Inefficient resource utilization  
- Delayed response times  

**Core Problem:**  
There is no intelligent system that can automatically match the right volunteer with the right need at the right time.

**Objective:**  
Build a smart platform where:

- Users post their needs  
- Members offer their skills/resources  
- AI automatically assigns the best match  

---

## 3. Target Audience

### 3.1 Users (Needs Side)

- Individuals or communities needing help  
- Examples: medical aid, food, shelter  

**Pain Points:**
- Hard to find help quickly  
- Poor communication with NGOs  

**Goal:**
- Get fast and relevant help  

---

### 3.2 Members (Supply Side)

- Volunteers, donors, professionals  

**Pain Points:**
- Don’t know where their skills are needed  
- Poor task allocation  

**Goal:**
- Contribute effectively  

---

### 3.3 NGO Admins

- Platform managers  

**Goal:**
- Monitor system  
- Improve matching  
- Handle edge cases  

---

## 4. Proposed Solution

The system works as an intelligent matching engine:

1. Users submit requests in natural language  
2. Members create profiles with skills/resources  
3. AI processes and understands requests  
4. System matches best volunteer  
5. Notification is sent automatically  

---

## 5. Functional Requirements

### 5.1 User Portal

- Submit request (text + location + urgency)  
- Track status (Pending / Matched / Resolved)  

---

### 5.2 Member Portal

- Profile with skills and resources  
- Set travel radius  
- Accept/Reject tasks  

---

### 5.3 AI Matching Engine

- Text parsing (NLP)  
- Similarity matching  
- Scoring system  
- Automated assignment  

---

## 6. Technical Architecture

- **Frontend:** React / Next.js  
- **Backend:** Python (FastAPI)  
- **Database:** PostgreSQL + Vector DB  
- **AI Stack:** Hugging Face + Scikit-learn  
- **Maps:** Google Maps / Mapbox  

---

## 7. AI Implementation Guide

This module is the core intelligence of the platform.

---

### 7.1 Environment Setup

#### Prerequisites

- Python 3.9+  
- Virtual Environment  

#### Install Dependencies

```bash
pip install sentence-transformers scikit-learn numpy pandas fastapi uvicorn
```

---

### 7.2 Component 1: Text Embedding (NLP)

Convert text into vectors.

**embeddings.py**

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embedding(text: str) -> list[float]:
    embedding = model.encode(text)
    return embedding

# [...]
```

---

### 7.3 Component 2: Similarity Matching

Use cosine similarity.

**similarity.py**

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def calculate_semantic_score(need_vector, member_vector):
    v1 = np.array(need_vector).reshape(1, -1)
    v2 = np.array(member_vector).reshape(1, -1)
    return float(cosine_similarity(v1, v2)[0][0])

# [...]
```

---

### 7.4 Component 3: Scoring Algorithm

**Factors:**

- Semantic Match (50%)  
- Distance (30%)  
- Urgency (20%)  

**scoring.py**

```python
import math

def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

# [...]
```

---

### 7.5 Optional: LLM Data Structuring

**prompt_template.txt**

```text
You are an AI assistant for an NGO platform.
Extract:
- primary_category
- items_needed
- urgency (1 to 4)
- clean_summary
Return ONLY JSON.
User Input: "{raw_user_text}"
```

---

## 8. User Journey

### User

1. Submit request  
2. AI processes  
3. Gets matched  
4. Receives help  

### Member

1. Register  
2. Receive task  
3. Accept task  
4. Complete task  

---

## 9. Success Metrics

- Match Accuracy  
- Time to Match  
- Fulfillment Rate  

---

## 10. Hackathon Tips

- Use mock data  
- Precompute embeddings  
- Show match score visually  
- Keep UI simple  

---

## 11. Future Improvements

- Vector database integration  
- Predictive allocation  
- Reputation system  
- Multi-volunteer tasks  

---

## 12. Project Structure

```
project-root/
├── embeddings.py
├── similarity.py
├── scoring.py
├── prompt_template.txt
├── main.py
├── data/
│   └── members.json
└── README.md
```

---

## 13. Conclusion

Smart Resource Allocation provides:

- Fast matching  
- Efficient coordination  
- Real-world impact  

This project demonstrates how AI can transform social good systems.

---

## 👨‍💻 Authors

Built for Hackathon Innovation 🚀
