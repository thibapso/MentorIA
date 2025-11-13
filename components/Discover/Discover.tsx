"use client";

import Image from "next/image";
import styles from "./Discover.module.scss";
import dynamic from "next/dynamic";
import DecryptedText from "../DecryptedText/DecryptedText";
import decryptedStyles from "../DecryptedText/DecryptedText.module.scss";
import Folder from "../Folder/Folder";

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

const Globe = dynamic(() => import("../Globe/Globe"), {
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
      Carregando globo...
    </div>
  ),
});

interface DiscoverProps {
  id?: string;
}

export default function Discover({ id }: DiscoverProps) {
  return (
    <section id={id} className={styles.discover}>
      <div className={styles.container}>
        <div className={styles.small}>
          <DecryptedText
            text="Desbloqueando futuros!"
            animateOn="view"
            speed={150}
            sequential={true}
            revealDirection="start"
            loopInfinitely={true}
            pauseDuration={3000}
            className={decryptedStyles.revealed}
            encryptedClassName={decryptedStyles.encrypted}
            parentClassName={decryptedStyles.decryptedText}
          />
        </div>
        <div className={styles.small}>
          <Folder
            size={1.25}
            color="#3b82f6"
            items={[
              <Image
                key="1"
                src="/folder/1.webp"
                alt="imagem de nuvens"
                fill
                style={{ objectFit: "cover" }}
              />,
              <Image
                key="2"
                src="/folder/2.webp"
                alt="imagem do oceano"
                fill
                style={{ objectFit: "cover" }}
              />,
              <Image
                key="3"
                src="/folder/3.webp"
                alt="imagem de prédios"
                fill
                style={{ objectFit: "cover" }}
              />,
            ]}
          />
        </div>
        <div className={styles.small}>
          <Globe />
        </div>
        <div className={styles.small}>4</div>
        <div className={styles.large}>
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            fov={20}
            transparent={true}
          />
          <div className={styles.dragHint}>
            <Image
              src="/swipe.svg"
              alt="Ícone de arrastar"
              width={20}
              height={20}
            />
            <span>Crachá interativo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
