const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  posted_by_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
