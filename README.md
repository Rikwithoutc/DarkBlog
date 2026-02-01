# Bloggy

A modern, full-stack blogging platform built with React and Flask. Bloggy allows users to create, share, and interact with blog posts in a beautiful dark-themed interface with real-time engagement features.

## Features

- **User Authentication**: Secure sign-up and sign-in with JWT tokens
- **Post Management**: Create, read, and delete blog posts
- **Social Interactions**: Like posts and leave comments
- **User Profiles**: View user information and post history
- **Search Functionality**: Search posts by username
- **Pagination**: Load more posts with smooth pagination
- **Responsive Design**: Beautiful UI with Tailwind CSS and animations
- **Dark Theme**: Modern dark interface with gradient accents
- **Real-time Updates**: Instant updates on likes, comments, and posts

## Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **React Router DOM** 7.13.0 - Client-side routing
- **Tailwind CSS** 4.1.18 - Utility-first CSS framework
- **Lucide React** 0.563.0 - Icon library
- **React Hot Toast** 2.6.0 - Toast notifications
- **Framer Motion** 12.29.2 - Animation library
- **Vite** 7.2.4 - Build tool

### Backend
- **Flask** 3.1.2 - Python web framework
- **Flask-SQLAlchemy** 3.1.1 - ORM
- **Flask-JWT-Extended** 4.7.1 - JWT authentication
- **Flask-CORS** 6.0.2 - Cross-origin resource sharing
- **SQLAlchemy** 2.0.46 - SQL toolkit

## Project Structure

```
Bloggy/
├── frontend/               # React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── service/       # API services
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                # Flask application
│   ├── application/
│   │   ├── config.py      # Configuration
│   │   ├── models.py      # Database models
│   │   ├── routes.py      # API routes
│   │   |── databse.py     # Iniitializes database
|   |   └── security.py    # Handles JWT Access Tokens
│   ├── requirements.txt
│   └── app.py
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables** (create `.env` file)
   ```
   SECRET_KEY=super-secret-dev-key
   JWT_SECRET_KEY=super-jwt-dev-key
   DATABASE_URL=sqlite:///blog.db
   FRONTEND_URL=http://localhost:5173
   ```

6. **Start the backend server**
   ```bash
   python app.py
   ```
   The backend server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (create `.env` file in frontend root)
   ```
   VITE_BACKEND_URL=http://127.0.0.1:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `python run.py` - Start Flask server
- `python -m pytest` - Run tests (if configured)

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/logout` - Logout user

### Posts
- `GET /api/posts` - Get all posts (requires auth)
- `GET /api/posts/public` - Get all posts (no auth required)
- `POST /api/posts` - Create new post (requires auth)
- `DELETE /api/posts/<id>` - Delete post (requires auth)

### Interactions
- `POST /api/posts/<id>/like` - Like a post (requires auth)
- `POST /api/posts/<id>/unlike` - Unlike a post (requires auth)
- `POST /api/posts/<id>/comments` - Add comment (requires auth)

### Users
- `GET /api/users/profile` - Get current user profile (requires auth)

## Usage

1. **Create an Account**: Sign up with your email and password
2. **Create Posts**: Share your thoughts with the community
3. **Engage**: Like posts and leave comments on other users' content
4. **Search**: Find posts from specific users using the search bar
5. **Pagination**: Load more posts to discover more content

## Authentication

DarkBlog uses JWT (JSON Web Tokens) for authentication. Tokens are stored in localStorage and automatically sent with requests to protected endpoints.

## Database

The project uses SQLite for local development. The database is automatically initialized on first run. For production, update the `DATABASE_URL` in configuration.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Happy Blogging! 🚀**
