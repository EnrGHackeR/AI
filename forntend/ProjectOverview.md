# Project Overview: AI-Powered NGO Matchmaking
**Project Name:** Smart Resource Allocation (SRA)

## 1. The Core Vision
In times of crisis and community need, resources aren't always scarce—they are often just poorly distributed. **Smart Resource Allocation** is an AI-powered, two-sided platform designed to bridge the gap between community distress and volunteer capabilities. By leveraging natural language processing and algorithmic matching, we eliminate the bottlenecks of manual NGO coordination, ensuring that the right help gets to the right place, instantly.

## 2. The Problem
NGOs and community leaders face a significant logistical hurdle:
* **Overwhelmed Channels:** People in need struggle to articulate exactly what they require or don't know who to contact.
* **Underutilized Volunteers:** Eager volunteers, donors, and professionals sit idle because their specific skills or resources haven't been matched to an active need.
* **Manual Coordination is Slow:** Relying on spreadsheets, phone calls, and manual dispatching costs critical time, leading to delayed aid and human error.

## 3. Our Solution
We are building an intelligent marketplace for social good. SRA features two distinct portals—one for **Users (Needs)** and one for **Members (Supply)**—connected by a smart AI Matching Engine.

1. **Users** simply type what they need in natural language (e.g., "We are out of baby formula and diapers" or "Need a medic for a minor injury"). 
2. **Members** create profiles indicating their specific skills (Medical, Transport, Labor) and assets (Truck, Funds, Food).
3. **The AI Engine** processes the user's request, understands the context, and uses vector-based similarity to instantly find the closest, most qualified Member to fulfill that exact need.

## 4. Key Features

### For Users (The Community)
* **Low-Friction Intake:** A simple, mobile-friendly interface to request help using everyday language.
* **Urgency & Location Tracking:** Users can tag the urgency of their situation and drop a pin on their location.
* **Real-Time Status:** Transparency on whether their request is pending, matched, or resolved.

### For Members (The Volunteers)
* **Dynamic Skill Profiling:** Members tag themselves with specific capabilities, ensuring they are only called upon for tasks they can actually fulfill.
* **Geofencing:** Members set their willing travel radius.
* **Smart Task Inbox:** Automated alerts when the AI determines they are the perfect match for a nearby crisis.

### The AI Brain
* **Natural Language Processing (NLP):** Extracts structured data (Category, Items, Urgency) from raw user text.
* **Cosine Similarity Matching:** Mathematically calculates the overlap between a user's need and a member's skills.
* **Heuristic Scoring:** Ranks matches based on a combined score of semantic fit, geographic proximity, and urgency.

## 5. Technology Stack
* **Frontend:** Next.js / React (styled with Tailwind CSS)
* **Backend:** FastAPI (Python)
* **AI & Data:** Hugging Face `all-MiniLM-L6-v2` (for text embeddings), Scikit-learn, PostgreSQL + Vector Database (pgvector/Pinecone)

## 6. Social Impact & Value Proposition
* **Speed to Aid:** Drastically reduces the time between a request being made and help arriving.
* **Volunteer Retention:** Volunteers feel more valued and effective when their specific skills are utilized properly.
* **Data-Driven Insights:** Provides NGO admins with macro-level heatmaps of community needs to predict future crises.

## 7. Hackathon Objectives
Our goal for this hackathon is to deliver a functional MVP that successfully demonstrates the end-to-end AI matching pipeline. We aim to show judges a real-time simulation where a raw text request from a user automatically triggers a targeted dispatch to a matched volunteer's dashboard.
