import express from "express";
import { Users } from "../db";

const router = express.Router();

router.get("/register", (_req, res) => {
  console.log("Register");
  res.render("auth/register");
});

router.get("/login", (_req, res) => {
  console.log("login");
  res.render("auth/login");
});

router.get("/authenticate", (_req, res) => {
  console.log("authenticate");
  res.render("auth/authenticate");
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.login(email, password);
    req.session.user = user;
    res.redirect("/lobby/main-lobby");
  } catch (err) {
    req.flash('error', 'Invalid credentials');
    res.redirect('/auth/login');
  }
});


router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Error logging out");
    }
    res.redirect("/"); 
  });
});


router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await Users.register(username, email, password);
    req.session.user = user;
    res.redirect("/lobby/main-lobby");
  } catch (error) {
    console.error("Error during registration:", error);
    res.redirect("/auth/register");
  }
});


export default router;
