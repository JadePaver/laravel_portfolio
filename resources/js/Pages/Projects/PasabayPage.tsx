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

export default function PasabayPage() {
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
                <SlideInImage
                    src="/images/pasabay1.png"
                    alt="pasabay image1"
                />

                <Grid container spacing={{ xs: 0, lg: 2 }} sx={{ my: 3 }}>
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
                            UI/UX, Mobile App, Project Management
                        </Typography>
                    </Grid>
                </Grid>
                <Box sx={{ pt: 2 }}>
                    <TypewriterText
                        highlightFirstWord
                        text={`PASABAY is a community-powered food delivery app that lets customers order home-cooked Filipino meals while enabling home cooks to apply, publish menus, and fulfill orders—bringing “lutong bahay” into a modern delivery experience.`}
                    />
                </Box>
                <Stack spacing={2} sx={{ pt: 4, pb: 8 }}>
                    <TypewriterText
                        text={`Problem we were solving:`}
                        fontWeight={700}
                    />
                    <Stack spacing={2} sx={{ pl: {xs:'1rem',lg:'2rem'} }}>
                        <TypewriterText
                            startBullet
                            text={`Food delivery apps focus on restaurants; home cooks have limited ways to sell legally and safely.`}
                        />
                        <TypewriterText
                            startBullet
                            text={`Customers want affordable, familiar Filipino dishes (lutong bahay) that change daily.`}
                        />
                        <TypewriterText
                            startBullet
                            text={`Trust is a challenge: buyers need confidence in identity, hygiene, and consistency.`}
                        />
                    </Stack>
                </Stack>
                <SlideInImage
                    src="/images/pasabay2.png"
                    alt="pasabay image2"
                    imgSx={{ height: "30vw", objectFit: "contain" }}
                />
                <TypewriterText
                    text={`The app features an intuitive, easy-to-use interface with a Filipino theme that highlights local delicacies. It’s designed for discovering nearby home-cooked meals, ordering quickly with clear pricing and delivery fees, and reordering favorites—or trying new daily menus. This concept was created during the pandemic, when most commercial restaurants and fast-food chains were not allowed to serve dine-in customers, making safe, convenient food access more important than ever.
                    `}
                    sx={{ pt: 4, pb: 12 }}
                />
                <SlideInImage
                    src="/images/pasabay3.png"
                    alt="pasabay image3"
                    imgSx={{ height: "30vw", objectFit: "contain" }}
                />
                <TypewriterText
                    text={`It also features an efficient ordering and payment flow to make the entire experience quick and hassle-free for you. `}
                    sx={{ pt: 4, pb: 16 }}
                />
            </MotionStack>
        </ProjectLayout>
    );
}


