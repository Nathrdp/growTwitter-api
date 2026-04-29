import express from "express";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/user.routes";
import tweetRoutes from "./routes/tweet.routes";

dotenv.config();

const app = express();

// Configuramos o Express para aceitar requisições com corpo em JSON
app.use(express.json());

// Servimos os arquivos estáticos do front da pasta public
app.use(express.static(path.join(__dirname, "../public")));

// Registramos as rotas da aplicação com seus prefixos
app.use("/user", userRoutes);
app.use("/tweet", tweetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});