import { Typography, SxProps, Theme, useTheme } from "@mui/material";
import { motion, Variants } from "framer-motion";

const MotionTypography = motion.create(Typography);

type ExtrudeAllTextProps = {
  text: string;
  variant?: React.ComponentProps<typeof Typography>["variant"];
  fontWeight?: React.ComponentProps<typeof Typography>["fontWeight"];
  fontSize?: number | string;
  color?: string;
  sx?: SxProps<Theme>;

  lift?: number; // px
  tiltX?: number; // deg
  tiltY?: number; // deg
  baseColor?: string; // optional override
  enterDuration?: number; // seconds
  exitDuration?: number; // seconds
};

export function ExtrudeAllText({
  text,
  variant = "h5",
  fontWeight = 700,
  fontSize,
  color = "inherit",
  sx,

  lift = 3.5,
  tiltX = 10,
  tiltY = -10,

  baseColor,
  enterDuration = 0.18,
  exitDuration = 0.6,
}: ExtrudeAllTextProps) {
  const theme = useTheme();

  const resolvedBaseColor =
    baseColor ??
    (color === "primary.main" ? theme.palette.primary.dark : "#C84E00");

  const container: Variants = { rest: {}, hover: {} };

  // Top/face characters lift on hover
  const faceChar: Variants = {
    rest: { y: 0, rotateX: "0deg", rotateY: "0deg" },
    hover: {
      y: -lift,
      rotateX: `${tiltX}deg`,
      rotateY: `${tiltY}deg`,
      transition: { duration: enterDuration, ease: "easeOut" },
    },
  };

  // Shadow/base is directly underneath (same position) and invisible by default
  const baseChar: Variants = {
    rest: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.08, ease: "linear" } },
  };

  return (
    <MotionTypography
      variant={variant}
      fontWeight={fontWeight}
      fontSize={fontSize}
      sx={{ color, display: "inline-block", ...sx }}
      variants={container}
      initial="rest"
      animate="rest"
      whileHover="hover"
      transition={{
        // slow exit, no spring
        duration: exitDuration,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {Array.from(text).map((ch, i) => {
        const c = ch === " " ? "\u00A0" : ch;

        return (
          <span
            key={`${ch}-${i}`}
            style={{
              position: "relative",
              display: "inline-block",
              whiteSpace: ch === " " ? "pre" : "normal",
            }}
          >
            {/* base/shadow: same x/y (completely underneath), hidden until hover */}
            <motion.span
              aria-hidden
              variants={baseChar}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                color: resolvedBaseColor,
                zIndex: 0,
                pointerEvents: "none",
              }}
            >
              {c}
            </motion.span>

            {/* face/top: elevates on hover */}
            <motion.span
              variants={faceChar}
              style={{
                position: "relative",
                zIndex: 1,
                display: "inline-block",
                willChange: "transform",
                transformOrigin: "left bottom",
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