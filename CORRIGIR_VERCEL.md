# 🔧 Guia para Corrigir o Backend na Vercel

## 🔍 Problemas Identificados

1. ❌ **Variáveis de ambiente não configuradas** na Vercel
2. ❌ **Prisma Client pode não estar sendo gerado** corretamente no build
3. ⚠️ **Algumas rotas de API estão vazias** (podem causar erros 404)

---

## ✅ Soluções Passo a Passo

### 1. Configurar Variáveis de Ambiente na Vercel

#### Passo 1.1: Acessar o Dashboard da Vercel
1. Acesse: https://vercel.com/dashboard
2. Clique no projeto **mentoria** (ou MentorIA)
3. Vá em **Settings** → **Environment Variables**

#### Passo 1.2: Adicionar as Variáveis

Adicione estas variáveis de ambiente:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `DATABASE_URL` | `postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJETO].supabase.co:5432/postgres` | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | `https://mentoria-gs.vercel.app` | Production |
| `PERPLEXITY_API_KEY` | `[SUA-CHAVE-PERPLEXITY]` (opcional) | Production, Preview, Development |

**Como obter o DATABASE_URL do Supabase:**
1. Acesse: https://app.supabase.com/
2. Clique no seu projeto
3. Vá em **Settings** → **Database**
4. Copie a **Connection String** (modo URI)
5. Troque `[YOUR-PASSWORD]` pela sua senha real

---

### 2. Atualizar o next.config.ts

Atualize o arquivo `next.config.ts` para suportar APIs:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações para API Routes
  serverExternalPackages: ['@prisma/client', 'prisma'],
  
  // Otimizações
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
```

---

### 3. Criar arquivo vercel.json (Opcional mas Recomendado)

Este arquivo garante que as rotas de API funcionem corretamente:

```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["gru1"]
}
```

---

### 4. Atualizar package.json

Certifique-se que o `postinstall` está configurado:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "eslint",
    "postinstall": "prisma generate",
    "prisma:generate": "prisma generate",
    "prisma:studio": "prisma studio"
  }
}
```

---

### 5. Criar arquivo .env.example

Para documentar as variáveis necessárias:

```env
# Banco de Dados - Supabase
DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJETO].supabase.co:5432/postgres"

# URL da Aplicação
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# API de IA (Opcional)
PERPLEXITY_API_KEY="pplx-xxxxxxxxxxxxxxxxxx"
```

---

### 6. Fazer Deploy

#### Opção A: Redeployar pelo Dashboard
1. Acesse o projeto na Vercel
2. Vá em **Deployments**
3. Clique nos 3 pontinhos do último deploy
4. Clique em **Redeploy**
5. Marque **Use existing build cache** = OFF
6. Clique em **Redeploy**

#### Opção B: Push no Git (Recomendado)
```bash
git add .
git commit -m "fix: configuração backend para Vercel"
git push origin main
```

A Vercel vai fazer o deploy automaticamente.

---

## 🧪 Testar se Funcionou

### Teste 1: API de Skills
Abra no navegador:
```
https://mentoria-gs.vercel.app/api/skills
```

**✅ Deve retornar:** JSON com lista de skills
**❌ Se retornar erro:** Verifique variáveis de ambiente

### Teste 2: API de Áreas
```
https://mentoria-gs.vercel.app/api/skills/areas
```

**✅ Deve retornar:** JSON com lista de áreas

### Teste 3: Logs de Erro
1. Acesse: Vercel Dashboard → Projeto → **Logs**
2. Selecione **Functions**
3. Veja se há erros de conexão com banco ou Prisma

---

## 🐛 Problemas Comuns

### Erro: "PrismaClient is unable to run in the browser"
**Causa:** Importação do Prisma em componente cliente
**Solução:** Use Prisma APENAS em API Routes ou Server Components

### Erro: "Can't reach database server"
**Causa:** DATABASE_URL incorreta ou não configurada
**Solução:** 
1. Verifique a variável na Vercel
2. Teste a conexão no Prisma Studio local
3. Certifique que a senha não tem caracteres especiais não-escapados

### Erro 404 em /api/skills
**Causa:** Build não incluiu as API Routes
**Solução:**
1. Limpe o cache: Settings → Data Cache → Clear All
2. Force novo build sem cache

### Erro: "Module not found: @prisma/client"
**Causa:** Prisma Client não foi gerado no build
**Solução:** Adicione no `package.json`:
```json
"scripts": {
  "build": "prisma generate && next build"
}
```

---

## 📊 Checklist Final

Antes de testar, confirme:

- [ ] DATABASE_URL configurada na Vercel
- [ ] NEXT_PUBLIC_APP_URL configurada na Vercel
- [ ] `postinstall: prisma generate` no package.json
- [ ] Tabela `skills_match` existe no Supabase
- [ ] Tabela tem dados (pelo menos 1 registro)
- [ ] Redeploy foi feito com cache limpo
- [ ] Logs da Vercel não mostram erros

---

## 🎯 Próximos Passos Após Correção

1. **Limpar rotas vazias:**
   - Remover pastas vazias em `app/api/`
   - Ou implementar as rotas faltantes

2. **Adicionar tratamento de erros:**
   - Melhorar mensagens de erro nas APIs
   - Adicionar logs mais detalhados

3. **Otimizar Prisma:**
   - Adicionar connection pooling
   - Configurar timeout adequado

---

## 📞 Precisa de Ajuda?

**Documentação:**
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Prisma com Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Variáveis de Ambiente Vercel](https://vercel.com/docs/projects/environment-variables)

**Comandos Úteis:**
```bash
# Testar build localmente
npm run build
npm run start

# Verificar Prisma
npx prisma studio
npx prisma db pull

# Ver logs da Vercel
npx vercel logs [deployment-url]
```

---

✨ **Após seguir estes passos, seu backend deve estar funcionando!**

