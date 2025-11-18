# 📁 Pastas Vazias na API

## ⚠️ Problema
Estas pastas estão vazias e podem causar problemas no build da Vercel:

### Pastas Completamente Vazias:
1. `app/api/ods/` - SEM arquivos
2. `app/api/plans/` - SEM arquivos
3. `app/api/subscriptions/` - SEM arquivos
4. `app/api/modules/[id]/` - SEM arquivos
5. `app/api/pathways/[id]/` - SEM arquivos
6. `app/api/users/[id]/progress/` - SEM arquivos
7. `app/api/users/register/` - SEM arquivos

### APIs que FUNCIONAM:
✅ `app/api/skills/route.ts` - Lista todas as skills
✅ `app/api/skills/[id]/route.ts` - Busca skill por ID
✅ `app/api/skills/areas/route.ts` - Lista áreas
✅ `app/api/compare/route.ts` - Compara skills com currículo

---

## 🗑️ Opção 1: Remover (Recomendado)

Execute este comando para remover pastas vazias:

**Windows (PowerShell):**
```powershell
# Remover pastas vazias
Remove-Item -Recurse -Force app/api/ods
Remove-Item -Recurse -Force app/api/plans
Remove-Item -Recurse -Force app/api/subscriptions
Remove-Item -Recurse -Force app/api/modules
Remove-Item -Recurse -Force app/api/pathways
Remove-Item -Recurse -Force app/api/users/register
Remove-Item -Recurse -Force app/api/users/[id]/progress
Remove-Item -Recurse -Force app/api/users/[id]
Remove-Item -Recurse -Force app/api/users
```

**Linux/Mac:**
```bash
rm -rf app/api/ods
rm -rf app/api/plans
rm -rf app/api/subscriptions
rm -rf app/api/modules
rm -rf app/api/pathways
rm -rf app/api/users
```

Depois:
```bash
git add .
git commit -m "clean: removendo pastas vazias da API"
git push origin main
```

---

## 🔨 Opção 2: Implementar APIs Faltantes

Se você planeja usar essas rotas no futuro, implemente-as:

### app/api/ods/route.ts
```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: 1, nome: 'ODS 4 - Educação de Qualidade' },
    { id: 8, nome: 'ODS 8 - Trabalho Decente' },
  ])
}
```

### app/api/plans/route.ts
```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    plans: [
      { id: 'free', name: 'Gratuito', price: 0 },
      { id: 'premium', name: 'Premium', price: 29.90 },
    ]
  })
}
```

---

## 🎯 Recomendação

**Para este momento:** REMOVA as pastas vazias (Opção 1)
- Mais rápido
- Evita erros no build
- Pode recriar depois se precisar

**Para o futuro:** Implemente conforme necessário
- Planeje a estrutura antes
- Crie apenas quando for usar

---

## 📊 Estrutura Final Recomendada

```
app/api/
├── compare/
│   └── route.ts          ✅ FUNCIONA
├── skills/
│   ├── route.ts          ✅ FUNCIONA
│   ├── [id]/
│   │   └── route.ts      ✅ FUNCIONA
│   └── areas/
│       └── route.ts      ✅ FUNCIONA
```

Limpo, funcional e sem erros!

