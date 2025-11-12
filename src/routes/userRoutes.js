import express from "express";
import {ensureAuth} from "../middlewares/authMiddleware.js";
import {getAllUsers, createUser, deleteUser, updateProfile} from "../controllers/userController.js";

const router = express.Router();

// Admin-only
router.get("/", ensureAuth, async (req, res) => {
  if (req.session.user.role !== "admin") return res.status(403).send("Forbidden");
  const users = await getAllUsers();
  res.render("users", {user: req.session.user, users});
});
router.post("/create", ensureAuth, async (req, res) => {
  if (req.session.user.role !== "admin") return res.status(403).send("Forbidden");
  await createUser(req.body);
  res.redirect("/users");
});
router.post("/:id/delete", ensureAuth, async (req, res) => {
  if (req.session.user.role !== "admin") return res.status(403).send("Forbidden");
  await deleteUser(req.params.id);
  res.redirect("/users");
});
// Profile for logged-in user
router.get("/profile", ensureAuth, (req, res) => {
  res.render("profile", {user: req.session.user});
});
router.post("/profile", ensureAuth, async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.id) {
      return res.render("profile", {user: req.session.user, error: "Session expired. Please login again."});
    }

    const updatedUser = await updateProfile(req.session.user.id, req.body);
    if (!updatedUser) {
      return res.render("profile", {user: req.session.user, error: "Failed to update profile"});
    }
    req.session.user = updatedUser;
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.render("profile", {user: req.session.user, error: "Failed to save session"});
      }
      res.redirect("/profile");
    });
  } catch (err) {
    console.error("Profile update error:", err);
    let errorMessage = "An error occurred while updating profile";

    if (err.code === "EMAIL_EXISTS" || err.message.includes("Email already in use")) {
      errorMessage = "Email already in use by another user";
    }

    res.render("profile", {user: req.session.user, error: errorMessage});
  }
});
export default router;
