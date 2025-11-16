// Cliente para consumir as APIs do PathFindr no front-end
// Versão simplificada para conectar com Supabase

const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// Tipo para Skills Match
export interface SkillsMatch {
  id: number
  area: string
  competencias: string[]
}

// ======================
// SKILLS (Áreas e Competências)
// ======================

// Buscar todas as áreas e competências
export async function getAllSkills(filters?: {
  area?: string
}): Promise<SkillsMatch[]> {
  const params = new URLSearchParams()
  if (filters?.area) params.append('area', filters.area)

  const url = `${API_URL}/api/skills${params.toString() ? `?${params}` : ''}`
  const response = await fetch(url)
  
  if (!response.ok) throw new Error('Erro ao buscar skills')
  return response.json()
}

// Buscar área específica por ID
export async function getSkillById(id: number): Promise<SkillsMatch> {
  const response = await fetch(`${API_URL}/api/skills/${id}`)
  
  if (!response.ok) throw new Error('Área não encontrada')
  return response.json()
}

// Buscar apenas as áreas (sem competências)
export async function getAreas(): Promise<string[]> {
  const response = await fetch(`${API_URL}/api/skills/areas`)
  
  if (!response.ok) throw new Error('Erro ao buscar áreas')
  return response.json()
}

// Criar nova área com competências
export async function createSkill(data: {
  area: string
  competencias: string[]
}): Promise<SkillsMatch> {
  const response = await fetch(`${API_URL}/api/skills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Erro ao criar skill')
  }
  
  return response.json()
}

// Atualizar área ou competências
export async function updateSkill(
  id: number,
  data: Partial<SkillsMatch>
): Promise<SkillsMatch> {
  const response = await fetch(`${API_URL}/api/skills/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) throw new Error('Erro ao atualizar skill')
  return response.json()
}

// Deletar área
export async function deleteSkill(id: number): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/api/skills/${id}`, {
    method: 'DELETE'
  })
  
  if (!response.ok) throw new Error('Erro ao deletar skill')
  return response.json()
}

// ======================
// HOOKS REACT (Exemplos)
// ======================

// Exemplo de uso com React:
/*
import { useState, useEffect } from 'react'
import { getAllSkills } from '@/lib/api-client'

export function useSkills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllSkills()
      .then(data => setSkills(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { skills, loading, error }
}
*/

// Exemplo de uso em componente:
/*
'use client'

import { useEffect, useState } from 'react'
import { getAllSkills, SkillsMatch } from '@/lib/api-client'

export default function SkillsPage() {
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
      <h1>Áreas e Competências</h1>
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
*/

