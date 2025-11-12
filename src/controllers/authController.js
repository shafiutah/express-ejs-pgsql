import {createUser, findUserByEmail} from "../models/userModel.js";
import {hashPassword, verifyPassword} from "../utils/password.js";

export const showLogin = (req, res) => {
  res.render("login", {error: null});
};

export const showRegister = (req, res) => {
  res.render("register", {error: null});
};

export const register = async (req, res) => {
  const {name, email, password} = req.body;
  try {
    const existing = await findUserByEmail(email);
    if (existing) return res.render("register", {error: "Email already registered"});

    const passwordHash = await hashPassword(password);
    await createUser(name, email, passwordHash);
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("register", {error: "Registration failed"});
  }
};

export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.render("login", {error: "Invalid credentials"});

    const valid = await verifyPassword(password, user.password);
    if (!valid) return res.render("login", {error: "Invalid credentials"});

    req.session.user = {id: user.id, name: user.name, email: user.email};
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("login", {error: "Login failed"});
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
};
