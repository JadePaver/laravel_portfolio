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

export default function GSOPMDPage() {
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
                <SlideInImage src="/images/gso_pmd1.png" alt="gso pmd image1" />

                <Stack direction="row" spacing={6} alignItems="center" sx={{ my: 3 }}>
                    <Typography variant="body2">January 16, 2025</Typography>

                    <Stack direction="row" spacing={2}>
                        <TechIconTooltip
                            label="MUI"
                            iconFile="mui.svg"
                            alt="android studio"
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
                            label="Node JS"
                            iconFile="nodejs.svg"
                            alt="nodejs"
                            visibleIconVariants={visibleIconVariants}
                            visibleImgVariants={visibleImgVariants}
                        />
                        <TechIconTooltip
                            label="TypeScript"
                            iconFile="typescript.svg"
                            alt="typescript"
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
                    text={`Property Management System for a government program that tracks awardees (beneficiaries) who are granted subsidized lots/blocks. The system centralizes awardee profiles, property allocation records, and installment/payment monitoring to improve accuracy, reduce manual paperwork, and speed up reporting and collections.`}
                    sx={{ pt: 4 }}
                />
                <TypewriterText fontWeight={1000} text={`Context / Problem`} sx={{ pt: 4 }} />
                <TypewriterText startBullet text={`Records and payments were managed through spreadsheets and paper forms, which isn’t scalable long term.`} sx={{ pt: 2 }} />
                <TypewriterText startBullet text={`Tracking ownership and monitoring each awardee’s balance/status was tedious and error-prone.`} />
                <TypewriterText startBullet text={`Payments and reports were difficult to consolidate and generate, especially for flexible/custom date ranges.`}
                    sx={{ pb: 14 }}
                />

                <SlideInImage
                    src="/images/gso_pmd2.png"
                    alt="gso pmd image2"
                    imgSx={{ height: "30vw", objectFit: "contain" }}
                />
                <TypewriterText
                    text={`The system is built around detailed Awardee tables that serve as a single source of truth for each beneficiary’s complete record personal and application details, assigned lot/block information, and a full ledger history starting from the very first payment. To keep data exploration fast and responsive, I used React to power a dynamic UI that supports quick filtering, searching, and real-time updates as records change. On the backend, I implemented an Express API with Prisma ORM to enforce a clean, well-structured schema and enable efficient, reliable queries for ledger computation, reporting, and auditing.`}
                    sx={{ pt: 3, pb: 8 }}
                />
                <SlideInImage
                    src="/images/gso_pmd3.png"
                    alt="gso pmd image3"
                    imgSx={{ height: "30vw", objectFit: "contain" }}
                />
                <TypewriterText
                    text={`A key part of the system is its ledgering module, which records every transaction and status change to provide a clear, auditable financial timeline per awardee. This enables the Accounting, Treasurer, and Property Department to accurately monitor payments, validate contract compliance, and perform audits with confidence. Each awardee account is tracked by contract status—whether it is still amortizing, title released, or cancelled—so staff can quickly determine current standing, outstanding balances, and the complete payment history that supports every decision`}
                    sx={{ pt: 3, pb: 8 }}
                />
            </MotionStack>
        </ProjectLayout>
    );
}