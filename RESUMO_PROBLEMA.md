# 🔴 PROBLEMA: Backend não funciona na Vercel

## 📊 Status Atual
- ✅ Frontend: FUNCIONANDO (https://mentoria-gs.vercel.app/)
- ❌ Backend: NÃO FUNCIONANDO
- ❌ APIs: Retornando erro

---

## 🎯 Causa Raiz

### 1. Variável de Ambiente Faltando (CRÍTICO)
A Vercel NÃO tem a `DATABASE_URL` configurada.

### 2. Build do Prisma
O comando de build não estava gerando o Prisma Client corretamente.

### 3. Configuração do Next.js
Faltavam configurações para suportar Prisma em serverless.

### 4. Pastas Vazias
Várias pastas de API vazias podem causar problemas.

---

## ✅ SOLUÇÃO (O que foi feito)

### Arquivos Criados:
1. ✅ `vercel.json` - Configuração do build
2. ✅ `CORRIGIR_VERCEL.md` - Guia completo
3. ✅ `DEPLOY_RAPIDO.md` - Guia rápido 5min
4. ✅ `PASTAS_VAZIAS_API.md` - Limpeza de pastas

### Arquivos Atualizados:
1. ✅ `next.config.ts` - Adicionado suporte ao Prisma
2. ✅ `package.json` - Build atualizado

---

## 🚀 O QUE VOCÊ PRECISA FAZER AGORA

### PASSO 1: Configure a Vercel (2 minutos)
1. Acesse: https://vercel.com/dashboard
2. Abra o projeto **mentoria**
3. Vá em **Settings** → **Environment Variables**
4. Adicione:
   - Nome: `DATABASE_URL`
   - Valor: Sua connection string do Supabase
   - Ambientes: ✓ Production ✓ Preview ✓ Development

**Como pegar o DATABASE_URL:**
```
1. Acesse: https://app.supabase.com/
2. Clique no seu projeto
3. Settings → Database
4. Copie "Connection String" (URI)
5. Troque [YOUR-PASSWORD] pela senha real
```

### PASSO 2: Limpe Pastas Vazias (1 minuto)
**Windows PowerShell:**
```powershell
Remove-Item -Recurse -Force app/api/ods
Remove-Item -Recurse -Force app/api/plans
Remove-Item -Recurse -Force app/api/subscriptions
Remove-Item -Recurse -Force app/api/modules
Remove-Item -Recurse -Force app/api/pathways
Remove-Item -Recurse -Force app/api/users
```

**Mac/Linux:**
```bash
rm -rf app/api/{ods,plans,subscriptions,modules,pathways,users}
```

### PASSO 3: Faça o Deploy (1 minuto)
```bash
git add .
git commit -m "fix: configuração completa do backend para Vercel"
git push origin main
```

### PASSO 4: Aguarde o Build (2-3 minutos)
A Vercel vai fazer o deploy automaticamente.

### PASSO 5: Teste (30 segundos)
Abra no navegador:
```
https://mentoria-gs.vercel.app/api/skills
```

✅ **Deve aparecer:** JSON com lista de skills

---

## 📋 Checklist Completo

- [ ] DATABASE_URL adicionada na Vercel
- [ ] Pastas vazias removidas
- [ ] Commit e push realizados
- [ ] Build da Vercel completou sem erros
- [ ] Teste em /api/skills retorna JSON
- [ ] Teste em /api/skills/areas retorna JSON

---

## 🐛 Se Ainda Não Funcionar

### Erro: "Can't reach database"
- Verifique se DATABASE_URL está correta
- Teste a conexão no Supabase

### Erro: "PrismaClient not found"
- Force novo deploy SEM cache:
  - Vercel → Deployments → Redeploy
  - Desmarque "Use existing build cache"

### Erro 404 nas APIs
- Verifique se as pastas foram commitadas
- Veja os logs: Vercel → Functions → Logs

---

## 📞 Onde Encontrar Ajuda

**Arquivos de Referência:**
- `DEPLOY_RAPIDO.md` - Guia rápido 5 minutos
- `CORRIGIR_VERCEL.md` - Guia completo detalhado
- `PASTAS_VAZIAS_API.md` - Limpeza de pastas

**Logs da Vercel:**
```
https://vercel.com/[seu-usuario]/mentoria/logs
```

**Teste Local:**
```bash
npm run build
npm run start
# Teste: http://localhost:3000/api/skills
```

---

## ⏱️ Tempo Total Estimado
**5-10 minutos** para ter o backend funcionando!

1. Configure variáveis (2min)
2. Limpe pastas (1min)
3. Faça deploy (1min)
4. Aguarde build (3-5min)
5. Teste (30seg)

---

✨ **Boa sorte! Seu backend vai funcionar!** ✨

