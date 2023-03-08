const express = require("express");
const router = express.Router();
const commentsCtrl = require("../../controllers/api/comments");

const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/create", commentsCtrl.create);
router.get("/check-token", ensureLoggedIn, commentsCtrl.checkToken);
// router.get("/:manga", ensureLoggedIn, commentsCtrl.getCommentsForManga);
router.get("/:manga", commentsCtrl.getCommentsForManga);
module.exports = router;
