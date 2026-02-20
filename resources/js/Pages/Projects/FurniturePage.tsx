import ProjectLayout from "@/Layouts/ProjectLayout";
import { Typography, Box, Stack, Tooltip } from "@mui/material";
import { motion, Variants } from "framer-motion";
import { SlideInImage } from "@/Components/SlideInImage";
import { TypewriterText } from "@/Components/TypewriterText";

const MotionBox = motion.create(Box);
const MotionStack = motion.create(Stack);

type TechIconProps = {
    label: string;        // tooltip text
    iconFile: string;     // e.g. "android_studio.svg" or "dart.svg"
    alt?: string;
    visibleIconVariants: Variants;
    visibleImgVariants: Variants;
};

function TechIconTooltip({
    label,
    iconFile,
    alt,
    visibleIconVariants,
    visibleImgVariants,
}: TechIconProps) {
    return (
        <Tooltip
            title={
                <Typography fontFamily="Poppins" fontSize={13}>
                    {label}
                </Typography>
            }
            arrow
            placement="top"
            enterDelay={150}
            leaveDelay={50}
        >
            <MotionBox
                variants={visibleIconVariants}
                initial="rest"
                animate="rest"
                whileHover="hover"
                sx={{
                    bgcolor: "white",
                    width: 30,
                    height: 30,
                    borderRadius: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                }}
            >
                <motion.img
                    variants={visibleImgVariants}
                    src={`/icons/${iconFile}`}
                    width={18}
                    height={18}
                    alt={alt ?? label}
                    style={{ willChange: "transform" }}
                />
            </MotionBox>
        </Tooltip>
    );
}

export default function FurniturePage() {
    const visibleIconVariants: Variants = {
        rest: { scale: 1, y: 0, boxShadow: "1px 2px 6px rgba(0,0,0,0.25)" },
        hover: {
            scale: 1.08,
            y: -2,
            boxShadow: "0px 6px 14px rgba(0,0,0,0.18)",
            transition: { type: "spring", stiffness: 400, damping: 22 },
        },
    };

    const visibleImgVariants: Variants = {
        rest: { scale: 1, rotate: 0, y: 0 },
        hover: {
            scale: 1.14,
            rotate: 3,
            y: -1,
            transition: { type: "spring", stiffness: 500, damping: 22 },
        },
    };

    return (
        <ProjectLayout>
            <MotionStack spacing={2}>
                <SlideInImage src="/images/furniture1.png" alt="furniture image1" imgSx={{ height: "30vw", objectFit: "contain" }} />

                <Stack direction="row" spacing={6} alignItems="center" sx={{ my: 3 }}>
                    <Typography variant="body2">January 16, 2025</Typography>

                    <Stack direction="row" spacing={2}>
                        <TechIconTooltip
                            label="MUI"
                            iconFile="mui.svg"
                            alt="mui studio"
                            visibleIconVariants={visibleIconVariants}
                            visibleImgVariants={visibleImgVariants}
                        />
                        <TechIconTooltip
                            label="React"
                            iconFile="react.svg"
                            alt="react"
                            visibleIconVariants={visibleIconVariants}
                            visibleImgVariants={visibleImgVariants}
                        />
                        <TechIconTooltip
                            label="Nodejs"
                            iconFile="nodejs.svg"
                            alt="nodejs"
                            visibleIconVariants={visibleIconVariants}
                            visibleImgVariants={visibleImgVariants}
                        />
                        <TechIconTooltip
                            label="TypeScript"
                            iconFile="typescript.svg"
                            alt="Typescript"
                            visibleIconVariants={visibleIconVariants}
                            visibleImgVariants={visibleImgVariants}
                        />
                    </Stack>
                    <Typography variant="body2" sx={{ color: "primary.main" }}>
                        UI/UX, Web Development, Project Management
                    </Typography>
                </Stack>
                <TypewriterText
                    highlightFirstWord
                    text={`ButchFurniture is a point-of-sale and inventory management system built for a furniture business. It combines a customer-facing shopping experience for browsing and purchasing items with a complete admin workflow for tracking furniture stock, raw materials, and operational deliveries.`}
                    sx={{ pt: 4 }}
                />
                <TypewriterText fontWeight={1000} text={`Context / Problem`} sx={{ pt: 4 }} />
                <TypewriterText startBullet text={`Records for furniture stock and raw materials were difficult to maintain consistently when updated manually.`} sx={{ pt: 2 }} />
                <TypewriterText startBullet text={`Material consumption was hard to track because each furniture item requires specific quantities of multiple materials.`} />
                <TypewriterText startBullet text={`Inventory mismatches led to stock uncertainty, delayed production, and restocking happening too late.`} />
                <TypewriterText startBullet text={`Expected material deliveries were not tracked in a structured way, making it harder to plan replenishment and avoid shortages.`}
                    sx={{ pb: 14 }}
                />

                <SlideInImage src="/images/furniture2.png" alt="furniture image2" />

                <TypewriterText text={`The app includes a customer-facing shopping view where customers can browse furniture, check what is available, and place purchases. This creates a smoother buying experience while ensuring the displayed inventory reflects current stock.`}
                    sx={{ pt: 3, pb: 8 }}
                />

                <SlideInImage src="/images/furniture3.png" alt="furniture image3" />
                <TypewriterText
                    text={`The system manages both finished furniture inventory and raw material inventory in one workflow. Each furniture item is linked to its required materials and equivalent costs, so whenever furniture is added or produced, the corresponding material quantities are automatically deducted to keep stock levels accurate and updated.`}
                    sx={{ pt: 3, pb: 8 }}
                />
                <SlideInImage src="/images/furniture4.png" alt="furniture image4" />
                <TypewriterText
                    text={`A dedicated delivery module tracks expected material deliveries and their details, helping staff monitor incoming supplies and schedule replenishment. This makes restocking more predictable and reduces the risk of running out of critical materials during production.`}
                    sx={{ pt: 3, pb: 8 }}
                />
            </MotionStack>
        </ProjectLayout>
    );
}