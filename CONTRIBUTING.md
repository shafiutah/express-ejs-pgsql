# Contributing to Express-EJS-PostgreSQL

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful and inclusive. All contributors are expected to follow these principles:

- Be welcoming and supportive
- Respect different viewpoints and experiences
- Focus on what is best for the community
- Accept constructive criticism

## Getting Started

### Prerequisites

- Node.js v18 or higher
- PostgreSQL installed and running
- Git installed

### Setup Development Environment

1. Fork the repository
2. Clone your fork:

   ```bash
   git clone https://github.com/YOUR_USERNAME/express-ejs-pgsql.git
   cd express-ejs-pgsql
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create `.env` file with test database:

   ```env
   PORT=3000
   SESSION_SECRET=test_secret_key
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=express_auth_db_test
   DB_USER=postgres
   DB_PASSWORD=your_password
   ```

5. Create the test database:

   ```bash
   npm run create-table
   ```

6. Start development server:
   ```bash
   npm run dev
   ```

## Types of Contributions

### Reporting Bugs

- Check existing issues before reporting
- Provide detailed description
- Include error messages and logs
- Specify your environment (Node version, OS, PostgreSQL version)

### Suggesting Features

- Use GitHub Discussions or Issues
- Describe the use case
- Explain expected behavior
- Suggest possible implementation

### Code Contributions

- Keep changes focused and small
- Follow the existing code style
- Write descriptive commit messages
- Test thoroughly before submitting PR

## Development Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Use meaningful variable names
- Add comments for complex logic
- Follow existing patterns in the codebase

### Commit Messages

Format: `Type: Brief description`

Examples:

- `fix: correct email validation error`
- `feature: add password reset functionality`
- `docs: update installation instructions`
- `refactor: simplify database query logic`

Types:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `refactor:` - Code refactoring
- `test:` - Testing
- `chore:` - Maintenance

### Pull Request Process

1. Update `README.md` with new features or changes
2. Ensure all tests pass locally
3. Create a clear, descriptive PR title
4. Reference any related issues
5. Wait for review and address feedback
6. Squash commits if requested

## Testing

### Manual Testing

- Test all affected routes
- Test error scenarios
- Verify database changes persist
- Check session management

### Test Scenarios

- [ ] User registration with valid data
- [ ] User registration with duplicate email
- [ ] User login with correct credentials
- [ ] User login with incorrect credentials
- [ ] Profile update with new password
- [ ] Profile update with existing email
- [ ] Admin user creation
- [ ] Admin user deletion
- [ ] Session persistence after logout/login

## Questions?

- Check existing issues and discussions
- Open a GitHub Discussion
- Contact maintainer directly

Thank you for contributing! 🙌
