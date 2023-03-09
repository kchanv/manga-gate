const Comment = require("../../models/comment");

function checkToken(req, res) {
  console.log("req.user -> ", req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    const comment = await Comment.create({
      comment: req.body.comment,
      manga: req.body.manga,
      user: req.body.user._id,
    });
    comment.save((err, comment) => {
      comment.populate("user");
    });
    res.json({
      comment: comment,
    });
  } catch (err) {
    res.status(400).json(err);
  }
}

// async function update(req, res) {
//   try {
//     const comment = await Comment.findOneAndUpdate({
//       // Find the record using ID.. then update the comment.. then save...
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// }

async function getCommentsForManga(req, res) {
  console.log(req.params.manga);
  try {
    const comments = await Comment.find({ manga: req.params.manga }).populate(
      "user"
    );
    console.log(comments);
    // get me comments that belong to req.manga-endpoint
    // return json collection of comments
    res.json({ comments: comments });
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  create,
  //   update,
  checkToken,
  getCommentsForManga,
};
