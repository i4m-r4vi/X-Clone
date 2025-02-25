# X Clone - A Scalable Social Media Platform

## 🚀 Project Overview

X Clone is a **full-stack social media platform** inspired by X (formerly Twitter). It allows users to share posts, interact with others, and build their network. The project is built using the **MERN stack** and features real-time updates, authentication, and media uploads.

## 🛠 Tech Stack

- **Frontend:** React, React Query, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Database:** MongoDB Atlas
- **Media Storage:** Cloudinary
- **Security:** JWT Authentication, Protected Routes, Input Validation
- **Deployment:** Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

## ✨ Features

- ✅ **User Authentication** – Secure signup & login with JWT authentication.
- ✅ **Post & Media Sharing** – Users can create, like, and comment on posts, with media stored on **Cloudinary**.
- ✅ **Real-time Updates** – Optimized data fetching using **React Query**.
- ✅ **Follow System** – Users can follow/unfollow others and see personalized feeds.
- ✅ **Protected Routes** – Secured access to specific pages based on authentication and user roles.
- ✅ **Optimized Performance** – Efficient API handling & database optimization for scalability.

## 📌 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/i4m-r4vi/X-Clone.git
cd x-clone
```

### 2️⃣ Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the **backend** directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4️⃣ Run the Application

#### Backend

```bash
cd backend
npm start
```

#### Frontend

```bash
cd frontend
npm run dev
```

## 🚀 Deployment

- **Frontend:** Deployed on **Vercel** → [Live Link](https://x-clone-23.vercel.app/)
- **Backend:** Deployed on **Render** → [API Link](https://x-clone-0cpa.onrender.com/)
- **Database:** Hosted on **MongoDB Atlas**

## 📂 Folder Structure

```
X-Clone/
 ├── backend/        # Node.js, Express.js, MongoDB, Authentication
 ├── frontend/       # React, Tailwind CSS, React Query
 ├── README.md       # Project documentation
 ├── .env    # Environment variables template
```

## 📜 API Endpoints

### 🔹 Authentication

- **POST** `/api/auth/register` – Register a new user
- **POST** `/api/auth/login` – Login user & get token

### 🔹 Posts

- **GET** `/api/posts` – Fetch all posts
- **POST** `/api/posts` – Create a new post
- **DELETE** `/api/posts/:id` – Delete a post

### 🔹 Users

- **GET** `/api/users/:id` – Fetch user profile
- **POST** `/api/users/follow/:id` – Follow/unfollow a user

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request.

## 📃 License

This project is open-source and available under the **MIT License**.

---

💡 **Let's connect!** If you have any questions or suggestions, feel free to reach out. 🚀
