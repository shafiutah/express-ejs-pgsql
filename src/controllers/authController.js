import bcrypt from "bcryptjs";
import {pool} from "../config/db.js";

export async function showRegister(req, res) {
  res.render("register", {user: req.session.user});
}

export async function registerUser(req, res) {
  const {name, email, password, role} = req.body;
  try {
    const existing = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (existing.rows.length) {
      return res.render("register", {user: req.session.user, error: "Email already exists"});
    }
    const hashed = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4)", [name, email, hashed, role || "user"]);
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("register", {user: req.session.user, error: "Registration failed"});
  }
}

export async function showLogin(req, res) {
  res.render("login", {user: req.session.user});
}

export async function loginUser(req, res) {
  const {email, password} = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (!result.rows.length) return res.render("login", {user: req.session.user, error: "Invalid email or password"});

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.render("login", {user: req.session.user, error: "Invalid email or password"});

    req.session.user = {id: user.id, name: user.name, email: user.email, role: user.role};
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("login", {user: req.session.user, error: "Login failed"});
  }
}

export function logoutUser(req, res) {
  req.session.destroy((err) => {
    if (err) console.error(err);
    res.redirect("/login");
  });
}
