# Campus Connect – Student Management System

A beginner-friendly RESTful API backend built with **Node.js**, **Express.js**, and **MongoDB Atlas** using the **MVC (Model-View-Controller)** architectural pattern. Designed for college backend development coursework and live project demonstrations.

---

##  Tech Stack

- **Runtime Environment:** [Node.js](https://nodejs.org/)
- **Web Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud NoSQL Database)
- **Object Data Modeling (ODM):** [Mongoose](https://mongoosejs.com/)
- **Configuration & Security:** [dotenv](https://www.npmjs.com/package/dotenv)
- **API Testing:** [Postman](https://www.postman.com/)

---

##  Project Architecture (MVC Pattern)

This project strictly follows the **MVC (Model-View-Controller)** pattern for clean separation of concerns:

```text
campus-connect-backend/
├── config/
│   └── db.js                 # MongoDB Atlas connection setup using Mongoose
├── controllers/
│   └── studentController.js  # Business logic & request handling for CRUD operations
├── models/
│   └── studentModel.js       # Mongoose schema and validation for Students
├── routes/
│   └── studentRoutes.js      # Express router mapping endpoints to controller functions
├── .env                      # Local environment variables (IGNORED BY GIT)
├── .env.example              # Template showing required environment variables
├── .gitignore                # Prevents node_modules & .env from being committed
├── package.json              # Project metadata, dependencies, and npm scripts
├── postman_collection.json   # Ready-to-import Postman test collection
├── README.md                 # Complete documentation & setup instructions
└── server.js                 # Main entry point: initializes Express app & middleware
```

### Why MVC?
- **Model (`models/`):** Defines what a Student record looks like, its data types, and validation rules.
- **Controller (`controllers/`):** Contains the actual logic executed when an endpoint is requested (CRUD queries, status codes, error checks).
- **Routes (`routes/`):** Directs incoming HTTP requests (URL + HTTP method) to the appropriate controller function.
- **Config (`config/`):** Isolates external system connections (MongoDB) from application code.

---

##  Student Data Model

Each student record in MongoDB contains the following fields:

| Field | Type | Rules | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Required, trimmed | Full name of the student |
| `rollNumber` | String | Required, Unique, Uppercase | Student ID or Roll number (e.g., `CS2026001`) |
| `email` | String | Required, Unique, Lowercase | Valid email address |
| `branch` | String | Required, trimmed | Engineering or degree branch (e.g., `CSE`, `ECE`) |
| `semester` | Number | Required, Min: 1, Max: 8 | Current semester (1 through 8) |
| `createdAt` | Date | Auto-generated | Timestamp when record was created |
| `updatedAt` | Date | Auto-generated | Timestamp when record was last modified |

---

##  Prerequisites

Make sure you have installed on your laptop:
1. **Node.js** (v18 or higher recommended) - [Download](https://nodejs.org/)
2. **npm** (comes with Node.js)
3. **Postman** desktop app or web agent - [Download](https://www.postman.com/downloads/)
4. A free **MongoDB Atlas** account - [Sign Up](https://www.mongodb.com/cloud/atlas/register)

---

##  Step-by-Step Setup Instructions

### Step 1: Clone or Navigate to the Project Folder
Open your terminal or command prompt:
```bash
cd campus-connect-backend
```

### Step 2: Install Project Dependencies
Run npm install to download all required packages:
```bash
npm install
```

### Step 3: Set Up MongoDB Atlas (Free Cloud Database)
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. Create a new **Free Shared Cluster (M0)**.
3. Under **Security > Database Access**:
   - Click **Add New Database User**.
   - Choose **Password** authentication.
   - Enter a username (e.g., `studentAdmin`) and password.
   - Set user privileges to **Read and write to any database**.
4. Under **Security > Network Access**:
   - Click **Add IP Address**.
   - Choose **Allow Access from Anywhere (`0.0.0.0/0`)** for testing/college demonstration purposes.
5. Under **Deployments > Database**:
   - Click **Connect** on your cluster.
   - Choose **Drivers** (Node.js).
   - Copy the connection string. It will look like:
     ```text
     mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
     ```

### Step 4: Configure Environment Variables
1. In the project root, open the `.env` file (or duplicate `.env.example` as `.env`).
2. Add your MongoDB Atlas connection string and target database name:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/campus_connect?retryWrites=true&w=majority
```
>  **Important:** Replace `<username>` and `<password>` with your actual Atlas database user credentials. If your password contains special characters (like `@`, `#`, `$`), URL-encode them.

### Step 5: Start the Server

- **For regular run:**
  ```bash
  npm start
  ```
- **For development (auto-restarts on code changes):**
  ```bash
  npm run dev
  ```

### Step 6: Verify Connection
When the application starts successfully, you will see output like:
```text
 Server is running on port 5000
 Test the API at: http://localhost:5000
 MongoDB Connected Successfully: cluster0-shard-00-00.abcde.mongodb.net
```
*(If the URI is missing or credentials are incorrect, a descriptive error message will guide you).*

---

## 📡 API Endpoints Overview

Base URL: `http://localhost:5000`

| HTTP Method | Endpoint | Description | Success Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API Root / Health check & route summary | `200 OK` |
| `POST` | `/api/students` | Create/Register a new student | `201 Created` |
| `GET` | `/api/students` | Retrieve all student records | `200 OK` |
| `GET` | `/api/students/:id` | Retrieve single student by MongoDB `_id` | `200 OK` |
| `PUT` | `/api/students/:id` | Update student details by `_id` | `200 OK` |
| `DELETE` | `/api/students/:id` | Delete student by `_id` | `200 OK` |

---

##  Postman Testing Guide

You can test every endpoint directly using Postman:

### Option A: 1-Click Import (Recommended)
1. Open **Postman**.
2. Click **Import** (top left).
3. Select the `postman_collection.json` file located in this project directory.
4. All 5 CRUD requests + Health Check are pre-configured with headers and sample bodies!

---

### Option B: Manual Testing Details

#### 1. API Health Check
- **Method:** `GET`
- **URL:** `http://localhost:5000/`
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Welcome to Campus Connect - Student Management System API",
    "endpoints": {
      "getAllStudents": "GET /api/students",
      "getStudentById": "GET /api/students/:id",
      "createStudent": "POST /api/students",
      "updateStudent": "PUT /api/students/:id",
      "deleteStudent": "DELETE /api/students/:id"
    }
  }
  ```

---

#### 2. Create a Student
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/students`
- **Headers:** `Content-Type: application/json`
- **Request Body (raw JSON):**
  ```json
  {
    "name": "Aarav Sharma",
    "rollNumber": "CS2026001",
    "email": "aarav.sharma@college.edu",
    "branch": "Computer Science and Engineering",
    "semester": 6
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "success": true,
    "message": "Student registered successfully",
    "data": {
      "_id": "6643ab1234567890abcdef12",
      "name": "Aarav Sharma",
      "rollNumber": "CS2026001",
      "email": "aarav.sharma@college.edu",
      "branch": "Computer Science and Engineering",
      "semester": 6,
      "createdAt": "2026-11-02T14:10:00.000Z",
      "updatedAt": "2026-11-02T14:10:00.000Z",
      "__v": 0
    }
  }
  ```

---

#### 3. Get All Students
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students`
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "_id": "6643ab1234567890abcdef12",
        "name": "Aarav Sharma",
        "rollNumber": "CS2026001",
        "email": "aarav.sharma@college.edu",
        "branch": "Computer Science and Engineering",
        "semester": 6
      }
    ]
  }
  ```

---

#### 4. Get Student by ID
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students/<STUDENT_ID>`
  *(Replace `<STUDENT_ID>` with the `_id` received from POST or GET all)*
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "6643ab1234567890abcdef12",
      "name": "Aarav Sharma",
      "rollNumber": "CS2026001",
      "email": "aarav.sharma@college.edu",
      "branch": "Computer Science and Engineering",
      "semester": 6
    }
  }
  ```
- **Error Response (`404 Not Found` if ID does not exist):**
  ```json
  {
    "success": false,
    "message": "Student not found with ID: 6643ab1234567890abcdef12"
  }
  ```

---

#### 5. Update Student
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/students/<STUDENT_ID>`
- **Headers:** `Content-Type: application/json`
- **Request Body (raw JSON):**
  ```json
  {
    "semester": 7,
    "branch": "CSE - Data Science"
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Student updated successfully",
    "data": {
      "_id": "6643ab1234567890abcdef12",
      "name": "Aarav Sharma",
      "rollNumber": "CS2026001",
      "email": "aarav.sharma@college.edu",
      "branch": "CSE - Data Science",
      "semester": 7
    }
  }
  ```

---

#### 6. Delete Student
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/students/<STUDENT_ID>`
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Student deleted successfully",
    "data": {
      "_id": "6643ab1234567890abcdef12",
      "name": "Aarav Sharma",
      "rollNumber": "CS2026001"
    }
  }
  ```

---

## ⚠️ Error Handling & HTTP Status Codes

The API handles typical failure cases gracefully:

| Scenario | HTTP Status Code | Response Example |
| :--- | :--- | :--- |
| Missing mandatory field | `400 Bad Request` | `{"success": false, "message": "Please provide all required fields..."}` |
| Duplicate rollNumber / email | `400 Bad Request` | `{"success": false, "message": "A student with this roll number or email already exists"}` |
| Invalid MongoDB ObjectId string | `400 Bad Request` | `{"success": false, "message": "Invalid student ID format: 123"}` |
| Student ID not found in database | `404 Not Found` | `{"success": false, "message": "Student not found with ID: ..."}` |
| Invalid route accessed | `404 Not Found` | `{"success": false, "message": "Cannot find route: GET /api/unknown"}` |
| Database / Server exception | `500 Internal Server Error` | `{"success": false, "message": "Server error while creating student", "error": "..."}` |

---

## 🚀 How to Push to GitHub

1. Initialize git in the project directory:
   ```bash
   git init
   ```
2. Verify `.gitignore` is preventing `.env` and `node_modules` from staging:
   ```bash
   git status
   ```
3. Stage and commit files:
   ```bash
   git add .
   git commit -m "Initial commit: Campus Connect Student Management System backend"
   ```
4. Link your GitHub repository and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

---

## 👨‍💻 College Demo Checklist

Before demonstrating live to your professor or examiner:
1. Ensure `.env` has a working `MONGO_URI` with IP Access configured in Atlas (`0.0.0.0/0`).
2. Start server in terminal: `npm run dev`. Confirm **"MongoDB Connected Successfully"** appears.
3. Open Postman.
4. Execute `POST /api/students` to add 1-2 students.
5. Execute `GET /api/students` to show the list fetched from Atlas.
6. Open your MongoDB Atlas web dashboard > Browse Collections to show the documents stored in cloud.
7. Execute `PUT` and `DELETE` in Postman to demonstrate full CRUD functionality.
