// routes/api/users.js

const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST /api/users
router.post("/", usersCtrl.create);
router.post("/login", usersCtrl.login);
router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);
router.get("/collections", ensureLoggedIn, usersCtrl.checkToken);
router.post("/fav", ensureLoggedIn, usersCtrl.addToFav);
router.post("/fav/:mangaId", ensureLoggedIn, usersCtrl.deleteFromFav);

module.exports = router;
