# 🚀 Correção Rápida do Backend - 5 Minutos

## ⚡ Passo a Passo URGENTE

### 1️⃣ Configure as Variáveis de Ambiente (MAIS IMPORTANTE!)

1. Acesse: https://vercel.com/dashboard
2. Clique no projeto **mentoria**
3. Vá em **Settings** → **Environment Variables**
4. Adicione:

```
DATABASE_URL
postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJETO].supabase.co:5432/postgres
✓ Production ✓ Preview ✓ Development
```

**Como pegar sua DATABASE_URL:**
- Acesse: https://app.supabase.com/
- Clique no seu projeto
- **Settings** → **Database** → **Connection String** (URI)
- Copie e cole na Vercel

---

### 2️⃣ Faça o Deploy

No terminal (dentro da pasta do projeto):

```bash
git add .
git commit -m "fix: configuração backend"
git push origin main
```

**OU** pela Vercel:
1. Vá em **Deployments**
2. Clique nos 3 pontinhos do último deploy
3. **Redeploy** (desmarque "Use existing build cache")

---

### 3️⃣ Teste se Funcionou

Abra no navegador:
```
https://mentoria-gs.vercel.app/api/skills
```

✅ **Se aparecer JSON:** FUNCIONOU!
❌ **Se der erro:** Verifique se a DATABASE_URL está correta

---

## 🔍 Verificação Rápida

### Problema: Erro 500 na API
**Solução:** Confira se DATABASE_URL está com a senha correta

### Problema: Erro 404 na API
**Solução:** Force novo deploy sem cache

### Problema: "Can't reach database"
**Solução:** Verifique se a tabela `skills_match` existe no Supabase

---

## 📋 Checklist Mínimo

- [ ] DATABASE_URL configurada na Vercel
- [ ] Novo deploy feito
- [ ] Teste em /api/skills retorna JSON

---

✨ **Pronto! Seu backend deve estar funcionando agora.**

Para detalhes completos, veja: `CORRIGIR_VERCEL.md`

