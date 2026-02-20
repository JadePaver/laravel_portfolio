import { Typography, SxProps, Theme } from "@mui/material";
import { motion } from "framer-motion";

const MotionTypography = motion.create(Typography);

type ExtrudedTextProps = {
  text: string;
  variant?: React.ComponentProps<typeof Typography>["variant"];
  fontSize?: number | string;
  fontWeight?: React.ComponentProps<typeof Typography>["fontWeight"];
  color?: string;         // top/face color
  baseColor?: string;     // underneath/extrude color
  sx?: SxProps<Theme>;
};

export function ExtrudedText({
  text,
  variant = "h1",
  fontSize = 80,
  fontWeight = "bold",
  color = "black",
  baseColor = "rgba(0, 0, 0, 0.7)",
  sx,
}: ExtrudedTextProps) {
  return (
    <MotionTypography
      variant={variant}
      fontSize={fontSize}
      fontWeight={fontWeight}
      sx={{ color, m: 0, p: 0, userSelect: "none", display: "inline-block", ...sx }}
    >
      {Array.from(text).map((ch, i) => {
        const c = ch === " " ? "\u00A0" : ch;

        return (
          <span
            key={`${ch}-${i}`}
            style={{
              position: "relative",
              display: "inline-block",
              lineHeight: 1,
            }}
          >
            {/* base character: completely underneath (same position), never moves */}
            <span
              aria-hidden
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                color: baseColor,
                pointerEvents: "none",
                zIndex: 0,
                transform: "none",
              }}
            >
              {c}
            </span>

            {/* face character: only this elevates on hover */}
            <motion.span
              initial={false}
              animate={{
                y: 0,
                rotateX: "0deg",
                rotateY: "0deg",
              }}
              transition={{
                // EXIT (hover -> rest): very slow, no spring
                duration: 2.4,
                ease: [0.16, 1, 0.3, 1], // easeOut-ish
              }}
              whileHover={{
                y: -8,
                rotateX: "10deg",
                rotateY: "-10deg",
                transition: {
                  // ENTER (rest -> hover): faster, no spring
                  duration: 0.15,
                  ease: "easeOut",
                },
              }}
              style={{
                position: "relative",
                zIndex: 1,
                display: "inline-block",
                color,
                willChange: "transform",
                transformOrigin: "left bottom",
                cursor: "default",
              }}
            >
              {c}
            </motion.span>
          </span>
        );
      })}
    </MotionTypography>
  );
}