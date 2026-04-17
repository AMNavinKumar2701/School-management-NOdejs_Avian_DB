# School Management API

Node.js MVC REST API with MySQL. Manage schools, list by proximity.

---

## 🌐 Live API

Here is the, API is deployed and accessible at:

👉 https://school-management-nodejs-f58v.onrender.com/

**Base URL:**

https://school-management-nodejs-f58v.onrender.com


**Swagger Docs:**

https://school-management-nodejs-f58v.onrender.com/api-docs


---

## Project Structure


school-management/
├── config/
│ ├── db.js # MySQL connection pool
│ └── haversine.js # Distance calculation utility
├── controllers/
│ └── schoolController.js
├── middlewares/
│ └── schoolValidation.js
├── models/
│ └── schoolModel.js
├── routes/
│ └── schoolRoutes.js
├── sql/
│ └── schema.sql # DB setup + seed data
├── postman_collection.json
├── server.js
├── .env.example
└── package.json


---

## Setup (Local Development)

### 1. Install dependencies
```bash
npm install
2. Configure environment
cp .env.example .env
# Edit .env with your MySQL credentials
3. Start the server
# Development
npm run dev

# Production
npm start

Server runs on:

http://localhost:3000
4. Swagger Docs (Local)
http://localhost:3000/api-docs
API Reference
📌 POST /api/addSchool

Full URL (Production):

https://school-management-nodejs-f58v.onrender.com/api/addSchool

Body (JSON):

{
  "name": "Delhi Public School",
  "address": "Sector 45, Noida, UP",
  "latitude": 28.5706,
  "longitude": 77.3219
}

Response 201:

{
  "success": true,
  "message": "School added successfully.",
  "data": {
    "id": 1,
    "name": "...",
    "address": "...",
    "latitude": 28.5706,
    "longitude": 77.3219
  }
}
📌 GET /api/listSchools

Full URL (Production Example):

https://school-management-nodejs-f58v.onrender.com/api/listSchools?latitude=12.9716&longitude=77.5946

Query Params:

Param	Type	Required	Description
latitude	float	Yes	User latitude (-90 to 90)
longitude	float	Yes	User longitude (-180 to 180)

Response 200:

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
Validation Rules
Field	Rules
name	Required, string, max 255 chars
address	Required, string, max 500 chars
latitude	Required, float, -90 to 90
longitude	Required, float, -180 to 180
Deployment (Render)

This project is deployed on Render:

👉 https://school-management-nodejs-f58v.onrender.com/

Steps to deploy:
Push code to GitHub
Create a Web Service on https://render.com
Set:
Build Command: npm install
Start Command: npm start
Add environment variables from .env
Connect to your Aiven MySQL database
Postman

Import postman_collection.json into Postman.

Set:

base_url = https://school-management-nodejs-f58v.onrender.com
