"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./text-hover-effect.module.scss";

export const TextHoverEffect = ({
  text,
  duration = 0,
}: {
  text: string;
  duration?: number;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((e.clientX - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((e.clientY - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  };

  return (
    <div className={styles.textHoverWrapper}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 300 100"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        style={{ userSelect: "none" }}
      >
        <defs>
          <linearGradient
            id="textGradient"
            gradientUnits="userSpaceOnUse"
            cx="50%"
            cy="50%"
            r="25%"
          >
            {hovered && (
              <>
                <stop offset="0%" stopColor="#5eead4" />  {/* teal-300 */}
                <stop offset="25%" stopColor="#38bdf8" /> {/* sky-400 */}
                <stop offset="50%" stopColor="#3b82f6" /> {/* blue-500 */}
                <stop offset="75%" stopColor="#6366f1" /> {/* indigo-500 */}
                <stop offset="100%" stopColor="#a78bfa" />{/* violet-400 */}
              </>
            )}
          </linearGradient>

          <motion.radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r="20%"
            animate={maskPosition}
            transition={{ duration: duration ?? 0, ease: "easeOut" }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>
          <mask id="textMask">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#revealMask)"
            />
          </mask>
        </defs>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          style={{
            fontFamily: "helvetica, arial, sans-serif",
            fontWeight: "bold",
            fontSize: "4.5rem",
            fill: "transparent",
            stroke: "rgba(229, 231, 235, 0.08)",
            opacity: hovered ? 0.5 : 0,
            userSelect: "none",
          }}
        >
          {text}
        </text>
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          style={{
            fontFamily: "helvetica, arial, sans-serif",
            fontWeight: "bold",
            fontSize: "4.5rem",
            fill: "transparent",
            stroke: "rgba(229, 231, 235, 0.08)",
            userSelect: "none",
          }}
          initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
          animate={{
            strokeDashoffset: 0,
            strokeDasharray: 1000,
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.text>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="url(#textGradient)"
          strokeWidth="0.3"
          mask="url(#textMask)"
          style={{
            fontFamily: "helvetica, arial, sans-serif",
            fontWeight: "bold",
            fontSize: "4.5rem",
            fill: "transparent",
            userSelect: "none",
          }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
};
