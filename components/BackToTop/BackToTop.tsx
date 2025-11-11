'use client'

import styles from './BackToTop.module.scss'

export default function BackToTop() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.button} onClick={handleClick}>
      <a href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
        </svg>
      </a>
    </div>
  )
}
