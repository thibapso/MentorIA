import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Listar apenas as áreas (sem competências)
export async function GET() {
  try {
    const skills = await prisma.skillsMatch.findMany({
      select: {
        id: true,
        area: true
      },
      orderBy: {
        area: 'asc'
      }
    })

    // Retornar apenas array de áreas (limpo, sem \n)
    const areas = skills.map(skill => skill.area.replace(/\n/g, '').trim())

    return NextResponse.json(areas)
  } catch (error) {
    console.error('Erro ao buscar áreas:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar áreas' },
      { status: 500 }
    )
  }
}

