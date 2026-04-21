# Technical Requirements Document (TRD): Smart Resource Allocation

## 1. Introduction
This Technical Requirements Document (TRD) outlines the system architecture, technology stack, data models, and API specifications for the "Smart Resource Allocation" platform. It serves as the engineering blueprint for the hackathon MVP.

## 2. System Architecture (High-Level)
The platform follows a modern, decoupled microservices-inspired architecture suitable for rapid MVP development and future scalability.

* **Client Layer:** Web Application (React/Next.js) serving both Users (Needs) and Members (Volunteers).
* **API Gateway / Backend Service:** Python-based REST API handling authentication, business logic, and routing.
* **AI/ML Engine:** A dedicated service/module for Natural Language Processing (NLP) and Vector-based matching.
* **Data Layer:** A hybrid database approach using a relational DB for core entities and a Vector Database for similarity searches.

## 3. Technology Stack (Hackathon MVP)

### 3.1. Frontend
* **Framework:** Next.js (React) or Vite + React.
* **Styling:** Tailwind CSS (for rapid UI development).
* **State Management:** React Context or Zustand.
* **Mapping UI:** Leaflet.js or React-Map-GL (Mapbox).

### 3.2. Backend (API Layer)
* **Framework:** FastAPI (Python) - *Chosen for native async support, automatic interactive docs (Swagger UI), and seamless integration with ML libraries.*
* **Authentication:** JWT (JSON Web Tokens) for simple, stateless auth.

### 3.3. AI / Machine Learning
* **NLP / Embeddings:** Hugging Face `SentenceTransformers` (e.g., `all-MiniLM-L6-v2` for fast, lightweight text-to-vector conversion).
* **Similarity Search:** Cosine Similarity calculations.
* **Clustering (Optional/Stretch):** Scikit-learn (K-Means) for grouping similar regional needs.

### 3.4. Database Layer
* **Relational DB:** PostgreSQL (via SQLAlchemy or Prisma ORM).
* **Vector DB:** `pgvector` (PostgreSQL extension) OR Pinecone (managed vector DB for zero-setup hackathon speed).

## 4. Core Data Models (Relational Schema)

### `User` (Requester)
* `id` (UUID, Primary Key)
* `name` (String)
* `contact_info` (String)
* `created_at` (Timestamp)

### `NeedRequest`
* `id` (UUID, Primary Key)
* `user_id` (UUID, Foreign Key)
* `raw_text` (Text) - *Original user input*
* `extracted_tags` (Array of Strings) - *e.g., ["food", "water"]*
* `urgency_level` (Enum: LOW, MEDIUM, HIGH, CRITICAL)
* `latitude` (Float)
* `longitude` (Float)
* `status` (Enum: PENDING, MATCHED, RESOLVED)
* `embedding_id` (String) - *Reference to Vector DB entry*

### `Member` (Volunteer)
* `id` (UUID, Primary Key)
* `name` (String)
* `skills` (Array of Strings)
* `resources` (Array of Strings)
* `latitude` (Float)
* `longitude` (Float)
* `max_travel_radius_km` (Float)
* `availability_status` (Boolean)
* `embedding_id` (String)

### `TaskMatch`
* `id` (UUID, Primary Key)
* `need_request_id` (UUID, Foreign Key)
* `member_id` (UUID, Foreign Key)
* `match_score` (Float) - *0.0 to 1.0*
* `status` (Enum: OFFERED, ACCEPTED, DECLINED, COMPLETED)
* `created_at` (Timestamp)

## 5. The AI Matching Pipeline (Technical Workflow)

When a new `NeedRequest` is submitted, the backend triggers the matching pipeline:

1.  **Ingestion:** The raw text (e.g., "We need an emergency medic and bandages") is received.
2.  **Vectorization:** The text is passed to the embedding model (e.g., SentenceTransformers), outputting a dense vector array (e.g., 384 dimensions).
3.  **Vector Search:** The system queries the Vector DB for `Member` profiles whose skill/resource embeddings have the highest **Cosine Similarity** to the Need's embedding.
4.  **Heuristic Weighting:** The top *N* semantic matches are passed through a scoring function:
    * `Semantic Score` (0-1) * 0.40
    * `Distance Penalty` (calculated via Haversine formula using Lat/Lon; falls off beyond max radius) * 0.30
    * `Urgency Multiplier` (boosts priority in queue) * 0.20
    * `Historical Reliability` * 0.10
5.  **Dispatch:** The system creates a `TaskMatch` record for the highest-scoring Member with status `OFFERED` and triggers a Webhook/WebSocket event to notify the frontend.

## 6. Essential API Endpoints

### Auth
* `POST /api/auth/register`
* `POST /api/auth/login`

### Needs (Users)
* `POST /api/needs` -> Submits a new request (Triggers ML Pipeline).
* `GET /api/needs/{id}/status` -> Polls current match status.

### Members (Volunteers)
* `POST /api/members/profile` -> Updates skills, location, and regenerates vector embeddings.
* `GET /api/members/{id}/tasks` -> Retrieves pending task offers.
* `POST /api/tasks/{task_id}/accept` -> Updates TaskMatch status.

## 7. Deployment Strategy (Hackathon Focused)
* **Frontend:** Vercel or Netlify (instant Git deployments).
* **Backend:** Render or Railway (easy Python/FastAPI hosting with out-of-the-box SSL).
* **Database:** Supabase (offers Postgres + pgvector natively out of the box) or Neon.

## 8. Security & Compliance Notes
* Ensure location data (Lat/Lon) is jittered or obfuscated on the frontend map for User privacy until a Member formally accepts the task.
* Environment variables (API keys, DB credentials) must be managed via `.env` files and never committed to the repository.
