# 🔗 Brev.ly — Encurtador de URLs

Projeto desenvolvido como parte do Desafio da Fase 1 da Pós Graduação da Rocketseat.

O **Brev.ly** é uma aplicação FullStack que permite encurtar URLs, visualizar estatísticas de acessos e exportar relatórios em CSV. O objetivo é consolidar os conhecimentos em backend, frontend e DevOps.

---

## 📁 Estrutura do projeto

O repositório está dividido em duas pastas principais:

- `server/`: Back-end (Fastify, Drizzle, PostgreSQL, Docker)
- `web/`: Front-end (React, Vite, TailwindCSS)

---

## 🚀 Tecnologias utilizadas

### Backend

- Node.js
- TypeScript
- Fastify
- Drizzle ORM
- PostgreSQL
- Docker

### Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- React Hook Form
- Zod
- React Query

---

## 📌 Funcionalidades

### ✅ Back-end

- [x] Criar um link encurtado
  - [x] Validar formato do link encurtado
  - [x] Evitar duplicidade de links encurtados
- [x] Deletar um link
- [x] Obter URL original a partir do link encurtado
- [x] Listar todos os links cadastrados
- [x] Incrementar contador de acessos de um link
- [x] Exportar links como arquivo CSV
  - [x] Acessível por CDN (ex: Cloudflare R2)
  - [x] Nome único para o arquivo
  - [x] Listagem performática
  - [x] CSV com campos: URL original, encurtada, contagem de acessos, data de criação

### ✅ Front-end

- [x] Criar um link encurtado
  - [x] Validar formato do encurtamento
  - [x] Evitar duplicidade
- [x] Deletar link
- [x] Redirecionar para URL original
- [x] Listar links cadastrados
- [x] Incrementar acessos
- [x] Baixar CSV com relatório

### Páginas

- `/`: Página inicial com cadastro e listagem de links
- `/redirect`: Página de redirecionamento
- `*`: Página de "não encontrado"

---

## 📦 Como rodar o projeto

### Pré-requisitos

- Node.js 18+
- Docker + Docker Compose
- Yarn ou npm

### Variáveis de ambiente

#### `.env.example` (server)

```env
#REBRANDLY API
API_TOKEN=

API_URL=

DB_USER=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_PORT=
DATABASE_URL=

APP_PORT=
APP_HOST=
NODE_ENV=
```

#### `.env.example` (web)

```env
VITE_API_URL=
```

### Instalação e execução

# Clonar o repositório

git clone [https://github.com/seu-usuario/brev.ly.git](https://github.com/paulodantas-dev/rocketseat-projeto1.git)
cd rocketseat-projeto1

# Iniciar containers e aplicação

cd server
docker-compose up --build

npm run db:migrate

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

## 💜 Agradecimentos

Desenvolvido como parte da pós-graduação da Rocketseat.
