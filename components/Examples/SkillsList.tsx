'use client'

import { useEffect, useState } from 'react'
import { getAllSkills, SkillsMatch } from '@/lib/api-client'

/**
 * Componente de exemplo mostrando como consumir a API de Skills
 * Conecta com a tabela skills_match do Supabase
 * 
 * Para usar este componente em uma página:
 * 
 * import SkillsList from '@/components/Examples/SkillsList'
 * 
 * export default function Page() {
 *   return <SkillsList />
 * }
 */

export default function SkillsList() {
  const [skills, setSkills] = useState<SkillsMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Buscar skills ao montar o componente
  useEffect(() => {
    setLoading(true)
    setError(null)

    getAllSkills()
      .then(data => {
        setSkills(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Filtrar skills pelo termo de busca
  const filteredSkills = skills.filter(skill =>
    skill.area.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Estados de loading e erro
  if (loading) {
    return (
      <div className="skills-loading">
        <p>Carregando áreas e competências...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="skills-error">
        <p>Erro ao carregar skills: {error}</p>
        <button onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="skills-container">
      <h1>Áreas e Competências Profissionais</h1>
      <p className="subtitle">
        Explore as competências necessárias para cada área de carreira
      </p>

      {/* Busca */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar por área..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Total de áreas */}
      <p className="total-count">
        {filteredSkills.length} {filteredSkills.length === 1 ? 'área encontrada' : 'áreas encontradas'}
      </p>

      {/* Lista de skills */}
      {filteredSkills.length === 0 ? (
        <p className="no-results">Nenhuma área encontrada.</p>
      ) : (
        <div className="skills-grid">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  )
}

// Componente auxiliar para exibir cada skill
interface SkillCardProps {
  skill: SkillsMatch
}

function SkillCard({ skill }: SkillCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="skill-card">
      <div className="skill-header">
        <h2>{skill.area}</h2>
        <span className="skill-count">
          {skill.competencias.length} competências
        </span>
      </div>

      {/* Mostrar primeiras 3 competências */}
      <ul className="competencias-list">
        {skill.competencias.slice(0, expanded ? undefined : 3).map((comp, index) => (
          <li key={index}>
            <span className="bullet">✓</span>
            {comp}
          </li>
        ))}
      </ul>

      {/* Botão para expandir/recolher */}
      {skill.competencias.length > 3 && (
        <button
          className="expand-button"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Ver menos' : `Ver todas (${skill.competencias.length})`}
        </button>
      )}
    </div>
  )
}

/* 
EXEMPLO DE CSS (adicione em um arquivo .scss ou .css):

.skills-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.skills-container h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-box input {
  width: 100%;
  max-width: 500px;
  padding: 1rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.search-box input:focus {
  outline: none;
  border-color: #2196F3;
}

.total-count {
  color: #666;
  margin-bottom: 2rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.skill-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  background: white;
  transition: all 0.3s;
}

.skill-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-4px);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.skill-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #2196F3;
}

.skill-count {
  background: #e3f2fd;
  color: #1976D2;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.competencias-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
}

.competencias-list li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bullet {
  color: #4CAF50;
  font-weight: bold;
}

.expand-button {
  width: 100%;
  padding: 0.75rem;
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  color: #2196F3;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.expand-button:hover {
  background: #e3f2fd;
}

.no-results {
  text-align: center;
  color: #666;
  padding: 3rem;
  font-size: 1.125rem;
}

.skills-loading,
.skills-error {
  text-align: center;
  padding: 3rem;
}

.skills-error button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.skills-error button:hover {
  background: #1976D2;
}
*/

