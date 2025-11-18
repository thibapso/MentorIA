// Detecta automaticamente a URL base
const getAPIUrl = () => {
  // Em produção (Vercel), usa a URL do site
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  // No servidor, usa a variável de ambiente ou localhost
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
}

const API_URL = getAPIUrl()

export interface SkillsMatch {
  id: number
  area: string
  competencias: string[]
}
export async function getAllSkills(filters?: { area?: string }): Promise<SkillsMatch[]> {
  const params = new URLSearchParams()
  if (filters?.area) params.append('area', filters.area)

  const url = `${API_URL}/api/skills${params.toString() ? `?${params}` : ''}`
  const response = await fetch(url)
  
  if (!response.ok) throw new Error('Erro ao buscar skills')
  return response.json()
}

export async function getSkillById(id: number): Promise<SkillsMatch> {
  const response = await fetch(`${API_URL}/api/skills/${id}`)
  if (!response.ok) throw new Error('Área não encontrada')
  return response.json()
}

export async function getAreas(): Promise<string[]> {
  const response = await fetch(`${API_URL}/api/skills/areas`)
  if (!response.ok) throw new Error('Erro ao buscar áreas')
  return response.json()
}

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

export async function updateSkill(id: number, data: Partial<SkillsMatch>): Promise<SkillsMatch> {
  const response = await fetch(`${API_URL}/api/skills/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) throw new Error('Erro ao atualizar skill')
  return response.json()
}

export async function deleteSkill(id: number): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/api/skills/${id}`, {
    method: 'DELETE'
  })
  
  if (!response.ok) throw new Error('Erro ao deletar skill')
  return response.json()
}

