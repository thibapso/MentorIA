"use client";

import styles from "./Discover.module.scss";
import dynamic from "next/dynamic";

// Importação dinâmica do Lanyard para evitar problemas de SSR
const Lanyard = dynamic(() => import("../Lanyard/Lanyard"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: "14px",
      }}
    >
      Inicializando componente 3D...
    </div>
  ),
});

export default function Discover() {
  return (
    <section className={styles.discover}>
      <div className={styles.container}>
        <div className={styles.small}>1</div>
        <div className={styles.small}>2</div>
        <div className={styles.large}>
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            fov={20}
            transparent={true}
          />
        </div>
      </div>
    </section>
  );
}
