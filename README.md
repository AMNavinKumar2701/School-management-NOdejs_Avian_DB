# School Management API

Node.js MVC REST API with MySQL. Manage schools, list by proximity.

---

## Project Structure

```
school-management/
├── config/
│   ├── db.js              # MySQL connection pool
│   └── haversine.js       # Distance calculation utility
├── controllers/
│   └── schoolController.js
├── middlewares/
│   └── schoolValidation.js
├── models/
│   └── schoolModel.js
├── routes/
│   └── schoolRoutes.js
├── sql/
│   └── schema.sql         # DB setup + seed data
├── postman_collection.json
├── server.js
├── .env.example
└── package.json
```

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your MySQL credentials (e.g., Aiven Cloud DB credentials)
```

### 3. Start the server
```bash
# Development
npm run dev

# Production
npm start
```

*(Note: If connecting to Aiven/Cloud DB, ensure you have the latest `mysql2` package installed: `npm install mysql2@latest` to avoid offset out of range errors)*

Server runs on `http://localhost:3000`

### 4. View API Documentation (Swagger)
Once the server is running, open your browser and navigate to:
`http://localhost:3000/api-docs`

---

## API Reference

### POST `/api/addSchool`

**Body (JSON):**
```json
{
  "name": "Delhi Public School",
  "address": "Sector 45, Noida, UP",
  "latitude": 28.5706,
  "longitude": 77.3219
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "School added successfully.",
  "data": { "id": 1, "name": "...", "address": "...", "latitude": 28.5706, "longitude": 77.3219 }
}
```

---

### GET `/api/listSchools?latitude=12.9716&longitude=77.5946`

**Query Params:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| latitude | float | Yes | User latitude (-90 to 90) |
| longitude | float | Yes | User longitude (-180 to 180) |

**Response 200:**
```json
{
  "success": true,
  "message": "Schools fetched and sorted by proximity.",
  "user_location": { "latitude": 12.9716, "longitude": 77.5946 },
  "total": 5,
  "data": [
    { "id": 2, "name": "Kendriya Vidyalaya", "distance_km": 0 },
    { "id": 3, "name": "Ryan International", "distance_km": 842.12 }
  ]
}
```

---

## Validation Rules

| Field | Rules |
|-------|-------|
| name | Required, string, max 255 chars |
| address | Required, string, max 500 chars |
| latitude | Required, float, -90 to 90 |
| longitude | Required, float, -180 to 180 |

---

## Deployment (Render)

1. Push this code to a new GitHub repository.
2. Create a new **Web Service** on [render.com](https://render.com).
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Under Environment variables, add all variables from your `.env` file (using the Aiven Cloud DB credentials).
6. Your managed database is hosted on Aiven (Host: `mysql1-thejnavin97-eb1a.d.aivencloud.com`), so the Render API will connect to it automatically.

---

## Postman

Import `postman_collection.json` into Postman.  
Update `base_url` variable to your deployed URL.
