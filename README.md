# 🐱 GrowTwitter API

Uma rede social estilo Twitter desenvolvida como projeto de conclusão do curso Full Stack II da Growdev.

## 🚀 Deploy

- **API:** https://growtwitter-api-2.onrender.com
- **Banco de dados:** PostgreSQL hospedado no [Neon](https://neon.tech)
- **Frontend:** acessível pela mesma URL da API

## 🛠️ Tecnologias

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- JWT (autenticação)
- Bcrypt (hash de senha)
- Neon (banco em nuvem)
- Render (deploy)

## 📋 Funcionalidades

- Cadastro e login de usuários com autenticação JWT
- Criar tweets e replies
- Curtir e descurtir tweets
- Seguir e deixar de seguir usuários
- Feed personalizado com tweets próprios e de quem segue
- Perfil do usuário com tweets e seguidores

## 🔗 Rotas da API

### Públicas
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /user | Cadastrar usuário |
| POST | /user/login | Login |

### Protegidas (requerem Bearer Token)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /user/:id | Dados do usuário |
| POST | /user/:id/follow | Seguir usuário |
| DELETE | /user/:id/follow | Deixar de seguir |
| POST | /tweet | Criar tweet |
| POST | /tweet/:id/reply | Responder tweet |
| GET | /tweet/feed | Feed do usuário |
| POST | /tweet/:id/like | Curtir tweet |
| DELETE | /tweet/:id/like | Descurtir tweet |

## 🔧 Como rodar localmente

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Preencha o .env com suas credenciais

# Rodar as migrations
npx prisma migrate dev

# Iniciar em desenvolvimento
npm run dev
```

## ⚙️ Variáveis de ambiente

```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
JWT_SECRET=sua_chave_secreta
PORT=3000
```