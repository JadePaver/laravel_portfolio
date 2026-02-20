import ProjectLayout from "@/Layouts/ProjectLayout";
import { Typography, Box, Stack, Tooltip, Grid } from "@mui/material";
import { motion, Variants } from "framer-motion";
import { SlideInImage } from "@/Components/SlideInImage";
import { TypewriterText } from "@/Components/TypewriterText";
import { useEffect } from "react";

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
                    width: { xs: 22, lg: 30 },
                    height: { xs: 22, lg: 30 },
                    borderRadius: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                }}
            >
                <Box
                    component={motion.img}
                    variants={visibleImgVariants}
                    src={`/icons/${iconFile}`}
                    alt={alt ?? label}
                    sx={{
                        width: { xs: 14, lg: 18 },
                        height: { xs: 14, lg: 18 },
                        willChange: "transform"
                    }}
                />
            </MotionBox>
        </Tooltip>
    );
}

export default function LedgerPage() {
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
                <SlideInImage src="/images/ledger1.png" alt="ledger image1" imgSx={{ height: "30vw", objectFit: "contain" }} />

                <Grid container spacing={{ xs: 0, lg: 2 }} sx={{ my: 3 }}>
                    <Grid
                        size={{ xs: 12, lg: 'auto' }}
                        sx={{
                            order: { xs: 3, lg: 1 },
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="body2" sx={{ fontSize: { xs: "0.75rem", lg: "1rem" } }}>
                            January 16, 2025
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 4, lg: 'auto' }} sx={{ order: { xs: 2, lg: 2 } }}>
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <TechIconTooltip
                                label="Android Studio"
                                iconFile="android_studio.svg"
                                alt="android studio"
                                visibleIconVariants={visibleIconVariants}
                                visibleImgVariants={visibleImgVariants}
                            />
                            <TechIconTooltip
                                label="Dart"
                                iconFile="dart.svg"
                                alt="dart"
                                visibleIconVariants={visibleIconVariants}
                                visibleImgVariants={visibleImgVariants}
                            />
                            <TechIconTooltip
                                label="Supabase"
                                iconFile="supabase.svg"
                                alt="supabase"
                                visibleIconVariants={visibleIconVariants}
                                visibleImgVariants={visibleImgVariants}
                            />
                        </Stack>
                    </Grid>

                    <Grid
                        size={{ xs: 8, lg: 'auto' }}
                        sx={{
                            order: { xs: 1, lg: 3 },
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: "primary.main",
                                fontSize: { xs: "0.80rem", lg: "1rem" },
                                textAlign: "left",
                            }}>
                            UI/UX, Mobile App, Project Management
                        </Typography>
                    </Grid>
                </Grid>
                <TypewriterText
                    highlightFirstWord
                    text={`Ledger App is a personal finance companion I built in Flutter that combines expense tracking, cloud sync, and an AI assistant into one experience. It helps users record daily transactions, categorize credit/debit activity, and understand spending through clean visual summaries while staying fast and offline-friendly using Hive with seamless syncing to Supabase.`}
                    sx={{ pt: 4 }}
                />
                <TypewriterText fontWeight={1000} text={`Context / Problem`} sx={{ pt: 4 }} />
                <TypewriterText fontWeight={1000} text={`I wanted an expense tracker that was:`} sx={{ pt: 2 }} />
                <TypewriterText startBullet text={`Offline-first & Quick, so I could log expenses anytime and sync later.`} sx={{ pt: 2 }} />
                <TypewriterText startBullet text={`Insightful at first glance, with charts that make spending patterns obvious at both category and overall levels`} />
                <TypewriterText startBullet text={`Secure and accessible, with flexible login options (email, Google, phone)`} />
                <TypewriterText startBullet text={`More than a tracker—an app with an agent that understands my own data and can provide personalized, actionable spending advice, also and someone to tell me when I’m overspending.`}
                    sx={{ pb: 14 }}
                />

                <SlideInImage src="/images/ledger2.png" alt="ledger image2" />

                <TypewriterText text={`The expense tracking easy to understand through interactive graphs and dynamic, clusterized expense tables. Transactions are grouped by category, by type such as credit or debit, and by time period so users can move quickly from a monthly overview to the exact entries that drive their spending. The table views support fast filtering, sorting, and totals, while the charts provide clear visual summaries of expenses per category and overall, making trends and problem areas easy to spot.`}
                    sx={{ pt: 3, pb: 8 }}
                />

                <SlideInImage src="/images/ledger2.png" alt="ledger image3"
                    imgSx={{ height: "30vw", objectFit: "contain" }}
                />
                <TypewriterText
                    text={`This project reflects how I approach product-building end-to-end: designing for real personal needs, prioritizing performance with local storage, and ensuring reliability through cloud synchronization. With Supabase authentication + data sync and a Gemini-integrated chat assistant, Ledger App becomes not just a record of expenses, but a tool for building better money habits through data-aware insights and expert-style guidance.`}
                    sx={{ pt: 3, pb: 8 }}
                />
            </MotionStack>
        </ProjectLayout >
    );
}