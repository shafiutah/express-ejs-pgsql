import express from "express";
import session from "express-session";
import dotenv from "dotenv"; // Added dotenv for environment variable management
import path from "path"; // Added path module for handling file paths
import {fileURLToPath} from "url"; // Added to get __dirname in ES modules
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // Load environment variables from .env file

const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the directory name

const app = express();
app.set("view engine", "ejs"); // Set EJS as the templating engine
app.set("views", path.join(__dirname, "views")); // Set the views directory
app.use(express.urlencoded({extended: true})); // Middleware to parse URL-encoded bodies

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(authRoutes); // Use authentication routes
app.use((req, res) => res.redirect("/login")); // Redirect all unknown routes to login

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
