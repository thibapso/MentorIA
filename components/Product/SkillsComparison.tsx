'use client'

import { useState, useEffect, useRef } from 'react'
import { getAreas, getAllSkills } from '@/lib/api-client'
import styles from './SkillsComparison.module.scss'
import { AnimatePresence, motion } from 'framer-motion'

interface ComparisonResult {
  matches: number
  total: number
  matchedSkills: string[]
  missingSkills: string[]
  analysis: string
  method: 'ai' | 'simple'
}

export default function SkillsComparison() {
  const [areas, setAreas] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
  const [areaSkills, setAreaSkills] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set())
  const [loadingSkills, setLoadingSkills] = useState(false)
  const [userData, setUserData] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isComparing, setIsComparing] = useState(false)
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const placeholders = [
    "Ex: Desenvolvimento Front-End",
    "Ex: Data Science",
    "Ex: Desenvolvimento Back-End",
    "Ex: DevOps",
    "Ex: UX/UI Design",
    "Ex: Análise de Dados",
  ]
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getAreas().then(setAreas).catch(console.error)
  }, [])

  // Animated placeholders
  useEffect(() => {
    const startAnimation = () => {
      intervalRef.current = setInterval(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length)
      }, 3000)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible" && intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      } else if (document.visibilityState === "visible") {
        startAnimation()
      }
    }

    startAnimation()
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isOpen || !dropdownRef.current) return

    const dropdown = dropdownRef.current

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation()
      e.preventDefault()
      
      dropdown.scrollTop += e.deltaY
    }

    dropdown.addEventListener('wheel', handleWheel, { passive: false })
    return () => dropdown.removeEventListener('wheel', handleWheel)
  }, [isOpen])

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const handleWheel = (e: WheelEvent) => {
      const target = e.currentTarget as HTMLTextAreaElement
      const isScrollable = target.scrollHeight > target.clientHeight
      
      if (isScrollable) {
        e.stopPropagation()
        e.preventDefault()
        
        target.scrollTop += e.deltaY
      }
    }

    textarea.addEventListener('wheel', handleWheel, { passive: false })
    return () => textarea.removeEventListener('wheel', handleWheel)
  }, [selectedArea])

  const filteredAreas = areas.filter(area =>
    area.toLowerCase().includes(inputValue.toLowerCase())
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setIsOpen(value.length > 0)
    setSelectedIndex(-1)
  }

  const handleSearchClick = () => {
    if (inputValue) {
      setIsOpen(true)
    } else {
      inputRef.current?.focus()
    }
  }

  const handleSelect = async (area: string) => {
    setInputValue(area)
    setIsOpen(false)
    setSelectedIndex(-1)
    setSelectedArea(area)
    setLoadingSkills(true)
    
    try {
      const skills = await getAllSkills({ area })
      if (skills.length > 0) {
        const competencias = skills[0].competencias
        setAreaSkills(competencias)
        // Todas as competências vêm selecionadas por padrão
        setSelectedSkills(new Set(competencias))
      }
    } catch (error) {
      console.error('Erro ao buscar competências:', error)
    } finally {
      setLoadingSkills(false)
    }
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => {
      const newSet = new Set(prev)
      if (newSet.has(skill)) {
        newSet.delete(skill)
      } else {
        newSet.add(skill)
      }
      return newSet
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredAreas.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < filteredAreas.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSelect(filteredAreas[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Aqui você pode implementar a leitura do arquivo
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result as string
        setUserData(text)
      }
      reader.readAsText(file)
    }
  }

  const handleCompare = async () => {
    if (!selectedArea || !userData) {
      alert('Selecione uma área e adicione seus dados para comparar!')
      return
    }

    setIsComparing(true)
    setComparisonResult(null)

    try {
      // Usa apenas as competências selecionadas para comparação
      const skillsToCompare = Array.from(selectedSkills)
      
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userText: userData,
          skills: skillsToCompare,
          area: selectedArea
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao comparar')
      }

      const result = await response.json()
      setComparisonResult(result)
    } catch (error) {
      console.error('Erro na comparação:', error)
      alert('Erro ao fazer a comparação. Tente novamente.')
    } finally {
      setIsComparing(false)
    }
  }

  return (
    <div className={styles.comparisonContainer}>
      {/* Seção 1: Seleção de Área */}
      <div className={styles.section} style={{ zIndex: 100 }}>
        <div className={styles.sectionHeader}>
          <span className={styles.stepNumber}>1</span>
          <h3 className={styles.sectionTitle}>Selecione sua Área Profissional</h3>
        </div>
        
        <div className={styles.autocomplete} ref={autocompleteRef}>
          <div className={styles.inputWrapper}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => inputValue && setIsOpen(true)}
              placeholder=""
              className={styles.input}
              autoComplete="off"
            />
            <div className={styles.placeholderWrapper}>
              <AnimatePresence mode="wait">
                {!inputValue && (
                  <motion.span
                    initial={{ y: 5, opacity: 0 }}
                    key={`placeholder-${currentPlaceholder}`}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "linear" }}
                    className={styles.animatedPlaceholder}
                  >
                    {placeholders[currentPlaceholder]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <svg 
              className={styles.searchIcon} 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              onClick={handleSearchClick}
              style={{ cursor: 'pointer', pointerEvents: 'auto' }}
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {isOpen && filteredAreas.length > 0 && (
            <div className={styles.dropdown} ref={dropdownRef}>
              {filteredAreas.map((area, index) => (
                <button
                  key={area}
                  className={`${styles.option} ${index === selectedIndex ? styles.selected : ''}`}
                  onClick={() => handleSelect(area)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {area}
                </button>
              ))}
            </div>
          )}

          {isOpen && inputValue && filteredAreas.length === 0 && (
            <div className={styles.dropdown}>
              <div className={styles.noResults}>
                Nenhuma área encontrada
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Seção 2: Competências da Área */}
      {selectedArea && (
        <div className={styles.section} style={{ zIndex: 50 }}>
          <div className={styles.sectionHeader}>
            <span className={styles.stepNumber}>2</span>
            <h3 className={styles.sectionTitle}>
              Competências de <span className={styles.highlight}>{selectedArea}</span>
            </h3>
          </div>
          
          <p className={styles.skillsHint}>
            Clique para desmarcar competências
          </p>
          
          {loadingSkills ? (
            <div className={styles.loading}>Carregando competências...</div>
          ) : (
            <div className={styles.skillsGrid}>
              {areaSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className={`${styles.skillChip} ${!selectedSkills.has(skill) ? styles.deselected : ''}`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Seção 3: Dados do Usuário */}
      {selectedArea && (
        <div className={styles.section} style={{ zIndex: 25 }}>
          <div className={styles.sectionHeader}>
            <span className={styles.stepNumber}>3</span>
            <h3 className={styles.sectionTitle}>Adicione seus Dados</h3>
          </div>
          
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            placeholder="Cole seu currículo ou descreva suas experiências, projetos e tecnologias que você domina..."
            value={userData}
            onChange={(e) => setUserData(e.target.value)}
          />

          <div className={styles.actions}>
            <div className={styles.fileUploadWrapper}>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className={styles.fileInput}
                id="fileUpload"
              />
              <label htmlFor="fileUpload" className={styles.fileUploadButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="17 8 12 3 7 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="3" x2="12" y2="15" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {uploadedFile ? uploadedFile.name : 'Upload de currículo'}
              </label>
            </div>

            <button 
              className={styles.compareButton}
              onClick={handleCompare}
              disabled={!selectedArea || !userData || isComparing}
            >
              {isComparing ? (
                <>
                  <span className={styles.spinner}></span>
                  Analisando...
                </>
              ) : (
                'Analisar'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Resultado da Comparação */}
      {comparisonResult && (
        <div className={styles.resultSection}>
          <div className={styles.resultHeader}>
            <h3>Resultado da Análise</h3>
            <div 
              className={styles.scoreCircle}
              style={{
                background: `hsla(${210 + (Math.round((comparisonResult.matches / comparisonResult.total) * 100) * 0.15)}, 70%, ${20 + (Math.round((comparisonResult.matches / comparisonResult.total) * 100) * 0.1)}%, 0.12)`,
                borderColor: `hsl(${210 + (Math.round((comparisonResult.matches / comparisonResult.total) * 100) * 0.15)}, 70%, ${45 + (Math.round((comparisonResult.matches / comparisonResult.total) * 100) * 0.15)}%)`
              }}
            >
              <span 
                className={styles.scoreNumber}
                style={{
                  color: `hsl(${210 + (Math.round((comparisonResult.matches / comparisonResult.total) * 100) * 0.15)}, 75%, ${55 + (Math.round((comparisonResult.matches / comparisonResult.total) * 100) * 0.15)}%)`
                }}
              >
                {Math.round((comparisonResult.matches / comparisonResult.total) * 100)}%
              </span>
              <span className={styles.scoreLabel}>Match</span>
            </div>
          </div>

          <p className={styles.resultAnalysis}>{comparisonResult.analysis}</p>

          <div className={styles.resultGrid}>
            <div className={styles.resultColumn}>
              <p className={styles.resultColumnTitle}>
                Você possui ({comparisonResult.matchedSkills.length})
              </p>
              <div className={styles.skillsResultGrid}>
                {comparisonResult.matchedSkills.map((skill, index) => (
                  <div key={index} className={styles.matchedSkill}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.resultColumn}>
              <p className={styles.resultColumnTitle}>
                Para desenvolver ({comparisonResult.missingSkills.length})
              </p>
              <div className={styles.skillsResultGrid}>
                {comparisonResult.missingSkills.map((skill, index) => (
                  <div key={index} className={styles.missingSkill}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

