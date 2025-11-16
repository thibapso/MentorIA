# ⚡ Setup Simples - PathFindr + Supabase

Guia rápido para conectar seu projeto Next.js com a tabela `skills_match` do Supabase!

## 📝 Passo a Passo (3 minutos)

### 1️⃣ Configurar Variável de Ambiente (1 min)

Crie um arquivo `.env` na raiz do projeto com a connection string do Supabase:

```env
# Copie a connection string do Supabase
# Settings > Database > Connection String (URI)
DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.xxxxx.supabase.co:5432/postgres"

# URL da aplicação
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Onde encontrar no Supabase:**
1. Acesse seu projeto no Supabase
2. Settings (⚙️) > Database
3. Connection String > URI
4. Copie e cole no `.env`

### 2️⃣ Gerar Prisma Client (30 segundos)

```bash
npm run prisma:generate
```

Isso vai gerar o cliente Prisma que se conecta com sua tabela `skills_match`.

### 3️⃣ Rodar o Projeto (30 segundos)

```bash
npm run dev
```

Pronto! Acesse: **http://localhost:3000** 🚀

---

## 🧪 Testar as APIs

### Endpoints Disponíveis:

```
GET  /api/skills              - Listar todas as áreas e competências
GET  /api/skills/[id]         - Buscar área específica
GET  /api/skills/areas        - Listar apenas nomes das áreas
POST /api/skills              - Criar nova área
PUT  /api/skills/[id]         - Atualizar área
DELETE /api/skills/[id]       - Deletar área
```

### Testar no Navegador:

```
http://localhost:3000/api/skills
http://localhost:3000/api/skills/areas
http://localhost:3000/api/skills/1
```

### Testar com curl:

```bash
# Listar todas as skills
curl http://localhost:3000/api/skills

# Buscar apenas áreas
curl http://localhost:3000/api/skills/areas

# Buscar uma área específica
curl http://localhost:3000/api/skills/1

# Criar nova área
curl -X POST http://localhost:3000/api/skills \
  -H "Content-Type: application/json" \
  -d '{
    "area": "Data Science",
    "competencias": ["Python", "Machine Learning", "SQL", "Statistics"]
  }'
```

---

## 📊 Estrutura do Banco

Sua tabela `skills_match`:

```typescript
{
  id: number              // Serial (auto-increment)
  area: string           // Nome da área (ex: "Engenharia de Software")
  competencias: string[] // Array de competências
}
```

**Exemplo:**
```json
{
  "id": 1,
  "area": "Engenharia de Software",
  "competencias": [
    "Lógica de Programação",
    "Estruturas de Dados e Algoritmos",
    "JavaScript/Python/Java",
    "APIs REST",
    "Git",
    "SQL",
    "Cloud (AWS/GCP/Azure)"
  ]
}
```

---

## 💻 Usar no Front-End

### Opção 1: Componente Pronto

Use o componente de exemplo criado:

```typescript
// Em qualquer página
import SkillsList from '@/components/Examples/SkillsList'

export default function Page() {
  return <SkillsList />
}
```

### Opção 2: Cliente API

Use as funções do cliente:

```typescript
import { getAllSkills, getAreas } from '@/lib/api-client'

// Em um componente
const skills = await getAllSkills()
const areas = await getAreas()
```

### Opção 3: Fetch direto

```typescript
const response = await fetch('/api/skills')
const skills = await response.json()
```

---

## 🎯 Arquivos Criados

```
✅ prisma/schema.prisma           - Schema simplificado
✅ lib/prisma.ts                  - Cliente Prisma
✅ lib/api-client.ts              - Cliente API tipado
✅ app/api/skills/route.ts        - GET, POST
✅ app/api/skills/[id]/route.ts   - GET, PUT, DELETE
✅ app/api/skills/areas/route.ts  - GET áreas
✅ components/Examples/SkillsList.tsx - Componente exemplo
```

---

## 📚 Exemplos de Uso

### Listar todas as skills:

```typescript
'use client'

import { useEffect, useState } from 'react'
import { getAllSkills, SkillsMatch } from '@/lib/api-client'

export default function Page() {
  const [skills, setSkills] = useState<SkillsMatch[]>([])

  useEffect(() => {
    getAllSkills().then(setSkills)
  }, [])

  return (
    <div>
      {skills.map(skill => (
        <div key={skill.id}>
          <h2>{skill.area}</h2>
          <ul>
            {skill.competencias.map((comp, i) => (
              <li key={i}>{comp}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
```

### Buscar por área específica:

```typescript
import { getSkillById } from '@/lib/api-client'

const skill = await getSkillById(1)
console.log(skill.area) // "Engenharia de Software"
```

### Filtrar áreas:

```typescript
import { getAllSkills } from '@/lib/api-client'

const skills = await getAllSkills({ area: 'Engenharia' })
// Retorna áreas que contêm "Engenharia" no nome
```

---

## 🔧 Comandos Úteis

```bash
# Rodar projeto
npm run dev

# Gerar Prisma Client
npm run prisma:generate

# Ver dados no Prisma Studio
npm run prisma:studio

# Build produção
npm run build
```

---

## 🚀 Deploy (Vercel)

### 1. Commitar código:

```bash
git add .
git commit -m "Adiciona integração com Supabase"
git push origin main
```

### 2. Deploy na Vercel:

1. Acesse [vercel.com](https://vercel.com)
2. Import do GitHub
3. Configure variáveis:
   - `DATABASE_URL`: Sua connection string do Supabase
   - `NEXT_PUBLIC_APP_URL`: URL do deploy

4. Deploy! ✨

---

## ❓ Problemas?

### "Can't reach database"

- Verifique se a `DATABASE_URL` está correta no `.env`
- Teste com: `npm run prisma:studio`

### "Environment variable not found"

- Certifique-se que o `.env` existe na raiz
- Reinicie o servidor: `npm run dev`

### "Module not found"

- Reinstale dependências: `npm install`
- Gere o Prisma: `npm run prisma:generate`

---

## 📊 Adicionar Mais Dados

### Pelo Supabase:

1. Abra Table Editor no Supabase
2. Selecione `skills_match`
3. Insert row
4. Preencha `area` e `competencias`

### Pela API:

```bash
curl -X POST http://localhost:3000/api/skills \
  -H "Content-Type: application/json" \
  -d '{
    "area": "UX/UI Design",
    "competencias": ["Figma", "Adobe XD", "Prototipagem", "Design Systems"]
  }'
```

### Pelo código:

```typescript
import { createSkill } from '@/lib/api-client'

await createSkill({
  area: 'DevOps',
  competencias: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform']
})
```

---

## 🎓 Para o Trabalho FIAP

Você já tem:

✅ **Backend** conectado ao Supabase  
✅ **APIs** funcionais  
✅ **Front-end** pronto para integrar  
✅ **Dados dinâmicos** do banco  

### Próximos passos:

1. **Integre** o componente `SkillsList` na sua homepage
2. **Customize** o visual conforme seu design
3. **Adicione** mais áreas no Supabase
4. **Faça deploy** na Vercel
5. **Grave** o vídeo demonstrando

---

**Tempo total: ~3 minutos ⚡**

Tudo funcionando! 🎉

