require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const USERNAME = process.env.GITHUB_USERNAME;

app.use(express.static(path.join(__dirname, "public")));

async function getFollowers() {
  const url = `https://api.github.com/users/${USERNAME}/followers`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      `☹️ Error fetching your followers: ${
        error.response?.status || error.message
      }`
    );
    return [];
  }
}

async function getFollowing() {
  const url = `https://api.github.com/users/${USERNAME}/following`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      `☹️ Error fetching users you are following: ${
        error.response?.status || error.message
      }`
    );
    return [];
  }
}

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/data", async (req, res) => {
  try {
    const followers = await getFollowers();
    const following = await getFollowing();

    const followerNames = followers.map((user) => user.login);
    const followingNames = following.map((user) => user.login);

    const youDontFollowBack = followerNames.filter(
      (user) => !followingNames.includes(user)
    );

    const notFollowingYouBack = followingNames.filter(
      (user) => !followerNames.includes(user)
    );

    res.json({
      youDontFollowBack,
      notFollowingYouBack,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong! ☹️" });
  }
});

app.listen(PORT, () => {
  console.log(`🙂 The server is running on http://localhost:${PORT}`);
});
