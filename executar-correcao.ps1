# Script de Correção Automática do Backend
# Execute este script no PowerShell

Write-Host "🔧 Iniciando correção do backend..." -ForegroundColor Cyan

# Passo 1: Remover pastas vazias
Write-Host "`n📁 Removendo pastas vazias da API..." -ForegroundColor Yellow

$pastasParaRemover = @(
    "app\api\ods",
    "app\api\plans",
    "app\api\subscriptions",
    "app\api\modules",
    "app\api\pathways",
    "app\api\users"
)

foreach ($pasta in $pastasParaRemover) {
    if (Test-Path $pasta) {
        Remove-Item -Recurse -Force $pasta
        Write-Host "  ✅ Removido: $pasta" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Não encontrado: $pasta" -ForegroundColor Gray
    }
}

# Passo 2: Adicionar ao Git
Write-Host "`n📦 Preparando commit..." -ForegroundColor Yellow
git add .

# Passo 3: Commit
Write-Host "`n💾 Criando commit..." -ForegroundColor Yellow
git commit -m "fix: configuração completa do backend para Vercel

- Adicionado vercel.json com configuração de build
- Atualizado next.config.ts com suporte ao Prisma
- Atualizado package.json com build correto
- Removidas pastas vazias da API
- Adicionados guias de correção e deploy"

# Passo 4: Push
Write-Host "`n🚀 Enviando para o GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "`n✅ CONCLUÍDO!" -ForegroundColor Green
Write-Host "`n⚠️  IMPORTANTE: Agora você precisa:" -ForegroundColor Red
Write-Host "  1. Configurar DATABASE_URL na Vercel" -ForegroundColor Yellow
Write-Host "  2. Aguardar o build completar (2-3 minutos)" -ForegroundColor Yellow
Write-Host "  3. Testar: https://mentoria-gs.vercel.app/api/skills" -ForegroundColor Yellow
Write-Host "`n📖 Veja DEPLOY_RAPIDO.md para mais detalhes.`n" -ForegroundColor Cyan

