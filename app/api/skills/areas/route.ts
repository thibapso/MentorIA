import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const skills = await prisma.skillsMatch.findMany({
      select: { id: true, area: true },
      orderBy: { area: 'asc' }
    })

    const areas = skills.map(skill => skill.area.replace(/\n/g, '').trim())

    return NextResponse.json(areas)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar áreas' }, { status: 500 })
  }
}

