# 🎯 INSTRUÇÕES FINAIS - Corrigir Backend na Vercel

## 🚨 ATENÇÃO: LEIA PRIMEIRO!

O seu backend não está funcionando porque falta **1 COISA CRÍTICA**:

### ❌ A Vercel não tem a variável `DATABASE_URL`

---

## ⚡ Solução Rápida (5 minutos)

### ETAPA 1: Execute o Script Automático

**No PowerShell (Windows):**
```powershell
.\executar-correcao.ps1
```

**OU faça manualmente:**
```powershell
# Remover pastas vazias
Remove-Item -Recurse -Force app\api\ods
Remove-Item -Recurse -Force app\api\plans
Remove-Item -Recurse -Force app\api\subscriptions
Remove-Item -Recurse -Force app\api\modules
Remove-Item -Recurse -Force app\api\pathways
Remove-Item -Recurse -Force app\api\users

# Commit e push
git add .
git commit -m "fix: configuração backend para Vercel"
git push origin main
```

---

### ETAPA 2: Configure a DATABASE_URL na Vercel (CRÍTICO!)

#### 2.1 - Pegue sua Connection String do Supabase
1. Abra: https://app.supabase.com/
2. Clique no seu projeto
3. Menu lateral: **Settings** ⚙️
4. Clique em **Database**
5. Role até **Connection String**
6. Selecione **URI**
7. Copie a string (exemplo):
   ```
   postgresql://postgres.abc123:SENHA@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
   ```
8. **IMPORTANTE:** Troque `[YOUR-PASSWORD]` pela sua senha real do Supabase

#### 2.2 - Adicione na Vercel
1. Abra: https://vercel.com/dashboard
2. Clique no projeto **mentoria** (ou MentorIA)
3. Menu superior: **Settings**
4. Menu lateral: **Environment Variables**
5. Clique em **Add New**
6. Preencha:
   - **Key:** `DATABASE_URL`
   - **Value:** Cole a connection string do passo 2.1
   - **Environments:** Marque TODOS (Production, Preview, Development)
7. Clique em **Save**

---

### ETAPA 3: Force um Novo Deploy

#### Opção A: Pelo Dashboard (Mais Rápido)
1. Na Vercel, vá em **Deployments**
2. Clique nos 3 pontinhos (⋯) do último deploy
3. Clique em **Redeploy**
4. **IMPORTANTE:** Desmarque ❌ "Use existing build cache"
5. Clique em **Redeploy**

#### Opção B: Trigger via Git
```bash
git commit --allow-empty -m "trigger: redeploy"
git push origin main
```

---

### ETAPA 4: Aguarde o Build (2-3 minutos)

Você pode acompanhar em:
```
https://vercel.com/[seu-usuario]/mentoria/deployments
```

Aguarde até aparecer: ✅ **Ready**

---

### ETAPA 5: TESTE!

Abra no navegador:
```
https://mentoria-gs.vercel.app/api/skills
```

#### ✅ Se Funcionou:
Você verá um JSON com lista de skills:
```json
[
  {
    "id": 1,
    "area": "Engenharia de Software",
    "competencias": ["JavaScript", "TypeScript", ...]
  },
  ...
]
```

#### ❌ Se NÃO Funcionou:
1. Verifique os logs na Vercel:
   - Deployments → Último deploy → **Functions**
2. Veja se DATABASE_URL está correta:
   - Settings → Environment Variables
3. Teste a conexão no Supabase:
   - Vá no Supabase → SQL Editor
   - Execute: `SELECT * FROM skills_match LIMIT 1;`

---

## 📊 Checklist Final

Antes de testar, confirme:

- [ ] ✅ Script executado (pastas removidas)
- [ ] ✅ Commit e push feitos
- [ ] ✅ DATABASE_URL configurada na Vercel
- [ ] ✅ Todos os ambientes marcados (Production, Preview, Development)
- [ ] ✅ Novo deploy feito SEM cache
- [ ] ✅ Build completou com sucesso (status Ready)

---

## 🎬 Teste Completo

Teste todas as APIs:

```bash
# API 1: Listar todas as skills
https://mentoria-gs.vercel.app/api/skills

# API 2: Listar apenas áreas
https://mentoria-gs.vercel.app/api/skills/areas

# API 3: Comparar skills (POST)
# Use Postman ou Insomnia para testar
```

---

## 🐛 Resolução de Problemas

### Erro: "Internal Server Error"
**Causa:** DATABASE_URL incorreta ou não configurada
**Solução:** Verifique a variável na Vercel e force novo deploy

### Erro: "Can't reach database server"
**Causa:** Senha incorreta ou IP bloqueado
**Solução:**
1. Verifique se a senha está correta
2. No Supabase: Settings → Database → Connection Pooling (use Port 5432)

### Erro: "Table skills_match does not exist"
**Causa:** Tabela não existe no banco
**Solução:**
1. Abra Supabase → SQL Editor
2. Execute:
```sql
CREATE TABLE skills_match (
  id SERIAL PRIMARY KEY,
  area TEXT NOT NULL,
  competencias TEXT NOT NULL
);

INSERT INTO skills_match (area, competencias) VALUES
('Engenharia de Software', '{"JavaScript", "TypeScript", "React", "Node.js"}');
```

---

## 📚 Arquivos de Referência

- **DEPLOY_RAPIDO.md** - Guia ultra-rápido (5 min)
- **CORRIGIR_VERCEL.md** - Guia completo detalhado
- **RESUMO_PROBLEMA.md** - Explicação técnica
- **PASTAS_VAZIAS_API.md** - Sobre a limpeza

---

## ✅ Pronto!

Após seguir estas etapas, seu backend estará 100% funcional na Vercel!

**Tempo total:** 5-10 minutos
**Dificuldade:** Fácil

---

## 💡 Dica Pro

Adicione também (opcional):
```
NEXT_PUBLIC_APP_URL = https://mentoria-gs.vercel.app
PERPLEXITY_API_KEY = pplx-xxxxxxxxx (se tiver)
```

---

✨ **Boa sorte! Qualquer dúvida, consulte os outros arquivos de guia.** ✨

