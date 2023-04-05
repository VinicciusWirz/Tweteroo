import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const port = 5000;
app.listen(port, () => `Servidor iniciado utilizando a porta ${port}`);
