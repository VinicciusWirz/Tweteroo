import express from "express";
import cors from "cors";
import users from "./database/users.js";
import tweets from "./database/tweets.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  const isUsernameString = typeof username === "string";
  const isAvatarString = typeof avatar === "string";

  if (!username || !avatar || !isAvatarString || !isUsernameString) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  users.push({ username, avatar });
  res.status(201).send("OK!");
});

app.get("/sign-up", (req, res) => {
  res.send(users);
});

app.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const username = req.headers.user;

  const isUserSigned = users.find((u) => u.username === username);
  if (!isUserSigned) {
    return res.status(401).send("UNAUTHORIZED");
  }

  const isUsernameString = typeof username === "string";
  const isTweetString = typeof tweet === "string";
  if (!username || !tweet || !isTweetString || !isUsernameString) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  tweets.unshift({ username, tweet });
  res.status(201).send("OK!");
});

app.get("/tweets", (req, res) => {
  const responseTweets = [];
  const page = parseInt(req.query.page);
  const maxNumberOfTweets = 10;
  if (page || page === 0) {
    const pageNotValid = page <= 0;
    if (pageNotValid) {
      return res.status(400).send("Informe uma página válida!");
    }
    let aux = 0;
    const pageStartingValue = page * maxNumberOfTweets - maxNumberOfTweets;
    for (let i = pageStartingValue; aux < maxNumberOfTweets; i++) {
      if (!tweets[i]) {
        return res.send(responseTweets);
      }
      const { username, tweet } = tweets[i];
      const avatar = users.find((u) => u.username === username).avatar;
      responseTweets.push({ username, avatar, tweet });
      aux++;
    }
    return res.send(responseTweets);
  }

  for (let i = 0; i < maxNumberOfTweets; i++) {
    const { username, tweet } = tweets[i];
    const avatar = users.find((u) => u.username === username).avatar;
    responseTweets.push({ username, avatar, tweet });
  }
  res.send(responseTweets);
});

app.get("/tweets/:USERNAME", (req, res) => {
  const { USERNAME } = req.params;
  const filteredTweets = tweets.filter((t) => t.username === USERNAME);
  const avatar = users.find((u) => u.username === USERNAME).avatar;
  const tweetsWithAvatar = [];

  for (let i = 0; i < filteredTweets.length; i++) {
    const { username, tweet } = filteredTweets[i];
    const aux = { username, avatar, tweet };
    tweetsWithAvatar.push(aux);
  }

  return res.send(tweetsWithAvatar);
});

const port = 5000;
app.listen(port, () => `Servidor iniciado utilizando a porta ${port}`);
