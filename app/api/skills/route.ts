import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Função para converter string PostgreSQL array em array JavaScript
function parseCompetencias(value: string | string[]): string[] {
  // Se já for array, retorna
  if (Array.isArray(value)) return value
  
  // Se for string no formato PostgreSQL { "item1", "item2" }
  if (typeof value === 'string') {
    // Remove { }, quebras de linha e lixo extra
    const cleaned = value
      .replace(/^\{|\}$/g, '')           // Remove { e }
      .replace(/\\n/g, '')                // Remove \n
      .replace(/\n/g, '')                 // Remove quebras reais
      .replace(/\\" \}/g, '')             // Remove \" }
      .trim()
    
    // Se estiver vazio
    if (!cleaned) return []
    
    // Split por vírgula e limpa cada item
    return cleaned
      .split(',')
      .map(item => item.trim().replace(/^"|"$/g, '').trim())
      .filter(item => item.length > 0)
  }
  
  return []
}

// GET - Listar todas as áreas e competências
export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Iniciando busca de skills...')
    
    const searchParams = request.nextUrl.searchParams
    const area = searchParams.get('area')

    const where: any = {}
    if (area) {
      where.area = { contains: area, mode: 'insensitive' }
    }

    console.log('📊 Executando query no Prisma...')
    const skillsRaw = await prisma.skillsMatch.findMany({
      where,
      orderBy: {
        area: 'asc'
      }
    })

    // Parse das competências de string para array e limpa área
    const skills = skillsRaw.map((skill: any) => ({
      ...skill,
      area: skill.area.replace(/\n/g, '').trim(), // Remove \n do nome da área
      competencias: parseCompetencias(skill.competencias)
    }))

    console.log(`✅ Encontradas ${skills.length} skills`)
    return NextResponse.json(skills)
  } catch (error: any) {
    console.error('❌ Erro detalhado ao buscar skills:')
    console.error('Mensagem:', error.message)
    console.error('Stack:', error.stack)
    console.error('Erro completo:', error)
    
    return NextResponse.json(
      { 
        error: 'Erro ao buscar skills',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// POST - Adicionar nova área com competências
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { area, competencias } = body

    if (!area || !competencias || !Array.isArray(competencias)) {
      return NextResponse.json(
        { error: 'Área e competências (array) são obrigatórios' },
        { status: 400 }
      )
    }

    const skill = await prisma.skillsMatch.create({
      data: {
        area,
        competencias
      }
    })

    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar skill:', error)
    return NextResponse.json(
      { error: 'Erro ao criar skill' },
      { status: 500 }
    )
  }
}

