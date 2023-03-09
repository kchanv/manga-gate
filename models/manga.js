const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mangaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["Manga", "Manhwa", "Manhua"],
  },
  author: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Ongoing", "Completed"],
    required: true,
  },
  manga_endpoint: {
    type: String,
    required: true,
    unique: true,
  },
  thumb: {
    type: String,
    required: true,
  },
  genre_list: [
    {
      type: String,
      required: true,
    },
  ],
  synopsis: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Manga", mangaSchema);
