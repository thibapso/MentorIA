import styles from './Footer.module.scss'
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

interface FooterProps {
  id?: string;
}

export default function Footer({ id }: FooterProps) {
  return (
    <footer id={id} className={styles.footer}>
      <div className={styles.textHoverContainer}>
        <TextHoverEffect text="MentorIA" />
      </div>
    </footer>
  )
}
