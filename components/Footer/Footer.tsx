import styles from './Footer.module.scss'

interface FooterProps {
  id?: string;
}

export default function Footer({ id }: FooterProps) {
  return (
    <footer id={id} className={styles.footer}>
      <p>© 2025 Mentoria — Todos os direitos reservados.</p>
    </footer>
  )
}
