import ProjectLayout from "@/Layouts/ProjectLayout";
import { Typography, Box, Stack, Tooltip, Grid } from "@mui/material";
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

export default function AESPage() {
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
            <SlideInImage src="/images/aes1.png" alt="aes image1" />

            <Grid container spacing={{ xs: 2, lg: 2 }} sx={{ my: 3 }}>
                {/* Date - First on lg, last on xs */}
                <Grid
                    size={{ xs: 12, lg: 'auto' }}
                    sx={{
                        order: { xs: 3, lg: 1 },
                        display: "flex",
                        alignItems: "center",
                    }}>
                    <Typography variant="body2" sx={{ fontSize: { xs: "0.75rem", lg: "1rem" } }}>
                        January 16, 2025
                    </Typography>
                </Grid>

                {/* Icons - Middle on both */}
                <Grid size={{ xs: 4, lg: 'auto' }} sx={{ order: { xs: 2, lg: 2 } }}>
                    <Stack direction="row" spacing={2} justifyContent="center">
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
                </Grid>

                {/* Professions - Last on lg, first on xs */}
                <Grid
                    size={{ xs: 8, lg: 'auto' }}
                    sx={{
                        order: { xs: 1, lg: 3 },
                        display: "flex",
                        alignItems: "center",
                    }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "primary.main",
                            fontSize: { xs: "0.80rem", lg: "1rem" },
                            textAlign: "left",
                        }}>
                        UI/UX, Web Development, Project Management
                    </Typography>
                </Grid>
            </Grid>
            <TypewriterText
                text={`Advance Educational Smart System is an online learning platform designed for university use, supporting multiple roles such as students, teachers, administrators, and guardians. It centralizes academic content, classroom workflows, and enrollment processes into one system to make learning management more organized, accessible, and efficient.`}
                sx={{ pt: 4 }}
            />
            <TypewriterText fontWeight={1000} text={`Context / Problem`} sx={{ pt: 4 }} />
            <TypewriterText startBullet text={`Learning materials, modules, and assessments were not stored in a single structured platform, making access and tracking inconsistent.`} sx={{ pt: 2 }} />
            <TypewriterText startBullet text={`Classroom and subject management required too much manual coordination and repeated data entry.`} />
            <TypewriterText startBullet text={`Enrollment workflows were time-consuming and prone to errors when handled through fragmented tools or paperwork.`} />
            <TypewriterText startBullet text={`Stakeholders like guardians had limited visibility into student progress and academic activities.`} sx={{ pb: 8 }} />
            <SlideInImage src="/images/aes2.png" alt="aes image2" />
            <TypewriterText text={`Users can sign in based on their role as student, teacher, admin, or guardian, ensuring each user sees only the tools and information relevant to them. This improves security, simplifies navigation, and supports clear responsibilities across the university workflow.`}
                sx={{ pt: 3, pb: 8 }}
            />
            <SlideInImage src="/images/aes3.png" alt="aes image3" />
            <TypewriterText
                text={`The platform supports online creation and storage of lessons, modules, and assessments for teachers, while giving students easy access to learning content anytime. This enables consistent learning delivery, centralized content management, and better organization of course requirements.`}
                sx={{ pt: 3, pb: 8 }}
            />
            <SlideInImage
                src="/images/aes4.png"
                alt="aes image4"
                imgSx={{ height: "50vw", objectFit: "contain" }}
            />
            <SlideInImage src="/images/aes5.png" alt="aes image5" />
            <TypewriterText
                text={`The system includes a highly customizable assessment maker that allows teachers to build exams, quizzes, and activities based on their subject requirements and grading rules. Teachers can compose assessments using multiple question formats, configure points and scoring per item, set time limits and availability windows, and control retake policies and submission rules. It also supports organizing assessments by module or lesson, making it easier to align evaluations with course pacing, while keeping student submissions and results structured for faster checking and more reliable progress tracking.`}
                sx={{ pt: 3, pb: 8 }}
            />
            <SlideInImage src="/images/aes6.png" alt="aes image6" />
            <TypewriterText
                text={`It includes online classroom and subject management to streamline scheduling, assignments, and course structure. The enrollment system is designed to be seamless and reliable, helping students register efficiently while giving administrators better control over subjects, sections, and academic records.`}
                sx={{ pt: 3, pb: 8 }}
            />
        </ProjectLayout >
    );
}