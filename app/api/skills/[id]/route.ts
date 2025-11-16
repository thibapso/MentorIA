import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Converte array JavaScript em string PostgreSQL array
function stringifyCompetencias(competencias: string[]): string {
  return `{${competencias.map(item => `"${item}"`).join(', ')}}`
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const skill = await prisma.skillsMatch.findUnique({
      where: { id: parseInt(id) }
    })

    if (!skill) {
      return NextResponse.json({ error: 'Área não encontrada' }, { status: 404 })
    }

    return NextResponse.json(skill)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar skill' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { area, competencias } = body

    const updateData: any = {}
    if (area) updateData.area = area
    if (competencias) {
      updateData.competencias = Array.isArray(competencias) 
        ? stringifyCompetencias(competencias)
        : competencias
    }

    const skill = await prisma.skillsMatch.update({
      where: { id: parseInt(id) },
      data: updateData
    })

    return NextResponse.json(skill)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar skill' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.skillsMatch.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ message: 'Área deletada com sucesso' })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar skill' }, { status: 500 })
  }
}

