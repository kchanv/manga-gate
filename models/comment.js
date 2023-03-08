const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: mongoose.Schema.Types.String,
  //   timestamps: true,
  manga: mongoose.Schema.Types.String,
});

module.exports = mongoose.model("Comment", commentSchema);
