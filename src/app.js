import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import {testConnection} from "./config/db.js";

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
app.use("/", authRoutes);
app.use("/users", userRoutes);

app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.render("dashboard", {user: req.session.user});
});

app.get("/", (req, res) => {
  if (req.session.user) return res.redirect("/dashboard");
  res.redirect("/login");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await testConnection();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
