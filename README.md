# Express-EJS-PostgreSQL Authentication App

A minimal, production-ready authentication application built with **Express.js**, **EJS** templating, and **PostgreSQL** database. This project demonstrates best practices for user authentication, session management, and role-based access control in Node.js.

![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![Express.js](https://img.shields.io/badge/express-5.1.0-blue)
![PostgreSQL](https://img.shields.io/badge/postgresql-supported-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎯 Features

- ✅ **User Authentication** - Secure registration and login with bcrypt password hashing
- ✅ **Session Management** - Express-session for persistent user sessions
- ✅ **Role-Based Access Control** - Admin and user role differentiation
- ✅ **User Management** - Admin panel to create, view, and delete users
- ✅ **Profile Management** - Users can update their profile and change password
- ✅ **EJS Templating** - Clean, server-side template rendering
- ✅ **PostgreSQL Integration** - Reliable relational database storage
- ✅ **Error Handling** - Comprehensive error handling and logging
- ✅ **Security** - Password hashing, SQL injection prevention, session security
- ✅ **ES Modules** - Modern JavaScript module syntax

---

## 📋 Table of Contents

- [Prerequisites](-#prerequisites)
- [Installation](-#installation)
- [Configuration](-#configuration)
- [Database Setup](-#database-setup)
- [Running the Application](-#running-the-application)
- [Project Structure](-#project-structure)
- [API Routes](-#api-routes)
- [Features Details](-#features-details)
- [Troubleshooting](-#troubleshooting)
- [Contributing](-#contributing)
- [License](-#license)

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18 or higher - [Download](https://nodejs.org/)
- **PostgreSQL** - [Download](https://www.postgresql.org/download/)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/shafiutah/express-ejs-pgsql.git
cd express-ejs-pgsql
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:

- `express` - Web framework
- `ejs` - Templating engine
- `pg` - PostgreSQL client
- `bcryptjs` - Password hashing
- `express-session` - Session management
- `dotenv` - Environment variable management
- `nodemon` - Development server (dev dependency)

---

## ⚙️ Configuration

### Create Environment File

Create a `.env` file in the root directory with the following variables:

```env
# Server Port
PORT=3000

# Session Configuration
SESSION_SECRET=your_secure_session_secret_here

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=express_auth_db
DB_USER=postgres
DB_PASSWORD=your_password_here
```

**Important Security Notes:**

- Never commit `.env` to version control
- Use a strong, random `SESSION_SECRET`
- Keep your database credentials secure
- In production, use environment variables from your hosting platform

---

## 🗄️ Database Setup

### Create PostgreSQL Database

Open PostgreSQL command line and run:

```sql
CREATE DATABASE express_auth_db;
```

### Create Users Table

The application includes an automated table creation script. Run:

```bash
npm run create-table
```

This will create the `users` table with the following schema:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

The server will start with nodemon and auto-reload on file changes.

### Production Mode

```bash
npm start
```

The application will start on `http://localhost:3000` (or your specified PORT).

---

## 📁 Project Structure

```
express-ejs-pgsql/
├── src/
│   ├── app.js                    # Express app setup
│   ├── config/
│   │   └── db.js                 # PostgreSQL connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (login, register, logout)
│   │   └── userController.js     # User management logic
│   ├── data/
│   │   └── createUserTable.js    # Database table creation script
│   ├── middlewares/
│   │   └── authMiddleware.js     # Authentication middleware
│   ├── models/
│   │   └── userModel.js          # Database queries (optional)
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── userRoutes.js         # User endpoints
│   ├── utils/
│   │   └── password.js           # Password utilities
│   └── views/
│       ├── login.ejs             # Login page
│       ├── register.ejs          # Registration page
│       ├── dashboard.ejs         # User dashboard
│       ├── profile.ejs           # Profile management
│       ├── users.ejs             # User management (admin)
│       ├── layout.ejs            # Base layout
│       └── partials/
│           ├── header.ejs        # Header component
│           ├── footer.ejs        # Footer component
│           └── topmenu.ejs       # Top menu component
├── public/                        # Static files (CSS, JS, images)
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── package.json                  # Project metadata
└── README.md                     # This file
```

---

## 🔗 API Routes

### Authentication Routes

| Method | Route       | Description               | Auth Required |
| ------ | ----------- | ------------------------- | ------------- |
| GET    | `/login`    | Display login form        | No            |
| POST   | `/login`    | Process login             | No            |
| GET    | `/register` | Display registration form | No            |
| POST   | `/register` | Process registration      | No            |
| GET    | `/logout`   | Logout user               | Yes           |

### User Routes

| Method | Route               | Description        | Auth Required | Role  |
| ------ | ------------------- | ------------------ | ------------- | ----- |
| GET    | `/users`            | View all users     | Yes           | Admin |
| POST   | `/users/create`     | Create new user    | Yes           | Admin |
| POST   | `/users/:id/delete` | Delete user        | Yes           | Admin |
| GET    | `/users/profile`    | View own profile   | Yes           | Any   |
| POST   | `/users/profile`    | Update own profile | Yes           | Any   |

### General Routes

| Method | Route        | Description                         |
| ------ | ------------ | ----------------------------------- |
| GET    | `/`          | Home (redirects to login/dashboard) |
| GET    | `/dashboard` | User dashboard                      |

---

## ✨ Features Details

### User Registration

- Users can register with Name, Email, Password, and Role
- Passwords are hashed using bcryptjs with 10 salt rounds
- Email uniqueness is enforced in the database
- Form validation on both client and server side

**Endpoint:** `POST /register`
**Example:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "user"
}
```

### User Login

- Email and password authentication
- Secure session creation
- User data stored in session for page rendering
- Invalid credentials return appropriate error messages

**Endpoint:** `POST /login`
**Example:**

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Profile Management

- Users can update their profile information
- Password is optional (leave blank to keep current password)
- Email uniqueness validation prevents conflicts
- Session updates automatically after profile change
- Error handling for duplicate emails

**Endpoint:** `POST /users/profile`
**Example:**

```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "password": "newpassword123"
}
```

### Admin User Management

- View all registered users in a table format
- Create new users (admin only)
- Delete users from the system (admin only)
- Role-based access control ensures only admins can perform these actions

**Protected Routes:**

- `GET /users` - View all users
- `POST /users/create` - Create user
- `POST /users/:id/delete` - Delete user

### Session Management

- Secure sessions using express-session
- Session secret stored in environment variables
- Automatic session persistence
- User data available in all views via `res.locals.user`

---

## 🔒 Security Features

### Password Security

- Passwords hashed with bcryptjs (10 salt rounds)
- Never stored in plain text
- Secure comparison prevents timing attacks

### Session Security

- Secure session cookies
- Session secret configurable via environment
- Automatic session validation on protected routes

### SQL Injection Prevention

- Parameterized queries using pg library
- All user inputs sanitized through prepared statements

### Access Control

- Authentication middleware on protected routes
- Role-based authorization (admin vs user)
- Session validation checks

---

## 🐛 Troubleshooting

### Database Connection Error

```
❌ DB Connection Error: connect ECONNREFUSED
```

**Solution:**

- Ensure PostgreSQL is running
- Check `.env` database credentials
- Verify database exists: `CREATE DATABASE express_auth_db;`

### Table Not Found

```
ERROR: relation "users" does not exist
```

**Solution:**

```bash
npm run create-table
```

### Session Not Saving

**Solution:**

- Ensure `SESSION_SECRET` is set in `.env`
- Check that form method is `POST`
- Verify session save callback completes

### Email Already Exists Error

**Solution:**

- Each user must have a unique email
- Check if email is already registered
- Use a different email address

### Port Already in Use

```
listen EADDRINUSE: address already in use :::3000
```

**Solution:**

- Change PORT in `.env` file
- Or kill process using port 3000

### Views Not Found

```
Error: Failed to lookup view "login"
```

**Solution:**

- Ensure views are in `src/views/` directory
- Check that `app.set("views", path.join(__dirname, "views"));` is correct

---

## 📝 Environment Variables

| Variable         | Description               | Example                |
| ---------------- | ------------------------- | ---------------------- |
| `PORT`           | Server port               | `3000`                 |
| `SESSION_SECRET` | Session encryption secret | `my_secure_secret_key` |
| `DB_HOST`        | PostgreSQL host           | `localhost`            |
| `DB_PORT`        | PostgreSQL port           | `5432`                 |
| `DB_NAME`        | Database name             | `express_auth_db`      |
| `DB_USER`        | Database user             | `postgres`             |
| `DB_PASSWORD`    | Database password         | `your_password`        |

---

## 🧪 Testing Workflow

### 1. Register a New User

- Navigate to `http://localhost:3000/register`
- Fill in form with valid credentials
- Submit registration
- Should redirect to login page

### 2. Login

- Navigate to `http://localhost:3000/login`
- Enter registered email and password
- Should redirect to dashboard

### 3. Update Profile

- Click "Profile" in header menu
- Update name, email, or password
- Click "Update Profile"
- Should see updated information

### 4. Admin Features (if admin user)

- Click "Manage Users" in header menu
- Create new user or delete existing user
- Actions should complete successfully

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

**Shafi Utah**

- GitHub: [@shafiutah](https://github.com/shafiutah)
- Email: your.email@example.com

---

## 📞 Support

For issues, questions, or suggestions:

1. **GitHub Issues:** [Create an issue](https://github.com/shafiutah/express-ejs-pgsql/issues)
2. **Email:** your.email@example.com
3. **Discussion:** Check existing issues for solutions

---

## 🗺️ Roadmap

- [ ] Add email verification for registration
- [ ] Implement password reset functionality
- [ ] Add two-factor authentication
- [ ] Create API documentation with Swagger
- [ ] Add unit and integration tests
- [ ] Implement activity logging
- [ ] Add user profile pictures
- [ ] Create admin dashboard with statistics
- [ ] Implement rate limiting for login attempts
- [ ] Add CSRF protection

---

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [EJS Templating](https://ejs.co/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)
- [Express-session](https://github.com/expressjs/session)

---

## ✅ Changelog

### Version 1.0.0 (2025-11-12)

- Initial release
- User authentication system
- Session management
- Role-based access control
- User profile management
- Admin user management panel
- PostgreSQL integration

---

**Made with ❤️ by Shafi Utah**
