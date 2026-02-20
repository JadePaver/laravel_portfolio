import { Typography, Box } from "@mui/material";
import { motion, Variants } from "framer-motion";

export function SlideInImage({
    src,
    alt,
    containerSx,
    imgSx,
}: {
    src: string;
    alt: string;
    containerSx?: any;
    imgSx?: any;
}) {
    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, x: -60, scale: 0.98, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }} // start when more visible (increase if needed)
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            sx={{
                mb: 2,
                bgcolor: "grey.100",
                borderRadius: 2,
                p: 2,
                overflow: "hidden", // prevents edges/blur from looking weird
                willChange: "transform, opacity, filter",
                ...containerSx,
            }}
        >
            <Box
                component="img"
                src={src}
                alt={alt}
                sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    mx: "auto",
                    ...imgSx,
                }}
            />
        </Box>
    );
}