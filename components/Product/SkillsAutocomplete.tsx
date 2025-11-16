'use client'

import { useState, useEffect, useRef } from 'react'
import { getAreas } from '@/lib/api-client'
import styles from './SkillsAutocomplete.module.scss'

export default function SkillsAutocomplete() {
  const [areas, setAreas] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getAreas().then(setAreas).catch(console.error)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredAreas = areas.filter(area =>
    area.toLowerCase().includes(inputValue.toLowerCase())
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setIsOpen(value.length > 0)
    setSelectedIndex(-1)
  }

  const handleSelect = (area: string) => {
    setInputValue(area)
    setIsOpen(false)
    setSelectedIndex(-1)
    
    // Aqui você pode fazer algo com a área selecionada
    console.log('Área selecionada:', area)
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

  return (
    <div className={styles.autocomplete} ref={dropdownRef}>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue && setIsOpen(true)}
          placeholder="Digite sua área profissional..."
          className={styles.input}
          autoComplete="off"
        />
        <svg 
          className={styles.searchIcon} 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8" strokeWidth="2" />
          <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {isOpen && filteredAreas.length > 0 && (
        <div className={styles.dropdown}>
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
  )
}

