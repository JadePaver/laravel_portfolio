import React, { useEffect, useRef, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import { motion, useInView, Variants } from "framer-motion";

type LinearProgressWithDotProps = {
  value: number;           // target value (0–100)
  duration?: number;       // fill animation duration in ms (bar value and dot position)
  delay?: number;          // delay before animation starts in ms
  animateOnView?: boolean; // start when revealed in viewport
  once?: boolean;          // animate only once (default true)
};

const DOT_SIZE = 23;
const DOT_RADIUS = DOT_SIZE / 2;

// Simple fade for the DOT only (bar stays always visible)
const dotFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function LinearProgressWithDot({
  value,
  duration = 1200,
  delay = 0,
  animateOnView = true,
  once = true,
}: LinearProgressWithDotProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(hostRef, { amount: 0.3, margin: "0px", once: false });

  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  const target = Math.max(0, Math.min(100, value));

  useEffect(() => {
    const shouldStart = animateOnView ? inView : true;
    if (!shouldStart) {
      if (!once) startedRef.current = false;
      return;
    }
    if (once && startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now() + delay;
    const from = 0;
    const to = target;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const t = Math.max(0, Math.min(1, (now - startTime) / duration));
      const current = from + (to - from) * easeOutCubic(t);
      setProgress(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setProgress(to);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [inView, animateOnView, once, target, duration, delay]);

  // Adjust dot position so it doesn't overflow at 100%
  // Map 0-100 progress to 0-98 for dot positioning
  const dotPosition = progress * 0.98;

  return (
    <Box ref={hostRef} sx={{ position: "relative", width: "100%", overflow: "visible" }}>
      {/* Track wrapper adds horizontal padding so the dot never gets clipped at 0% or 100% */}
      <Box sx={{ position: "relative", width: "100%", px: `0px`, overflow: "visible"}}>
        {/* BAR: always visible (no clip-path), fills slowly via 'progress' */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: { xs: 7.5, lg: 10 },
            borderRadius: { xs: 3, lg: 5 },
            backgroundColor: "#EDECEC",
            "& .MuiLinearProgress-bar": {
              borderRadius: { xs: 3, lg: 5 },
              transition: "transform 160ms linear",
            },
          }}
        />

        {/* DOT: fades in, moves with progress, not clipped */}
        <Box
          component={motion.div}
          variants={dotFadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once, amount: 0.3 }}
          sx={{
            position: "absolute",
            top: "50%",
            left: `${dotPosition}%`,
            transform: "translate(-50%, -50%)",
            width: { xs: 20, lg: 23 },
            height: { xs: 20, lg: 23 },
            borderRadius: "50%",
            backgroundColor: "white",
            border: { xs: "2px solid #f57c00", lg: "3px solid #f57c00" },
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            transition: "left 80ms linear",
            willChange: "left, opacity",
          }}
        />
      </Box>
    </Box>
  );
}