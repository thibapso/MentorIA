# MentorIA

> Às vezes, o que falta não é talento. É MentorIA.

![Image](https://github.com/user-attachments/assets/9408efba-a730-4abe-947f-2a0d2cd9db96)

Uma plataforma inteligente que conecta profissionais às competências essenciais de suas áreas, ajudando você a descobrir seu caminho com propósito e autoconfiança.

## ✨ Funcionalidades

- **Análise de Compatibilidade** — Compare seu perfil com as competências da sua área
- **Métricas de Evolução** — Acompanhe seu crescimento com clareza
- **Recomendações Personalizadas** — Sugestões práticas baseadas nas suas lacunas
- **Interface Moderna** — Animações fluidas e design responsivo

## Tecnologias

Next.js 16 · React 19 · TypeScript · Prisma · PostgreSQL · SASS · Framer Motion · Three.js

## Quick Start

```bash
# Clone o repositório
git clone https://github.com/thibapso/MentorIA.git
cd MentorIA

# Instale as dependências
npm install

# Configure o arquivo .env (veja abaixo)

# Gere o Prisma Client
npx prisma generate

# Rode o projeto
npm run dev
```

Acesse [localhost:3000](http://localhost:3000) 🎉

## Configuração

Para rodar o projeto localmente, você vai precisar configurar suas variáveis de ambiente.

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:senha@db.projeto.supabase.co:5432/postgres"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> Se você não tem acesso ao banco de dados, entre em contato para conversarmos sobre a configuração!

## Comandos

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm start            # Servidor de produção
npx prisma studio    # Visualizar banco de dados
```

## Estrutura do Projeto

```
mentoria/
├── app/              # App Router (Next.js 16)
├── components/       # Componentes React
├── lib/              # Utilitários e configurações
├── prisma/           # Schema do banco de dados
├── public/           # Assets estáticos
└── styles/           # Estilos SCSS globais
```

---

<div align="center">
  <sub>Desenvolvido com 💙 por MentorIA</sub>
</div>
