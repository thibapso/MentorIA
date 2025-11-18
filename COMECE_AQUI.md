# 🎯 COMECE AQUI - Correção do Backend

## ❌ PROBLEMA
```
Frontend: ✅ Funcionando (https://mentoria-gs.vercel.app/)
Backend:  ❌ NÃO FUNCIONA
APIs:     ❌ Retornam erro
```

---

## ✅ SOLUÇÃO EM 3 PASSOS

### 📝 PASSO 1: Execute os Comandos (2 minutos)

Abra o **PowerShell** nesta pasta e execute:

```powershell
# Remover pastas vazias
Remove-Item -Recurse -Force app\api\ods, app\api\plans, app\api\subscriptions, app\api\modules, app\api\pathways, app\api\users

# Fazer commit e push
git add .
git commit -m "fix: configuração backend para Vercel"
git push origin main
```

---

### 🔑 PASSO 2: Configure DATABASE_URL na Vercel (3 minutos)

#### A) Pegue a Connection String do Supabase:
1. 🌐 Abra: https://app.supabase.com/
2. 🎯 Clique no seu projeto
3. ⚙️ Settings → Database
4. 📋 Copie a "Connection String" (URI)
5. ✏️ Troque `[YOUR-PASSWORD]` pela senha real

#### B) Adicione na Vercel:
1. 🌐 Abra: https://vercel.com/dashboard
2. 🎯 Clique no projeto **mentoria**
3. ⚙️ Settings → Environment Variables
4. ➕ Add New:
   - **Key:** `DATABASE_URL`
   - **Value:** [Cole a connection string]
   - **Environments:** ✅ Todos marcados
5. 💾 Save

---

### 🚀 PASSO 3: Force Novo Deploy (1 minuto)

Na Vercel:
1. 📦 Vá em **Deployments**
2. ⋯ Clique nos 3 pontinhos do último deploy
3. 🔄 **Redeploy**
4. ❌ Desmarque "Use existing build cache"
5. ✅ Redeploy

**Aguarde 2-3 minutos para o build completar**

---

## ✅ TESTE FINAL

Abra no navegador:
```
https://mentoria-gs.vercel.app/api/skills
```

**✅ Funcionou?** Você verá um JSON com skills
**❌ Não funcionou?** Veja `INSTRUCOES_FINAIS.md`

---

## 📚 Outros Arquivos (se precisar de ajuda)

| Arquivo | Descrição |
|---------|-----------|
| `DEPLOY_RAPIDO.md` | Guia rápido 5 minutos |
| `INSTRUCOES_FINAIS.md` | Guia passo a passo detalhado |
| `CORRIGIR_VERCEL.md` | Guia técnico completo |
| `RESUMO_PROBLEMA.md` | Explicação do problema |
| `executar-correcao.ps1` | Script automático |

---

## ⏱️ Tempo Total: 5-10 minutos

1. ✅ Passo 1: Comandos (2min)
2. ✅ Passo 2: DATABASE_URL (3min)
3. ✅ Passo 3: Deploy (1min + 3min build)

---

## 🎬 Vamos Começar!

**Execute agora os comandos do PASSO 1 ⬆️**

Depois continue com os passos 2 e 3.

**Boa sorte! 🚀**

