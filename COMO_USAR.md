# 🎯 Como Usar - PathFindr + Supabase

## ⚡ Setup em 3 Passos

### 1. Configure o `.env`

```env
DATABASE_URL="postgresql://postgres:[SENHA]@db.[PROJETO].supabase.co:5432/postgres"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Gere o Prisma Client

```bash
npm run prisma:generate
```

### 3. Rode o projeto

```bash
npm run dev
```

**Pronto!** Acesse: http://localhost:3000 🚀

---

## 📊 Sua Tabela `skills_match`

```
id  | area                      | competencias
----|---------------------------|-------------------
1   | Engenharia de Software    | ["JavaScript", ...]
2   | Data Science              | ["Python", ...]
```

---

## 🔌 APIs Disponíveis

```
GET  /api/skills              # Todas as skills
GET  /api/skills/areas        # Só os nomes das áreas
GET  /api/skills/1            # Skill específica
POST /api/skills              # Criar nova
```

---

## 💻 Usar no Front-End

### Componente Pronto:

```tsx
import SkillsList from '@/components/Examples/SkillsList'

export default function Page() {
  return <SkillsList />
}
```

### Cliente API:

```tsx
import { getAllSkills } from '@/lib/api-client'

const skills = await getAllSkills()
```

### Fetch direto:

```tsx
const res = await fetch('/api/skills')
const skills = await res.json()
```

---

## 🧪 Testar

### No navegador:
- http://localhost:3000/api/skills
- http://localhost:3000/api/skills/areas

### Com curl:
```bash
curl http://localhost:3000/api/skills
```

### Prisma Studio:
```bash
npm run prisma:studio
# http://localhost:5555
```

---

## 🚀 Deploy Vercel

1. **Git push:**
```bash
git push origin main
```

2. **Vercel:**
   - Import do GitHub
   - Adicionar `DATABASE_URL`
   - Deploy! ✨

---

## 📝 Comandos

```bash
npm run dev              # Rodar
npm run build            # Build
npm run prisma:generate  # Gerar Prisma
npm run prisma:studio    # Ver dados
```

---

## 🎓 Para o Trabalho

Você tem:

✅ Next.js + TypeScript  
✅ Banco Supabase conectado  
✅ APIs REST funcionais  
✅ Componente de exemplo  
✅ Dados dinâmicos  

**Agora:**
1. Integre com seu front-end
2. Customize o visual
3. Faça deploy
4. Grave o vídeo! 🎬

---

**Dúvidas?** Veja [SETUP_SIMPLES.md](./SETUP_SIMPLES.md) ou [README.md](./README.md)

