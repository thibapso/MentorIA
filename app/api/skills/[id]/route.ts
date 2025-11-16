import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

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

    const skill = await prisma.skillsMatch.update({
      where: { id: parseInt(id) },
      data: {
        ...(area && { area }),
        ...(competencias && { competencias })
      }
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

