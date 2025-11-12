# Quick Start Guide

Get up and running with Express-EJS-PostgreSQL in 5 minutes!

## 1. Prerequisites ✅

```bash
# Check Node.js version (must be 18+)
node --version

# Check PostgreSQL is running
psql --version
```

## 2. Clone & Install 📦

```bash
git clone https://github.com/shafiutah/express-ejs-pgsql.git
cd express-ejs-pgsql
npm install
```

## 3. Configure Database 🗄️

```bash
# Open PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE express_auth_db;

# Exit
\q
```

## 4. Setup Environment Variables ⚙️

Create `.env` file:

```env
PORT=3000
SESSION_SECRET=change_me_to_a_random_string
DB_HOST=localhost
DB_PORT=5432
DB_NAME=express_auth_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
```

## 5. Create Tables 📋

```bash
npm run create-table
```

## 6. Start Server 🚀

```bash
npm start
```

Visit: `http://localhost:3000`

---

## Test the App

### Create an Account

1. Go to `/register`
2. Fill in the form
3. Click Register

### Login

1. Go to `/login`
2. Enter email and password
3. Click Login

### Update Profile

1. Click "Profile" in the header
2. Update your information
3. Click "Update Profile"

### Admin Features (if admin user)

1. Create an admin user in PostgreSQL:

```sql
INSERT INTO users (name, email, password, role)
VALUES ('Admin User', 'admin@example.com', '$2a$10$...hash...', 'admin');
```

2. Login with admin account
3. Click "Manage Users"
4. Create/delete users as needed

---

## Useful Commands

```bash
# Development (auto-reload on changes)
npm run dev

# Production
npm start

# Recreate tables
npm run create-table
```

---

## Next Steps

- Read [README.md](README.md) for complete documentation
- Check [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- Review code structure in `src/` directory

---

## Troubleshooting

**Port already in use?**

```bash
# Change PORT in .env file
PORT=3001
```

**Database connection error?**

- Check PostgreSQL is running
- Verify credentials in .env
- Ensure database exists

**Table not found?**

```bash
npm run create-table
```

**Session issues?**

- Ensure SESSION_SECRET is set
- Clear browser cookies
- Restart server

---

## Need Help?

- 📖 Read [README.md](README.md)
- 🐛 Check [GitHub Issues](https://github.com/shafiutah/express-ejs-pgsql/issues)
- 💬 Open a Discussion on GitHub

Happy coding! 🎉
