# 📚 Research Paper Repository and Management CMS

A simple and powerful API for uploading, managing, categorizing, and discovering research papers. Includes user authentication, categorization, search, and commenting features.

---

## 🛠️ Core API Endpoints

### 1. `GET /papers`

**Description:** Fetch all research papers.  
**Response:** List of all research papers.

---

### 2. `GET /papers/:id`

**Description:** Fetch a specific research paper by its ID.  
**Response:** Returns the requested research paper with metadata.

---

### 3. `POST /papers`

**Description:** Upload a new research paper.  
**Request Body:**

```json
{
  "title": "Paper Title",
  "authors": ["Author One", "Author Two"],
  "abstract": "Short description of the paper.",
  "publicationDate": "2025-04-28",
  "fileUrl": "https://example.com/paper.pdf"
}
```

**Response:** The newly created research paper.

---

### 4. `PUT /papers/:id`

**Description:** Fully update a research paper's details.  
**Request Body:**

```json
{
  "title": "Updated Title",
  "authors": ["New Author One"],
  "abstract": "Updated abstract.",
  "publicationDate": "2025-04-29",
  "fileUrl": "https://example.com/updated-paper.pdf"
}
```

**Response:** The updated research paper.

---

### 5. `PATCH /papers/:id`

**Description:** Partially update a paper (e.g., only the abstract).  
**Request Body (example):**

```json
{
  "abstract": "New abstract only."
}
```

**Response:** Returns the updated paper.

---

### 6. `DELETE /papers/:id`

**Description:** Delete a paper by its ID.  
**Response:** Success message or status.

---

## 🔍 Extended Features & Routes

### 7. `GET /papers/search?query=term`

**Description:** Search papers by title, author, or keyword.  
**Response:** Matching research papers.

---

### 8. `GET /papers/category/:categoryName`

**Description:** Get all papers in a specific category.  
**Response:** List of papers in that category.

---

### 9. `POST /categories`

**Description:** Create a new paper category.  
**Request Body:**

```json
{
  "name": "Artificial Intelligence"
}
```

**Response:** Created category.

---

### 10. `GET /categories`

**Description:** List all paper categories.  
**Response:** Array of categories.

---

## 👤 User Authentication

### 11. `POST /users/register`

**Description:** Register a new user.  
**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:** User info with authentication token.

---

### 12. `POST /users/login`

**Description:** Log in an existing user.  
**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:** JWT token or session token.

---

### 13. `GET /users/me`

**Description:** Fetch current user's profile.  
**Response:** User details.

---

## 💬 Comments & Interaction

### 14. `POST /papers/:id/comments`

**Description:** Add a comment to a paper.  
**Request Body:**

```json
{
  "userId": "abc123",
  "comment": "This is an insightful paper!"
}
```

**Response:** The added comment.

---

### 15. `GET /papers/:id/comments`

**Description:** Retrieve comments for a specific paper.  
**Response:** Array of comments.

---

## 📈 Metrics & Engagement

### 16. `GET /papers/recent`

**Description:** Fetch the most recently added papers.  
**Response:** List of recent papers.

---

### 17. `GET /papers/popular`

**Description:** Get the most viewed or downloaded papers.  
**Response:** List of popular papers.

---

### 18. `POST /papers/:id/download`

**Description:** Log or track a paper download.  
**Response:** Triggers download and logs activity.

---

## ✅ Technologies Used

- Node.js / Express
- MongoDB (or any database of choice)
- JWT Authentication
- REST API Architecture

---

