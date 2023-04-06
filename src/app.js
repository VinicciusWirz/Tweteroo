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
  const { username, tweet } = req.body;
  const isUsernameString = typeof username === "string";
  const isTweetString = typeof tweet === "string";
  const isUserSigned = users.find((u) => u.username === username);
  if (!isUserSigned) {
    return res.status(401).send("UNAUTHORIZED");
  }
  if (!username || !tweet || !isTweetString || !isUsernameString) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }
  tweets.push({ username, tweet });
  res.status(201).send("OK!");
});

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

const port = 5000;
app.listen(port, () => `Servidor iniciado utilizando a porta ${port}`);
