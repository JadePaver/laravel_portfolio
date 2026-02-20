import { Typography, SxProps, Theme, useTheme } from "@mui/material";
import { motion, Variants } from "framer-motion";

export function TypewriterText({
    text,
    delay = 0,
    fontSize,
    fontWeight,
    highlightFirstWord = false,
    startBullet = false,
    sx,
}: {
    text: string;
    delay?: number;
    fontSize?: number | string;
    fontWeight?: number;
    highlightFirstWord?: boolean;
    startBullet?: boolean;
    sx?: SxProps<Theme>;
}) {
    const theme = useTheme();

    const container: Variants = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: delay,
                staggerChildren: 0.003,
            },
        },
    };

    const charVar: Variants = {
        hidden: { opacity: 0, y: 2 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.48, ease: "easeOut" },
        },
    };

    const bulletPrefix = startBullet ? "• " : "";
    const fullText = bulletPrefix + text;

    const match = highlightFirstWord ? fullText.match(/^(\S+)([\s\S]*)$/) : null;
    const firstWord = match?.[1] ?? "";
    const rest = match?.[2] ?? fullText;

    return (
        <Typography
            variant="body1"
            component={motion.p}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            style={{ margin: 0 }}
            fontSize={fontSize}
            fontWeight={fontWeight}
            sx={sx}
        >
            {highlightFirstWord ? (
                <>
                    <span
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                        }}
                    >
                        {Array.from(firstWord).map((ch, i) => (
                            <motion.span
                                key={`fw-${ch}-${i}`}
                                variants={charVar}
                                style={{ display: "inline-block" }}
                            >
                                {ch === " " ? "\u00A0" : ch}
                            </motion.span>
                        ))}
                    </span>

                    {Array.from(rest).map((ch, i) => (
                        <motion.span
                            key={`rest-${ch}-${i}`}
                            variants={charVar}
                            style={{
                                display: "inline-block",
                                whiteSpace: ch === " " ? "pre" : "normal",
                            }}
                        >
                            {ch === " " ? "\u00A0" : ch}
                        </motion.span>
                    ))}
                </>
            ) : (
                Array.from(fullText).map((ch, i) => (
                    <motion.span
                        key={`${ch}-${i}`}
                        variants={charVar}
                        style={{
                            display: "inline-block",
                            whiteSpace: ch === " " ? "pre" : "normal",
                        }}
                    >
                        {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                ))
            )}
        </Typography>
    );
}