"use client";

import CountUp from "./CountUp";
import GlareHover from "./GlareHover";
import styles from "./Benefits.module.scss";

interface BenefitsProps {
  id?: string;
}

export default function Benefits({ id }: BenefitsProps) {
  return (
    <section id={id} className={styles.benefits}>
      <div className={styles.container}>
        <h2 className={styles.title}>Desempenho e Confiabilidade</h2>

        <div className={styles.stats}>
          <GlareHover
            width="100%"
            height="100%"
            background="rgba(255, 255, 255, 0.02)"
            borderRadius="16px"
            borderColor="rgba(255, 255, 255, 0.08)"
            glareColor="#ffffff"
            glareOpacity={0.15}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            className={styles.statItem}
          >
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                <CountUp
                  from={0}
                  to={30}
                  duration={3.5}
                  className={styles.number}
                />
                <span className={styles.suffix}>s</span>
              </div>
              <p className={styles.statLabel}>Tempo médio</p>
            </div>
          </GlareHover>

          <GlareHover
            width="100%"
            height="100%"
            background="rgba(255, 255, 255, 0.02)"
            borderRadius="16px"
            borderColor="rgba(255, 255, 255, 0.08)"
            glareColor="#ffffff"
            glareOpacity={0.15}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            className={styles.statItem}
          >
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                <CountUp
                  from={0}
                  to={100}
                  duration={5}
                  className={styles.number}
                />
                <span className={styles.suffix}>%</span>
              </div>
              <p className={styles.statLabel}>Seguro</p>
            </div>
          </GlareHover>

          <GlareHover
            width="100%"
            height="100%"
            background="rgba(255, 255, 255, 0.02)"
            borderRadius="16px"
            borderColor="rgba(255, 255, 255, 0.08)"
            glareColor="#ffffff"
            glareOpacity={0.15}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            className={styles.statItem}
          >
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                <CountUp
                  from={10}
                  to={0}
                  direction="down"
                  duration={2}
                  className={styles.number}
                />
              </div>
              <p className={styles.statLabel}>Erros registrados</p>
            </div>
          </GlareHover>
        </div>
      </div>
    </section>
  );
}
