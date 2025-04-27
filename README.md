# ElasticSearch Full Stack Application

This project allows searching Amazon Product Reviews using ElasticSearch through Quantitative, Fuzzy, and Hybrid queries.

---

## Setup Instructions

### 1. Start ElasticSearch
Run the following command to start ElasticSearch locally:
```bash
docker-compose up -d
```
ElasticSearch will be available at `http://localhost:9200`.

---

### 2. Seed the Data
Use the **Seed API** provided in the Postman collection to populate the database:
- Send the `POST` request to seed the `Amazon_Product_Reviews` and `Mini_Dataset_Amazon_Product_Reviews` indices.

---

### 3. Test APIs
Use Postman to test all the APIs:
- Quantitative Search
- Fuzzy/Exact Search
- Hybrid Search

The Postman collection includes all required API requests.

---

### 4. Start the Frontend
Navigate to the frontend directory and start the React app:
```bash
npm start
```
This will launch the frontend at `http://localhost:3000`.

---

## Project Structure
```
SearchApp/
  ├── backend/
  └── frontend/
```

---

## Important Notes
- Ensure ElasticSearch is running before interacting with backend or frontend.
- Always seed the data first before making search queries.
- Large datasets may trigger a GitHub warning but function correctly without needing Git LFS.

---

## Quick API Summary
| Endpoint | Method | Description |
|:---------|:-------|:------------|
| `/api/seed/full-dataset` | POST | Seed full Amazon Product Reviews |
| `/api/seed/mini-dataset` | POST | Seed Mini Dataset with Embeddings |
| `/api/search/quantitative` | GET | Search reviews by rating |
| `/api/search/fuzzy` | GET | Fuzzy keyword search |
| `/api/search/hybrid` | GET | Search by rating + keyword |
| `/api/search/embedding/year` | GET | Top 3 reviews by year |
| `/api/search/embedding/category` | GET | Top 3 reviews by product category |

---

