import { PropsWithChildren, useEffect, useRef } from "react";
import { Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const MotionButton = motion(Button);
const MotionIconWrap = motion("span");

export default function ProjectLayout({ children }: PropsWithChildren) {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        buttonRef.current?.focus();
    }, []);

    return (
        <Box sx={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
            <MotionButton
                ref={buttonRef}
                aria-label="back"
                onClick={() => window.history.back()}
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileTap="tap"
                variants={{
                    rest: {
                        scale: 1,
                        y: 0,
                        boxShadow: "2px 4px 12px rgba(0,0,0,0.10)",
                    },
                    hover: {
                        scale: 1.06,
                        y: -2,
                        boxShadow: "0px 10px 22px rgba(0,0,0,0.18)",
                    },
                    tap: {
                        scale: 0.98,
                        y: 0,
                    },
                }}
                transition={{ type: "spring", stiffness: 500, damping: 26 }}
                sx={{
                    zIndex: 1000,
                    position: "fixed",
                    top: { xs: '1.5rem', lg: "3rem" },
                    left: { xs: '1.5rem', lg: "5rem" },
                    minWidth: 0,
                    bgcolor: "primary.main",
                    color: "common.white",
                    p: { xs: "0.8rem 0.8rem", lg: "1.1rem 1rem" },
                    "&:hover": { bgcolor: "primary.dark" },
                    "&:focus-visible": {
                        outline: "3px solid",
                        outlineColor: "primary.light",
                        outlineOffset: "4px",
                    },
                }}
            >
                {/* Child inherits hover/tap state from MotionButton */}
                <MotionIconWrap
                    style={{ display: "inline-flex", alignItems: "center" }}
                    variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1.1 },
                        tap: { scale: 0.95 },
                    }}
                    transition={{ type: "spring", stiffness: 650, damping: 22 }}
                >
                    <ArrowBackIosNewRoundedIcon
                        sx={{
                            mr: 0.5,
                            fontSize: { xs: 22, lg: 26 },
                            "& path": { stroke: "currentColor", strokeWidth: { xs: 1, lg: 1.6 } },
                        }}
                    />
                </MotionIconWrap>
            </MotionButton>

            <Box
                sx={{
                    width: "100%",
                    mx: { xs: "10%", lg: "20%" },
                    py: { xs: "6rem", lg: "3rem" },
                }}
            >
                {children}
            </Box>
        </Box>
    );
}