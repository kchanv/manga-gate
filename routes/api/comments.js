const express = require("express");
const router = express.Router();
const commentsCtrl = require("../../controllers/api/comments");

const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/create", commentsCtrl.create);
router.get("/check-token", ensureLoggedIn, commentsCtrl.checkToken);
router.get(
  "/:manga-endpoint",
  ensureLoggedIn,
  commentsCtrl.getCommentsForManga
);
module.exports = router;
