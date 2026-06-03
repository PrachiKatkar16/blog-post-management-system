# Blog Post Management System

A full-stack Blog Post Management System built using React, Node.js, Express.js, MongoDB, and Mongoose. The application allows users to create, view, update, delete, search, filter, and export blog posts.

---

## Features

### Backend Features

* Create Blog Post
* Get All Blog Posts with Pagination
* Get Single Blog Post by ID
* Update Blog Post
* Delete Blog Post
* Search Posts by:

  * Title
  * Author Name
  * Category
* Filter Posts by:

  * Category
  * Status
* Export Posts to CSV
* MongoDB Integration using Mongoose
* RESTful API Architecture
* Error Handling and Validation

### Frontend Features

* Responsive Design (Desktop & Mobile)
* Blog Listing Page
* Add New Post Page
* Edit Existing Post Page
* View Post Details Page
* Search Functionality
* Category and Status Filters
* Pagination
* CSV Export
* Loading States
* Error Handling
* Three-dot Action Menu (View, Edit, Delete)

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* React Icons
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON2CSV
* CORS

---

## Project Structure

### Backend

```bash
Backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── postController.js
│   │
│   ├── models/
│   │   └── post.model.js
│   │
│   ├── routes/
│   │   └── postRoute.js
│   │
│   └── app.js
│
├── server.js
├── package.json
└── .env
```

### Frontend

```bash
Frontend/
│
├── src/
│   ├── api/
│   │   └── postApi.js
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PostsTable.jsx
│   │   ├── SearchFilter.jsx
│   │   └── Pagination.jsx
│   │
│   ├── pages/
│   │   ├── PostList.jsx
│   │   ├── AddEditPost.jsx
│   │   └── ViewPost.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

---

## Database Schema

### Post Model

```javascript
{
  title: String,
  authorName: String,
  authorEmail: String,
  category: String,
  status: String,
  tags: [String],
  thumbnailUrl: String,
  shortDescription: String,
  content: String
}
```

---

## API Endpoints

### Create Post

```http
POST /api/posts
```

### Get All Posts

```http
GET /api/posts?page=1&limit=5
```

### Get Single Post

```http
GET /api/posts/:id
```

### Update Post

```http
PUT /api/posts/:id
```

### Delete Post

```http
DELETE /api/posts/:id
```

### Search & Filter Posts

```http
GET /api/posts/search?keyword=react&category=Technology&status=Published
```

### Export CSV

```http
GET /api/posts/export
```

---

## Environment Variables

Create a `.env` file inside Backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd Backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

---

## Deployment

### Frontend

* Vercel

### Backend

* Render

### Database

* MongoDB Atlas

---

## Screens

### 1. Listing View

* Search Posts
* Filter by Category
* Filter by Status
* Pagination
* Export CSV
* Action Menu

### 2. Add/Edit Post

* Form Validation
* Create New Post
* Update Existing Post

### 3. View Details

* Complete Blog Information
* Thumbnail Preview
* Tags Display
* Author Information

---

## Author

Prachi Katkar

---

## Future Improvements

* User Authentication
* Role Based Access
* Rich Text Editor
* Image Upload Support
* Dashboard Analytics
* Dark Mode
* Unit Testing
