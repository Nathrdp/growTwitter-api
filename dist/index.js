"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const tweet_routes_1 = __importDefault(require("./routes/tweet.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configuramos o Express para aceitar requisições com corpo em JSON
app.use(express_1.default.json());
// Servimos os arquivos estáticos do front da pasta public
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// Registramos as rotas da aplicação com seus prefixos
app.use("/user", user_routes_1.default);
app.use("/tweet", tweet_routes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
