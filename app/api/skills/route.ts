import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Converte string PostgreSQL array em array JavaScript
function parseCompetencias(value: string | string[]): string[] {
  if (Array.isArray(value)) return value
  
  if (typeof value === 'string') {
    const cleaned = value
      .replace(/^\{|\}$/g, '')
      .replace(/\\n/g, '')
      .replace(/\n/g, '')
      .replace(/\\" \}/g, '')
      .replace(/\\"\}/g, '')
      .replace(/\\\"/g, '"')
      .replace(/\s*\}\s*$/g, '')
      .trim()
    
    if (!cleaned) return []
    
    return cleaned
      .split(',')
      .map(item => item
        .trim()
        .replace(/^["'\s]+|["'\s]+$/g, '')
        .replace(/\\" \}$/g, '')
        .replace(/\\"\}$/g, '')
        .replace(/\}$/g, '')
        .replace(/\\n/g, '')
        .replace(/\n/g, '')
        .trim()
      )
      .filter(item => item.length > 0)
  }
  
  return []
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const area = searchParams.get('area')

    const where: any = {}
    if (area) {
      where.area = { contains: area, mode: 'insensitive' }
    }

    const skillsRaw = await prisma.skillsMatch.findMany({
      where,
      orderBy: { area: 'asc' }
    })

    const skills = skillsRaw.map((skill: any) => ({
      ...skill,
      area: skill.area.replace(/\n/g, '').trim(),
      competencias: parseCompetencias(skill.competencias)
    }))

    return NextResponse.json(skills)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Erro ao buscar skills', details: error.message },
      { status: 500 }
    )
  }
}

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
      data: { area, competencias }
    })

    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar skill' }, { status: 500 })
  }
}

