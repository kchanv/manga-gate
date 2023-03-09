const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Manga = require("../../models/manga");

function checkToken(req, res) {
  console.log("req.user -> ", req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);

    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User now found");
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) throw new Error("Password invalid");

    const token = createJWT(user);

    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}
async function addToFav(req, res) {
  try {
    const mangaTitle = req.body.title;
    let manga = await Manga.findOne({ title: mangaTitle });

    if (!manga) {
      manga = new Manga({
        title: req.body.title,
        author: req.body.author,
        type: req.body.type,
        status: req.body.status,
        manga_endpoint: req.body.manga_endpoint,
        thumb: req.body.thumb,
        genre_list: req.body.genre_list.map((genre) => genre.genre_name),
        synopsis: req.body.synopsis,
      });
      await manga.save();
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.favorite.push(manga._id);
    await user.save();

    res.status(200).json({ msg: "Manga added to favorites" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
}

async function deleteFromFav(req, res) {
  try {
    const { mangaId } = req.params;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.favorites = user.favorites.filter((manga) => manga.id !== mangaId);
    await user.save();

    res.status(200).json({ msg: "Manga removed from favorites" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

module.exports = {
  create,
  login,
  checkToken,
  addToFav,
  deleteFromFav,
};
