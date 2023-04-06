import express from "express";
import cors from "cors";
import users from "./database/users.js";

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
  res.send("OK");
});

app.get("/sign-up", (req, res) => {
  res.send(users);
});

const port = 5000;
app.listen(port, () => `Servidor iniciado utilizando a porta ${port}`);
