import express from "express";

const router = express.Router();

//middleware

import { register, login, logout, shop, cart } from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.post("/cart", cart);
router.get("/logout", logout);
router.get("/shop", shop);

module.exports = router;
