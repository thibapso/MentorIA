# 🚀 PathFindr - Plataforma de Skills e Competências

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-Latest-2D3748?logo=prisma)
![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?logo=supabase)

Plataforma web para visualizar áreas profissionais e suas competências necessárias, conectada ao Supabase.

## 📋 Sobre o Projeto

PathFindr é uma plataforma educacional desenvolvida como parte do projeto Framework Application da FIAP. O sistema oferece:

- **Áreas Profissionais**: Visualização de diferentes carreiras
- **Competências**: Skills necessárias para cada área
- **Busca e Filtros**: Encontre áreas específicas
- **API REST**: Endpoints para consumir os dados

## 🛠 Tecnologias

- **Framework**: Next.js 16.0 (React 19)
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Estilização**: SASS/SCSS
- **Animações**: GSAP, Framer Motion
- **3D**: Three.js, React Three Fiber

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20.x ou superior)
- Conta no [Supabase](https://supabase.com) (gratuita)
- [Git](https://git-scm.com/)

## 📥 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/pathfindr.git
cd pathfindr
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Supabase

#### Opção A: Usar seu Supabase existente

Se você já tem a tabela `skills_match` criada:

```env
# .env
DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJETO].supabase.co:5432/postgres"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

#### Opção B: Criar nova tabela no Supabase

1. Acesse seu projeto no Supabase
2. Vá em Table Editor
3. Crie a tabela `skills_match`:

```sql
CREATE TABLE skills_match (
  id SERIAL PRIMARY KEY,
  area TEXT NOT NULL,
  competencias TEXT[] NOT NULL
);

-- Inserir dados de exemplo
INSERT INTO skills_match (area, competencias) VALUES
('Engenharia de Software', ARRAY[
  'Lógica de Programação',
  'Estruturas de Dados',
  'JavaScript/Python/Java',
  'APIs REST',
  'Git',
  'SQL',
  'Cloud (AWS/GCP/Azure)'
]);
```

### 4. Gere o Prisma Client

```bash
npm run prisma:generate
```

### 5. Execute o projeto

```bash
npm run dev
```

Acesse: **http://localhost:3000** 🚀

## 🗄️ Estrutura do Banco de Dados

### Tabela: `skills_match`

| Campo        | Tipo     | Descrição                |
| ------------ | -------- | ------------------------ |
| id           | SERIAL   | ID único (auto-increment)|
| area         | TEXT     | Nome da área profissional|
| competencias | TEXT[]   | Array de competências    |

**Exemplo de registro:**
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
    "SQL"
  ]
}
```

## 🔌 API Endpoints

### Skills (Áreas e Competências)

```http
GET    /api/skills              # Listar todas as skills
GET    /api/skills?area=nome    # Filtrar por área
GET    /api/skills/[id]         # Buscar skill específica
GET    /api/skills/areas        # Listar apenas nomes das áreas
POST   /api/skills              # Criar nova skill
PUT    /api/skills/[id]         # Atualizar skill
DELETE /api/skills/[id]         # Deletar skill
```

### Exemplos de Uso

**Listar todas as skills:**
```javascript
const response = await fetch('/api/skills')
const skills = await response.json()
```

**Buscar áreas:**
```javascript
const response = await fetch('/api/skills/areas')
const areas = await response.json()
// ["Engenharia de Software", "Data Science", ...]
```

**Criar nova skill:**
```javascript
const response = await fetch('/api/skills', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    area: 'Data Science',
    competencias: ['Python', 'Machine Learning', 'SQL']
  })
})
```

## 💻 Usando no Front-End

### Opção 1: Componente Pronto

```typescript
import SkillsList from '@/components/Examples/SkillsList'

export default function Page() {
  return <SkillsList />
}
```

### Opção 2: Cliente API

```typescript
import { getAllSkills, getAreas } from '@/lib/api-client'

// Em um componente
const skills = await getAllSkills()
const areas = await getAreas()
```

### Opção 3: Hook customizado

```typescript
'use client'

import { useEffect, useState } from 'react'
import { getAllSkills, SkillsMatch } from '@/lib/api-client'

export default function MyPage() {
  const [skills, setSkills] = useState<SkillsMatch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllSkills()
      .then(setSkills)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Carregando...</div>

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

## 📝 Scripts Disponíveis

```bash
npm run dev              # Servidor de desenvolvimento
npm run build            # Build de produção
npm start                # Servidor de produção
npm run lint             # Linter

npm run prisma:generate  # Gerar Prisma Client
npm run prisma:studio    # Abrir Prisma Studio
```

## 🌐 Deploy na Vercel

### 1. Push para GitHub

```bash
git add .
git commit -m "Setup completo com Supabase"
git push origin main
```

### 2. Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Import do GitHub
3. Configure variáveis de ambiente:
   - `DATABASE_URL`: Sua connection string do Supabase
   - `NEXT_PUBLIC_APP_URL`: URL do deploy
4. Deploy! ✨

## 🗂️ Estrutura de Pastas

```
pathfindr/
├── app/
│   ├── api/
│   │   └── skills/           # API Routes
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── Examples/
│       └── SkillsList.tsx    # Componente exemplo
├── lib/
│   ├── prisma.ts             # Cliente Prisma
│   └── api-client.ts         # Cliente API
├── prisma/
│   └── schema.prisma         # Schema do banco
├── public/                    # Assets estáticos
├── styles/                    # Estilos SCSS
├── .env                       # Variáveis de ambiente
├── package.json
└── README.md
```

## 🎓 Para o Trabalho da FIAP

### Entregáveis

✅ **Link do Repositório**: GitHub com código completo  
✅ **Link do Deploy**: Vercel com aplicação online  
✅ **Banco de Dados**: Supabase funcionando  
✅ **API REST**: Endpoints documentados  
✅ **Front-end**: Componentes conectados  

### Demonstração no Vídeo (2 min)

1. **Mostrar aplicação online** (30s)
   - Navegar pela interface
   - Mostrar áreas e competências

2. **Mostrar banco de dados** (30s)
   - Abrir Supabase Table Editor
   - Mostrar dados dinâmicos

3. **Mostrar código** (30s)
   - API Routes
   - Schema do Prisma
   - Componentes

4. **Testar API** (30s)
   - Fazer requisição
   - Mostrar resposta JSON

## 📊 Adicionar Mais Dados

### Via Supabase:

1. Abra Table Editor
2. Selecione `skills_match`
3. Insert row

### Via API:

```bash
curl -X POST http://localhost:3000/api/skills \
  -H "Content-Type: "application/json" \
  -d '{
    "area": "DevOps",
    "competencias": ["Docker", "Kubernetes", "CI/CD"]
  }'
```

### Via código:

```typescript
import { createSkill } from '@/lib/api-client'

await createSkill({
  area: 'UX/UI Design',
  competencias: ['Figma', 'Adobe XD', 'Prototipagem']
})
```

## 🔧 Troubleshooting

### "Can't reach database"

- Verifique `DATABASE_URL` no `.env`
- Teste: `npm run prisma:studio`

### "Environment variable not found"

- Certifique `.env` existe
- Reinicie: `npm run dev`

### "Module not found"

- Reinstale: `npm install`
- Gere Prisma: `npm run prisma:generate`

## 📚 Documentação Adicional

- [SETUP_SIMPLES.md](./SETUP_SIMPLES.md) - Guia rápido de 3 minutos
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Supabase Docs](https://supabase.com/docs)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Projeto desenvolvido para fins educacionais - FIAP 2024

## 👥 Autores

- **Seu Nome** - [GitHub](https://github.com/seu-usuario)

---

⭐️ Desenvolvido para a disciplina de Framework Application - FIAP
