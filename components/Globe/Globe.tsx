"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef } from "react";
import { useSpring } from "react-spring";

// Conexões entre cidades (origem -> destino)
const connections = [
  [
    [-23.5505, -46.6333],
    [40.7128, -74.006],
  ], // São Paulo -> Nova York
  [
    [40.7128, -74.006],
    [51.5074, -0.1278],
  ], // Nova York -> Londres
  [
    [51.5074, -0.1278],
    [21.5433, 39.1728],
  ], // Londres -> Jedá
  [
    [21.5433, 39.1728],
    [1.3521, 103.8198],
  ], // Jedá -> Singapura
  [
    [1.3521, 103.8198],
    [35.6762, 139.6503],
  ], // Singapura -> Tóquio
  [
    [35.6762, 139.6503],
    [21.3099, -157.8581],
  ], // Tóquio -> Hawaii
  [
    [-1.4558, -48.4902],
    [-23.5505, -46.6333],
  ], // Belém -> São Paulo
  [
    [51.1694, 71.4491],
    [35.6762, 139.6503],
  ], // Astana -> Tóquio
];

const GLOBE_CONFIG: COBEOptions = {
  width: 1000,
  height: 1000,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: 1,
  diffuse: 0.25,
  mapSamples: 16000,
  mapBrightness: 1.85,
  baseColor: [0.35, 0.35, 0.35], // Oceano: cinza mais claro
  markerColor: [0.08, 0.2, 0.45], // Azul apagado/discreto
  glowColor: [0.15, 0.15, 0.15], // Brilho igual ao oceano
  markers: [
    { location: [-1.4558, -48.4902], size: 0.06 }, // Belém
    { location: [-23.5505, -46.6333], size: 0.06 }, // São Paulo
    { location: [40.7128, -74.006], size: 0.06 }, // Nova York
    { location: [21.3099, -157.8581], size: 0.06 }, // Hawaii
    { location: [51.5074, -0.1278], size: 0.06 }, // Londres
    { location: [21.5433, 39.1728], size: 0.06 }, // Jedá
    { location: [35.6762, 139.6503], size: 0.06 }, // Tóquio
    { location: [1.3521, 103.8198], size: 0.06 }, // Singapura
    { location: [51.1694, 71.4491], size: 0.06 }, // Astana
    { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
    // Adiciona pontos intermediários para criar os arcos
    ...connections.flatMap(([start, end]) => {
      const steps = 20; // Número de pontos no arco
      return Array.from({ length: steps }, (_, i) => ({
        location: [
          start[0] + ((end[0] - start[0]) * i) / steps,
          start[1] + ((end[1] - start[1]) * i) / steps,
        ] as [number, number],
        size: 0.01, // Pontos pequenos para formar a linha
      }));
    }),
  ],
};

export default function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  let animationTime = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value;
    canvasRef.current!.style.cursor = value ? "grabbing" : "grab";
  };

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      api.start({ r: delta / 200 });
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r.get();
      state.width = width * 2;
      state.height = width * 2;

      // Anima pontos ao longo das rotas
      animationTime += 0.01;
      const animatedMarkers = connections.flatMap(
        ([start, end], routeIndex) => {
          const numDots = 3; // 3 pontos por rota
          return Array.from({ length: numDots }, (_, dotIndex) => {
            // Calcula a posição do ponto ao longo da rota
            const offset = dotIndex / numDots + animationTime * 0.3; // Velocidade
            const progress = offset % 1; // Loop infinito

            return {
              location: [
                start[0] + (end[0] - start[0]) * progress,
                start[1] + (end[1] - start[1]) * progress,
              ] as [number, number],
              size: 0.03,
            };
          });
        }
      );

      // Atualiza os marcadores com os pontos animados
      state.markers = [
        { location: [-1.4558, -48.4902], size: 0.06 }, // Belém
        { location: [-23.5505, -46.6333], size: 0.06 }, // São Paulo
        { location: [40.7128, -74.006], size: 0.06 }, // Nova York
        { location: [21.3099, -157.8581], size: 0.06 }, // Hawaii
        { location: [51.5074, -0.1278], size: 0.06 }, // Londres
        { location: [21.5433, 39.1728], size: 0.06 }, // Jedá
        { location: [35.6762, 139.6503], size: 0.06 }, // Tóquio
        { location: [1.3521, 103.8198], size: 0.06 }, // Singapura
        { location: [51.1694, 71.4491], size: 0.06 }, // Astana
        { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
        ...animatedMarkers,
      ];
    },
    [pointerInteracting, phi, r]
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 0.25,
      mapSamples: 16000,
      mapBrightness: 2.45,
      baseColor: [0.35, 0.35, 0.35],
      markerColor: [0.08, 0.2, 0.45],
      glowColor: [0.15, 0.15, 0.15],
      markers: [],
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"));
    return () => globe.destroy();
  }, []);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <canvas
        className={className}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
        style={{
          width: "145%",
          height: "145%",
          cursor: "grab",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
          position: "absolute",
          top: "55%",
          left: "48%",
          transform: "translate(-40%, -40%) rotate(-12deg)",
          filter:
            "drop-shadow(0 8px 32px rgba(255, 255, 255, 0.04)) drop-shadow(0 0 80px rgba(255, 255, 255, 0.02))",
        }}
      />
    </div>
  );
}
