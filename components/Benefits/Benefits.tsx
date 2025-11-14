"use client";

import CountUp from "./CountUp";
import GlareHover from "./GlareHover";
import SplitText from "@/components/ui/SplitText";
import BounceCards from "./BounceCards";
import styles from "./Benefits.module.scss";

interface BenefitsProps {
  id?: string;
}

export default function Benefits({ id }: BenefitsProps) {
  return (
    <section id={id} className={styles.benefits}>
      <div className={styles.container}>
        <SplitText
          text="Desempenho e Confiabilidade"
          className={styles.title}
          tag="h2"
          delay={50}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.2}
          rootMargin="-50px"
          textAlign="center"
        />

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

        <div className={styles.features}>
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Análise de Compatibilidade</h3>
            <p className={styles.featureDescription}>
              O sistema cruza seu currículo com os requisitos da vaga,
              identificando forças, lacunas e o nível real de aderência. Você
              descobre rapidamente o que já domina e o que precisa ajustar.
            </p>
          </div>

          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>
              Recomendações de Aprimoramento
            </h3>
            <p className={styles.featureDescription}>
              Com base nas lacunas identificadas, geramos sugestões práticas e
              direcionadas, com habilidades para desenvolver, experiências a
              destacar e pontos que aumentam sua compatibilidade.
            </p>
          </div>

          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Métricas de Evolução</h3>
            <p className={styles.featureDescription}>
              Apresentamos o percentual de aderência e o quanto cada melhoria
              impacta sua jornada. Você acompanha seu crescimento com clareza,
              entendendo onde está e até onde pode ir.
            </p>
          </div>
        </div>

        <div className={styles.bentoGrid}>
          <div className={styles.bentoCard}>
            <div className={styles.bentoContent}>
              <BounceCards
                images={[
                  "/creators/1.png",
                  "/creators/2.png",
                  "/creators/3.png",
                ]}
                containerWidth={450}
                containerHeight={450}
                animationDelay={1}
                animationStagger={0.1}
                easeType="elastic.out(1, 0.5)"
                transformStyles={[
                  "rotate(-8deg) translate(-115px)",
                  "rotate(0deg)",
                  "rotate(8deg) translate(115px)",
                ]}
                enableHover={true}
              />
            </div>
            <p className={styles.bentoCaption}>
              Fundadores da{" "}
              <span>
                <i>MentorIA</i>
              </span>
            </p>
          </div>

          <div className={styles.bentoCard}>
            <div className={styles.bentoContent}>
              <h3 className={styles.bentoTitle}>B</h3>
            </div>
            <p className={styles.bentoCaption}>Vagas e oportunidades</p>
          </div>
        </div>
      </div>
    </section>
  );
}
