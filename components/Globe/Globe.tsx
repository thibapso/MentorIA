"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef } from "react";
import { useSpring } from "react-spring";

// Conexões entre cidades (origem -> destino)
const connections: [number[], number[]][] = [
  [[-23.5505, -46.6333], [40.7128, -74.006]], // São Paulo -> Nova York
  [[40.7128, -74.006], [51.5074, -0.1278]], // Nova York -> Londres
  [[51.5074, -0.1278], [21.5433, 39.1728]], // Londres -> Jedá
  [[21.5433, 39.1728], [1.3521, 103.8198]], // Jedá -> Singapura
  [[1.3521, 103.8198], [35.6762, 139.6503]], // Singapura -> Tóquio
  [[35.6762, 139.6503], [21.3099, -157.8581]], // Tóquio -> Hawaii
  [[-1.4558, -48.4902], [-23.5505, -46.6333]], // Belém -> São Paulo
  [[51.1694, 71.4491], [35.6762, 139.6503]], // Astana -> Tóquio
];

const GLOBE_CONFIG: COBEOptions = {
  width: 1000,
  height: 1000,
  onRender: () => { },
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 3.2,
  baseColor: [0.45, 0.45, 0.45],
  markerColor: [0.08, 0.2, 0.45],
  glowColor: [0.15, 0.15, 0.15],
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
  ],
};

export default function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const phi = useRef(0);
  const width = useRef(0);
  const animationTime = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: { mass: 1, tension: 280, friction: 40, precision: 0.001 },
  }));

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current)
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      api.start({ r: delta / 200 });
    }
  };

  const onRender = useCallback(
    (state: Record<string, unknown>) => {
      if (!pointerInteracting.current) phi.current += 0.005;
      state.phi = phi.current + r.get();
      state.width = width.current * 2;
      state.height = width.current * 2;

      animationTime.current += 0.01;
      const animatedMarkers = connections.flatMap(([start, end]) => {
        const numDots = 3;
        return Array.from({ length: numDots }, (_, dotIndex) => {
          const offset = dotIndex / numDots + animationTime.current * 0.3;
          const progress = offset % 1;

          return {
            location: [
              start[0] + (end[0] - start[0]) * progress,
              start[1] + (end[1] - start[1]) * progress,
            ] as [number, number],
            size: 0.03,
          };
        });
      });

      state.markers = [
        ...config.markers!,
        ...animatedMarkers,
      ];
    },
    [pointerInteracting, r, config.markers]
  );

  const onResize = () => {
    if (canvasRef.current) {
      width.current = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width.current * 2,
      height: width.current * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 300);

    return () => globe.destroy();
  }, [config, onRender]);

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
