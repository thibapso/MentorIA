"use client";

import styles from "./Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.itens}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.svg" width={40} height={40} alt="Logo" />
          <h1>
            Mentor<span>IA</span>
          </h1>
        </Link>

        <ul className={styles.lista}>
          <li>
            <Link href="#discover">Descubra</Link>
          </li>
          <li>
            <Link href="">Produto</Link>
          </li>
          <li>
            <Link href="#benefits">Benefícios</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
