import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Buscar área específica por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const skill = await prisma.skillsMatch.findUnique({
      where: { id: parseInt(params.id) }
    })

    if (!skill) {
      return NextResponse.json(
        { error: 'Área não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Erro ao buscar skill:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar skill' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar área ou competências
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { area, competencias } = body

    const skill = await prisma.skillsMatch.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(area && { area }),
        ...(competencias && { competencias })
      }
    })

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Erro ao atualizar skill:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar skill' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar área
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.skillsMatch.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ message: 'Área deletada com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar skill:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar skill' },
      { status: 500 }
    )
  }
}

