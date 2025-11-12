import express from "express";
import {showLogin, showRegister, register, login, logout} from "../controllers/authController.js";
import {ensureAuth} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/login", showLogin);
router.post("/login", login);

router.get("/register", showRegister);
router.post("/register", register);

router.get("/logout", logout);

router.get("/dashboard", ensureAuth, (req, res) => {
  res.render("dashboard", {user: req.session.user});
});

export default router;
