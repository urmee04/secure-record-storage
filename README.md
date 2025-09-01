### Lab 14.2: Secure Record Storage

This lab is a secure Express.js API for managing user notes with proper authentication and authorization. It ensures that users can only access and manage their own notes.

---
#### Features

- User Authentication: Protected endpoints using JWT authentication
- Ownership-Based Authorization: Users can only CRUD their own notes
- RESTful API: Full CRUD operations for notes
- MongoDB Integration: Uses Mongoose for data persistence

---
#### Setup Instructions

##### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm

##### Installation

1. Clone the repository:

```bash
git clone https://github.com/urmee04/secure-record-storage.git
```

`cd secure-record-storage`

2.  Install dependencies:
    `npm install` 
    
3. Set up environment variables:
    Create a .env file in the root directory with the following variables:

```bash
MONGODB_URI=mongodb://localhost:3000/notes
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3000
```

4. Start the server:
   `npm start`
---
#### API Endpoints

- All endpoints require a valid JWT token in the Authorization header:
  `Authorization: Bearer <token>`

#### Security Features

- Authentication Middleware: All note endpoints require valid JWT tokens
- Ownership Verification: Users can only access their own notes
- Password Hashing: User passwords are securely hashed using bcrypt
- Protected Routes: Authorization checks on all CRUD operations

#### Error Responses

The API returns appropriate HTTP status codes:

- 200 - Success
- 201 - Resource created
- 400 - Bad request
- 401 - Unauthorized (invalid or missing token)
- 403 - Forbidden (user doesn't own the requested resource)
- 404 - Resource not found
- 500 - Internal server error
---

#### Project Structure

├── models/
│   ├── Note.js
│   └── User.js
├── routes/
│   ├── api/
│   │   ├── index.js
│   │   └── noteRoutes.js
|       └── userRoutes.js
│   └── index.js
├── Utils/
│   ├── Auth.js
│   
├── config/
│   └── connection.js
├── server.js
└── package.json

---

#### Example usage with postman

We have two sets of routes:

**1. /api/users → handles register and login**

**2. /api/notes → handles CRUD for notes, protected by authMiddleware**

- Register a user

1. Method: POST
2. URL: http://localhost:3000/api/users/register
3. Body (JSON):
```bash
{
  "email": "test@example.com",
  "password": "password",
  "username": "name"
}
```

- Login User

1. Method: POST
2. URL: http://localhost:3000/api/users/login
3. Body (JSON):
```bash
{
  "email": "test@example.com",
  "password": "password"
}
```
`Copy the token from this response. We will use it for all notes requests.`

- Get All Notes (Protected Route)
1. Method: GET
2. URL: http://localhost:3000/api/notes
3. Headers:
`Authorization: Bearer <JWT_TOKEN>`

- Create a Note
1. Method: POST
2. URL: http://localhost:3000/api/notes
3. Headers:
4. Authorization: Bearer <JWT_TOKEN>
```bash
Body (JSON):

{
  "title": "First Note",
  "content": "This is my first note."
}
```

- Update a Note
1. Method: PUT
2. URL: http://localhost:3001/api/notes/<NOTE_ID>
3. Headers:
`Authorization: Bearer <JWT_TOKEN>`
4. Body (JSON):
```bash
{
  "content": "Updated content for my note"
}
```

- Delete a Note
1. Method: DELETE
2. URL: http://localhost:3000/api/notes/<NOTE_ID>
3. Headers:
`Authorization: Bearer <JWT_TOKEN>`

---

#### References

My primary resource for completing the lab was the code from our class lessons and materials. Additionally, I used the resources mentioned below to deepen my understanding of the concepts and code flow

- [mongoose](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/mongoose)

- [mongoDB Bootcamp](https://generalmotors.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065064#overview)

- [express.js Middleware](https://expressjs.com/en/guide/using-middleware.html)