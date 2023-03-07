const Comment = require("../../models/comment");

function checkToken(req, res) {
  console.log("req.user -> ", req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    const comment = await Comment.create(req.body);
    res.json({ comment: comment });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getCommentsForManga(req, res) {
  try {
    // get me comments that belong to req.manga-endpoint
    // return json collection of comments
    res.json({});
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  create,
  checkToken,
  getCommentsForManga,
};
