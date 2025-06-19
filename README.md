# Stock Master - MERN Inventory Management

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Fly.io](https://img.shields.io/badge/Fly.io-7B3AF2?style=for-the-badge&logo=fly&logoColor=white)](https://fly.io/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**Stock Master** is a full-stack MERN (MongoDB, Express, React, Node) application designed for efficient and modern inventory management. It features a completely redesigned user interface, robust security enhancements, and a scalable architecture.

**Live Demo:**
- **Frontend:** [https://stock-control-omega.vercel.app/](https://stock-control-omega.vercel.app/)
- **Backend API:** [https://stockmaster.fly.dev/](https://stockmaster.fly.dev/)

## ✨ Key Features & Recent Improvements

- **Modern Animated UI:** A brand new, professionally designed home page with smooth animations (`framer-motion`), interactive elements, and a clean aesthetic.
- **Dark Mode:** A beautiful, persistent dark mode toggle for comfortable viewing in any lighting condition.
- **Robust Backend Architecture:** Refactored for scalability and maintainability with centralized configuration, improved error handling, and graceful shutdown.
- **Enhanced Security:**
  - Comprehensive input validation and sanitization (`express-validator`, `dompurify`) to prevent XSS and other injection attacks.
  - JWT-based authentication with secure `httpOnly` cookies.
  - Security headers, rate limiting, and request size limits.
- **Optimized Data Models:** Corrected data types, added validation, and implemented database indexes for improved performance.
- **Cloudinary Integration:** Seamless image uploads and management for products.
- **Full-Stack Deployment:** The frontend is deployed on **Vercel** and the backend on **Fly.io**, providing a reliable and scalable production environment.
- **Bug Fixes:**
  - Resolved sidebar navigation click area issues.
  - Fixed image upload configuration problems.

## 🛠️ Tech Stack

### Backend
- **Node.js & Express.js:** For the core server logic.
- **MongoDB & Mongoose:** As the database and ODM.
- **JSON Web Token (JWT):** For secure authentication.
- **Cloudinary:** For cloud-based image storage.
- **Express-validator:** For robust input validation.

### Frontend
- **React.js & Redux Toolkit:** For the UI and state management.
- **Framer Motion:** For fluid animations.
- **React Router:** For client-side routing.
- **Axios:** For making HTTP requests to the backend.
- **SASS:** For advanced styling.

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v14+)
- npm
- Git
- MongoDB (A local instance or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster)

### Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/vishalrajofficial/Stock-Master.git
    cd Stock-Master
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    ```
    - Create a `.env` file from `env.example`.
    - Fill in the required environment variables, especially `MONGO_URI`.
    ```env
    # Example backend/.env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=a_secure_secret
    FRONTEND_URL=http://localhost:3000
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

3.  **Setup Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```
    - The frontend is pre-configured to connect to the backend at `http://localhost:5000`. No `.env` file is needed for local development unless you need to override the default.

### Running the Application

1.  **Start the Backend Server:**
    ```bash
    cd backend
    npm start
    ```
    The backend will be running at `http://localhost:5000`.

2.  **Start the Frontend Development Server:**
    ```bash
    cd frontend
    npm start
    ```
    The frontend will open at `http://localhost:3000`.

## 🚀 Deployment

The application is configured for easy deployment.

-   **Backend (Fly.io):**
    The `fly.toml` and `Dockerfile` are included. After installing the `flyctl` CLI, you can deploy using:
    ```bash
    cd backend
    fly launch
    fly deploy
    ```
    Remember to set the necessary secrets (`MONGO_URI`, `JWT_SECRET`, etc.) in your Fly.io dashboard.

-   **Frontend (Vercel):**
    Connect your forked repository to a new Vercel project. Vercel will automatically detect the React setup and deploy it. Set the `REACT_APP_BACKEND_URL` environment variable in the Vercel project settings to your deployed backend URL (e.g., `https://stockmaster.fly.dev`).

## 🤝 Contributing

Contributions are welcome! Please feel free to fork the repository, make improvements, and open a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
