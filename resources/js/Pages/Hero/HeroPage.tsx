import DefaultLayout from '@/Layouts/DefaultLayout';
import { Container, Typography, Box, Stack, Button } from '@mui/material';
import { motion, Variants } from "framer-motion";
import { useState, useMemo } from "react";
import { ExtrudedText } from './components/ExtrudedText';

import LinearProgressWithDot from '@/Components/LinearProgressWithDot';
import ServiceCard from '@/Components/ServiceCard';
import ProjectCategoryToggleButton from '@/Components/ProjectCategoryToggleButton';
import ProjectCarousel, { ProjectCarouselItem } from '@/Components/ProjectsCarousel';
import { ExtrudeAllText } from './components/ExtrudeAllText';

const MotionStack = motion(Stack);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);
const MotionBox = motion(Box);
const MotionImg = motion.img;

export default function HeroPage() {
  // 1) Declare selected category state in the parent
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Optional: categories to show (you can customize or reuse defaults in ServiceToggle)
  const categories = useMemo(
    () => ["All", "UI/UX", "Web Development", "Mobile App", "Project Management"],
    []
  );

  const [items] = useState<ProjectCarouselItem[]>([
    { title: "Ledger App", color: "#F97B0C", image: "/projects/ledger.png", category: ['UI/UX', 'Mobile App', 'Project Management'], link: "/ledger" },
    { title: "Pasabay", color: "#6C5CE7", image: "/projects/pasabay.png", category: ['Mobile App', 'UI/UX', 'Project Management'], link: "/pasabay" },
    { title: "Advanvced Education System (AES)", color: "#00B894", image: "/projects/aes.png", category: ['UI/UX', 'Web Development', 'Project Management'], link: "/aes" },
    { title: "Property Department Management System", color: "#6DD5FA", image: "/projects/gso_pmd.png", category: ['Web Development', 'Project Management', 'UI/UX'], link: "/gso_pmd" },
    { title: "Butch Furniture (POS)", color: "#1DD1A1", image: "/projects/furniture.png", category: ['Web Development', 'UI/UX', 'Project Management'], link: "/furniture" },
  ]);

  // 2) Handlers
  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
  };

  const fadeVariants = {
    rest: {
      "--fade": "0%",
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    },
    hover: {
      "--fade": "120%",
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    },
  };

  // Reveal-on-scroll variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const overlayVariants = {
    initial: { opacity: 0.6 },
    hover: { opacity: 0.05, transition: { duration: 0.25 } },
  };

  const svgVariants: Variants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.15,
      y: -2,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 18,
      },
    },
    press: {
      scale: 0.98,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 600,
        damping: 20,
      },
    },
  };

  const iconContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.4, staggerChildren: 0.2 } },
  };

  const iconItem = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Make all reveal-on-show animations run once
  const revealViewport = { once: true, amount: 0.3 } as const;
  const revealViewportTight = { once: true, amount: 0.35 } as const;

  return (
    <DefaultLayout>
      {/* Start of first Section */}
      <Container
        id="section-hero"
        sx={{
          scrollMarginTop: "120px", // prevents fixed header overlap
          width: { xs: "95vw", lg: "80vw" },
          padding: { xs: "0rem", lg: "1rem" },
          height: { xs: "auto", lg: "90vh" },
          paddingTop: { xs: "1rem", lg: "5rem" },
          display: "flex",
          flexDirection: "column",
          // bgcolor: 'red',
        }}
      >
        <Stack
          direction='row'
          spacing='auto'
          sx={{
            width: "100%",
          }}>
          {/* Left column - reveal once */}
          <MotionStack
            direction="column"
            spacing={0}
            sx={{
              width: "45.5%",
              justifyContent: "center",
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            <MotionTypography
              sx={{
                color: "black",
                fontSize: { xs: "1rem", lg: '1rem' },
                fontWeight: 'bold'
              }}
              variants={itemVariants}
            >
              Hi I am
            </MotionTypography>
            <ExtrudeAllText
              text="Jade Paver"
              sx={{
                fontSize: { xs: "1.5rem", lg: '3rem' },
                color: "primary.main",
                mt: { xs: 0, lg: 1 }
              }} />
            <ExtrudedText
              text="Software"
              sx={{
                pt: { xs: 2, lg: 0 },
                alignSelf: "flex-start",
                fontSize: { xs: "1.5rem", lg: '3.75rem' }
              }} />
            <ExtrudedText
              text="Developer"
              fontSize={80}
              sx={{
                alignSelf: "flex-end",
                lineHeight: 0.5,
                fontSize: { xs: "1.5rem", lg: '3.75rem' }
              }} />
            <MotionTypography
              variant="body2"
              sx={{
                color: "black",
                mt: { xs: "0.65rem", lg: "3rem" },
                lineHeight: { xs: 1.5, lg: 1.75 },
                textAlign: "justify",
                fontSize: { xs: "0.75rem", lg: "1rem" }
              }}
              variants={itemVariants}
            >
              I build modern, efficient, and user-focused digital solutions. As I continue expanding my expertise in software development, I transform ideas into scalable, production-ready products. I specialize in creating reliable applications with clean architecture and seamless user experiences, turning complex challenges into simple, maintainable code
            </MotionTypography>
            <MotionButton
              disableElevation
              variant="contained"
              color="primary"
              variants={itemVariants}
              sx={{
                width: 'auto',
                alignSelf: 'flex-start',
                color: 'white',
                mt: '1rem',
                p: { xs: "0.4rem 1rem", md: "0.5rem 2rem" },
                fontWeight: 400,
                fontSize: { xs: "0.7rem", md: "1rem" },
              }}
              onClick={() => { window.location.href = "mailto:paver.jade09@gmail.com"; }}
            >
              Contact Me
            </MotionButton>
          </MotionStack>

          {/* Right column - image + social icons - reveal once */}
          <MotionStack
            direction='column'
            spacing={2}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            sx={{
              width: "54.5%",
              justifyContent: { xs: 'flex-end', md: 'flex-start' }, // bottom on xs, top on md+
              pb: { xs: 6, md: 0 },
            }}
          >
            <MotionBox
              variants={itemVariants}
              initial="rest"
              whileHover="hover"
              sx={{
                width: { xs: 240, md: 380, lg: 540 },
                height: { xs: 300, md: 440, lg: 620 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* HIGH CONTRAST BACKGROUND */}
              <Box
                component="img"
                src="/images/me_no_shade1.png"
                alt="Paver background"
                sx={{
                  width: { xs: 220, md: 360, lg: 470 },
                  position: "absolute",
                  filter: "brightness(0.3) contrast(2) saturate(0)",
                  zIndex: 1,

                }}
              />

              {/* MAIN IMAGE (RESPONSIVE + ANIMATED) */}
              <Box
                component={motion.img}
                src="/images/me_no_shade1.png"
                alt="Paver"
                variants={{
                  rest: {
                    scale: 1,
                    y: 0,
                    filter: "brightness(1) contrast(1)",
                  },
                  hover: {
                    scale: 1.02,
                    y: -3,
                    filter: "brightness(1.05) contrast(1.1)",
                    transition: {
                      duration: 0.35,
                      ease: "easeOut",
                    },
                  },
                }}
                sx={{
                  width: { xs: 220, md: 360, lg: 470 },
                  position: "relative",
                  zIndex: 2,
                  transformOrigin: "center",
                }}
              />

              {/* MAIN FADE */}
              <MotionBox
                variants={fadeVariants}
                transition={{ duration: 0.25, ease: "easeOut" }}
                sx={{
                  backgroundColor: "primary.main",
                  position: "absolute",
                  left: "53%",
                  top: { xs: "21%", lg: "19%" },
                  width: "47%",
                  height: { xs: "10%", md: "9%" },
                  opacity: 0.6,
                  transform: "translate(-50%, -50%)",
                  zIndex: 3,
                  WebkitMaskImage: `
        linear-gradient(to right,
          black 0%,
          black calc(50% - var(--fade) / 2),
          transparent calc(50% - var(--fade) / 2),
          transparent calc(50% + var(--fade) / 2),
          black calc(50% + var(--fade) / 2),
          black 100%
        )
      `,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "100% 100%",
                }}
              />

              {/* SOFT EDGE FADE */}
              <MotionBox
                variants={fadeVariants}
                transition={{ duration: 0.35, ease: "easeOut" }}
                sx={{
                  backgroundColor: "primary.main",
                  position: "absolute",
                  left: "53%",
                  top: { xs: "21%", lg: "19%" },
                  width: "47%",
                  height: { xs: "10%", md: "9%" },
                  opacity: 0.35,
                  transform: "translate(-50%, -50%)",
                  zIndex: 3,
                  WebkitMaskImage: `
        linear-gradient(to right,
          black 0%,
          black calc(50% - var(--fade) / 2 - 3px),
          transparent calc(50% - var(--fade) / 2),
          transparent calc(50% + var(--fade) / 2),
          black calc(50% + var(--fade) / 2 + 3px),
          black 100%
        )
      `,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "100% 100%",
                }}
              />

              {/* EXTRA SOFT FADE */}
              <MotionBox
                variants={fadeVariants}
                transition={{ duration: 0.45, ease: "easeOut" }}
                sx={{
                  backgroundColor: "primary.main",
                  position: "absolute",
                  left: "53%",
                  top: { xs: "21%", lg: "19%" },
                  width: "47%",
                  height: { xs: "10%", lg: "9%" },
                  opacity: 0.2,
                  transform: "translate(-50%, -50%)",
                  zIndex: 3,
                  WebkitMaskImage: `
        linear-gradient(to right,
          black 0%,
          black calc(50% - var(--fade) / 2 - 6px),
          transparent calc(50% - var(--fade) / 2 - 2px),
          transparent calc(50% + var(--fade) / 2 + 2px),
          black calc(50% + var(--fade) / 2 + 6px),
          black 100%
        )
      `,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "100% 100%",
                }}
              />
            </MotionBox>
            <MotionStack
              direction="row"
              spacing={{ xs: 1.5, md: 3 }}
              sx={{ justifyContent: "center", mt: 2 }}
              variants={iconContainer}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
            >
              <Box
                component={motion.img}
                variants={svgVariants}
                src="/logos/facebook.svg"
                initial="initial"
                whileHover="hover"
                whileTap="press"
                onClick={() =>
                  window.open("https://www.facebook.com/jade.paver.5", "_blank", "noopener,noreferrer")
                }
                sx={{
                  display: "block",
                  cursor: "pointer",
                  width: { xs: 24, md: 32 },
                  height: { xs: 24, md: 32 },
                }}
              />
              <Box
                component={motion.img}
                variants={svgVariants}
                src="/logos/twitter.svg"
                initial="initial"
                whileHover="hover"
                whileTap="press"
                onClick={() =>
                  window.open("https://www.facebook.com/jade.paver.5", "_blank", "noopener,noreferrer")
                }
                sx={{
                  display: "block",
                  cursor: "pointer",
                  width: { xs: 24, md: 32 },
                  height: { xs: 24, md: 32 },
                }}
              />
              <Box
                component={motion.img}
                variants={svgVariants}
                src="/logos/instagram.svg"
                initial="initial"
                whileHover="hover"
                whileTap="press"
                onClick={() =>
                  window.open("https://www.facebook.com/jade.paver.5", "_blank", "noopener,noreferrer")
                }
                sx={{
                  display: "block",
                  cursor: "pointer",
                  width: { xs: 24, md: 32 },
                  height: { xs: 24, md: 32 },
                }}
              />
              <Box
                component={motion.img}
                variants={svgVariants}
                src="/logos/linkedin.svg"
                initial="initial"
                whileHover="hover"
                whileTap="press"
                onClick={() =>
                  window.open("https://www.linkedin.com/in/jade-paver-a6073a280/", "_blank", "noopener,noreferrer")
                }
                sx={{
                  display: "block",
                  cursor: "pointer",
                  width: { xs: 24, md: 32 },
                  height: { xs: 24, md: 32 },
                }}
              />
            </MotionStack>
          </MotionStack>
        </Stack>
      </Container>
      {/* End of first Section */}

      {/* Start of second Section (About Me) */}
      <Container
        id="section-about"
        sx={{
          scrollMarginTop: "120px",
          width: "95vw",
          padding: { xs: "0rem", lg: "1rem" },
          display: "flex",
          flexDirection: "column",
          bgcolor: 'transparent',
          marginTop: { xs: "4rem", lg: 0 },
        }}
      >
        <Stack direction='row' spacing='auto'>
          {/* Left image column - reveal once */}
          <MotionStack
            direction='column'
            spacing={2}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            sx={{
              width: { xs: "60%" },
              justifyContent: { xs: 'flex-end', md: 'flex-start' },
            }}
          >
            <MotionBox
              variants={itemVariants}
              initial="rest"
              whileHover="hover"
              sx={{
                width: { xs: 240, md: 380, lg: 540 },
                height: { xs: 300, md: 440, lg: 620 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* HIGH CONTRAST BACKGROUND LAYER */}
              <Box
                component="img"
                src="/images/me_no_shade2.png"
                alt="About Me background"
                sx={{
                  width: { xs: 220, md: 360, lg: 470 },
                  position: "absolute",
                  filter: "brightness(0.3) contrast(2) saturate(0)",
                  zIndex: 1,
                }}
              />
              <Box
                component={motion.img}
                src="/images/me_no_shade2.png"
                alt="About Me"
                variants={{
                  rest: {
                    scale: 1,
                    y: 0,
                    filter: "brightness(1) contrast(1)"
                  },
                  hover: {
                    scale: 1.02,
                    y: -3,
                    filter: "brightness(1.05) contrast(1.1)",
                    transition: {
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  }
                }}
                sx={{
                  width: { xs: 220, md: 360, lg: 470 },
                  position: "relative",
                  zIndex: 2,
                  transformOrigin: "center center"
                }}
              />

              {/* MAIN BOX FADE */}
              <MotionBox
                variants={fadeVariants}
                transition={{ duration: 0.35, ease: "easeOut" }}
                sx={{
                  backgroundColor: "primary.main",
                  position: "absolute",
                  left: "50%",
                  top: "23%",
                  width: "47%",
                  height: "9%",
                  opacity: 0.6,
                  transform: "translate(-50%, -50%)",
                  zIndex: 3,
                  WebkitMaskImage: `
            linear-gradient(to right,
              black 0%,
              black calc(50% - var(--fade) / 2),
              transparent calc(50% - var(--fade) / 2),
              transparent calc(50% + var(--fade) / 2),
              black calc(50% + var(--fade) / 2),
              black 100%
            )
          `,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "100% 100%",
                }}
              />

              {/* SOFT EDGE FADE */}
              <MotionBox
                variants={fadeVariants}
                transition={{ duration: 0.45, ease: "easeOut" }}
                sx={{
                  backgroundColor: "primary.main",
                  position: "absolute",
                  left: "50%",
                  top: "23%",
                  width: "47%",
                  height: "9%",
                  opacity: 0.35,
                  transform: "translate(-50%, -50%)",
                  zIndex: 3,
                  WebkitMaskImage: `
            linear-gradient(to right,
              black 0%,
              black calc(50% - var(--fade) / 2 - 3px),
              transparent calc(50% - var(--fade) / 2),
              transparent calc(50% + var(--fade) / 2),
              black calc(50% + var(--fade) / 2 + 3px),
              black 100%
            )
          `,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "100% 100%",
                }}
              />

              {/* ADDITIONAL FADE LAYER */}
              <MotionBox
                variants={fadeVariants}
                transition={{ duration: 0.55, ease: "easeOut" }}
                sx={{
                  backgroundColor: "primary.main",
                  position: "absolute",
                  left: "50%",
                  top: "23%",
                  width: "47%",
                  height: "9%",
                  opacity: 0.2,
                  transform: "translate(-50%, -50%)",
                  zIndex: 3,
                  WebkitMaskImage: `
            linear-gradient(to right,
              black 0%,
              black calc(50% - var(--fade) / 2 - 6px),
              transparent calc(50% - var(--fade) / 2 - 2px),
              transparent calc(50% + var(--fade) / 2 + 2px),
              black calc(50% + var(--fade) / 2 + 6px),
              black 100%
            )
          `,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "100% 100%",
                }}
              />
            </MotionBox>
          </MotionStack>

          {/* Right content column - reveal once */}
          <MotionStack
            direction={{ xs: "row", md: "column" }}
            spacing={2}
            sx={{
              width: { xs: "40%" },
              justifyContent: "center",
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewportTight}
          >
            {/* Text content wrapper */}
            <Stack
              direction="column"
              spacing={{ xs: 0, lg: 2 }}
              sx={{
                width: { xs: "100%", lg: "100%" },
                justifyContent: "center",
              }}>
              <Typography
                fontWeight={600}
                fontSize={{ xs: "1.5rem", lg: 56 }}
                sx={{ color: "black", m: 0, p: 0 }}
              >
                About Me
              </Typography>
              <MotionTypography
                variant="body2"
                sx={{
                  color: "black",
                  textAlign: "justify",
                  lineHeight: { xs: 1.5, lg: 1.75 },
                  fontSize: { xs: "0.75rem", lg: "1rem" }
                }}
                variants={itemVariants}
              >
                I started programming at 16 in high school, and ever since then, I've been committed to staying updated with the latest technologies. My burning passion for the tech industry enables me to quickly adapt and effectively utilize any tools I work with.
              </MotionTypography>
            </Stack>

            {/* Progress bars wrapper - separate column on xs */}
            <Stack
              direction="column"
              spacing={2}
              sx={{
                width: { xs: "100%", md: "100%" },
                display: { xs: "none", md: "flex" }  // Hide on xs, show on md+
              }}
            >
              <MotionTypography fontWeight={700} variant='h6' variants={itemVariants}>
                Web Development
              </MotionTypography>
              <MotionBox variants={itemVariants}>
                <LinearProgressWithDot value={100} duration={1400} delay={100} animateOnView once />
              </MotionBox>

              <MotionTypography fontWeight={700} variant='h6' variants={itemVariants}>
                Mobile App Development
              </MotionTypography>
              <MotionBox variants={itemVariants}>
                <LinearProgressWithDot value={80} duration={1400} delay={150} animateOnView once />
              </MotionBox>

              <MotionTypography fontWeight={700} variant='h6' variants={itemVariants}>
                UI/UX
              </MotionTypography>
              <MotionBox variants={itemVariants}>
                <LinearProgressWithDot value={75} duration={1400} delay={200} animateOnView once />
              </MotionBox>

              <MotionTypography fontWeight={700} variant='h6' variants={itemVariants}>
                Project Management
              </MotionTypography>
              <MotionBox variants={itemVariants}>
                <LinearProgressWithDot value={82.5} duration={1400} delay={250} animateOnView once />
              </MotionBox>
            </Stack>
          </MotionStack>
        </Stack>

        {/* Progress bars section - Show below on xs screens only */}
        <Stack
          direction="column"
          spacing={{ xs: 1.5, md: 2 }}
          sx={{
            display: { xs: "flex", md: "none" },  // Show on xs, hide on md+
            mt: { xs: 2, md: 4 },
            px: { xs: 0, lg: 2 },
          }}
        >
          <MotionTypography fontWeight={700} variant='h6' sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }} variants={itemVariants}>
            Web Development
          </MotionTypography>
          <MotionBox
            variants={itemVariants}
          >
            <LinearProgressWithDot value={100} duration={1400} delay={100} animateOnView once />
          </MotionBox>

          <MotionTypography fontWeight={700} variant='h6' sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }} variants={itemVariants}>
            Mobile App Development
          </MotionTypography>
          <MotionBox variants={itemVariants}>
            <LinearProgressWithDot value={80} duration={1400} delay={150} animateOnView once />
          </MotionBox>

          <MotionTypography fontWeight={700} variant='h6' sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }} variants={itemVariants}>
            UI/UX
          </MotionTypography>
          <MotionBox variants={itemVariants}>
            <LinearProgressWithDot value={75} duration={1400} delay={200} animateOnView once />
          </MotionBox>

          <MotionTypography fontWeight={700} variant='h6' sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }} variants={itemVariants}>
            Project Management
          </MotionTypography>
          <MotionBox variants={itemVariants}>
            <LinearProgressWithDot value={82.5} duration={1400} delay={250} animateOnView once />
          </MotionBox>
        </Stack>
      </Container>
      {/* End of second Section */}

      {/* Start of third Section */}
      <Container
        id="section-services"
        sx={{
          scrollMarginTop: "120px",
          width: { xs: "95vw", lg: "80vw" },
          padding: { xs: "0rem", lg: "1rem" },
          height: { xs: "auto", lg: "90vh" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          my: '5%',
          bgcolor: "transparent",
        }}
      >
        <Typography
          fontWeight={600}
          fontSize={{ xs: "1.5rem", lg: 56, }}
          sx={{ color: "black", m: 0, p: 0, mt: { xs: "2rem", lg: "0rem" } }}
        >
          Services
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            width: { xs: "92.5%", lg: "50%" },
            textAlign: "center",
            lineHeight: { xs: 1.5, lg: 1.75 },
            fontSize: { xs: "0.75rem", lg: "1rem" }
          }}
        >
          I provide UI/UX design, web and mobile development, and hands-on project management to bring ideas into production.
        </Typography>
        <Stack
          direction={{ xs: 'column', lg: "row" }}
          sx={{
            p: "2rem 0.5rem",
            width: "100%",
            justifyContent: "center",
            alignItems: { xs: "center", lg: "flex-start" },
            gap: 2,
          }}
        >
          <Box sx={{
            position: { xs: "static", lg: "relative" },
            width: { xs: 340, lg: 265 },
            height: { xs: "auto", lg: 320 },
            minHeight: { xs: 320, lg: "auto" },
            flex: "0 0 auto"
          }}>
            <Box sx={{ position: { xs: "static", lg: "absolute" }, inset: { xs: "unset", lg: 0 } }}>
              <ServiceCard
                title="Project Management"
                description="Clear, structured, and results-driven project coordination—from planning to delivery. I ensure transparent communication, smooth workflows, and on-time execution at every stage."
                iconSrc="/icons/pm_icon.svg"
                items={["bitbucket", "trello", "jira"]}
                width="100%"
                height="100%"
              />
            </Box>
          </Box>
          <Box sx={{
            position: { xs: "static", lg: "relative" },
            width: { xs: 340, lg: 265 },
            height: { xs: "auto", lg: 320 },
            minHeight: { xs: 320, lg: "auto" },
            flex: "0 0 auto"
          }}>
            <Box sx={{ position: { xs: "static", lg: "absolute" }, inset: { xs: "unset", lg: 0 } }}>
              <ServiceCard
                title="Web Development"
                description="With over 6 years of experience in software development, I build fast, high-quality, and scalable web applications. I specialize in modern Node-based frameworks, allowing me to deliver reliable products with clean architecture and excellent performance."
                iconSrc="/icons/web_dev_icon.svg"
                items={["git", "github", "vscode", "laravel", "nodejs", "react", "typescript"]}
                width="100%"
                height="100%"
              />
            </Box>
          </Box>
          <Box sx={{
            position: { xs: "static", lg: "relative" },
            width: { xs: 340, lg: 265 },
            height: { xs: "auto", lg: 320 },
            minHeight: { xs: 320, lg: "auto" },
            flex: "0 0 auto"
          }}>
            <Box sx={{ position: { xs: "static", lg: "absolute" }, inset: { xs: "unset", lg: 0 } }}>
              <ServiceCard
                title="Mobile App"
                description="I build mobile applications using Dart and Flutter, delivering fast, dynamic, and fully cross-platform apps. With experience in developing six mobile projects, I take advantage of Flutter's performance optimized down to near assembly speed to create smooth, high-quality user experiences on both iOS and Android."
                iconSrc="/icons/mobile_dev_icon.svg"
                items={["dart", "supabase", "android_studio"]}
                width="100%"
                height="100%"
              />
            </Box>
          </Box>
          <Box sx={{
            position: { xs: "static", lg: "relative" },
            width: { xs: 340, lg: 265 },
            height: { xs: "auto", lg: 320 },
            minHeight: { xs: 320, lg: "auto" },
            flex: "0 0 auto"
          }}>
            <Box sx={{ position: { xs: "static", lg: "absolute" }, inset: { xs: "unset", lg: 0 } }}>
              <ServiceCard
                title="UI/UX"
                description="I design intuitive and user-centered interfaces to guide the entire development process. Using modern Figma workflows, I plan and visualize the product's structure, ensuring clarity, transparency, and alignment with client goals. This allows me to communicate ideas effectively and deliver designs that are both practical and visually engaging."
                iconSrc="/icons/design_icon.svg"
                items={["figma"]}
                width="100%"
                height="100%"
              />
            </Box>
          </Box>
        </Stack>
      </Container>
      {/* End of third Section */}

      {/* Start of fourth Section */}
      <Container
        id="section-projects"
        sx={{
          scrollMarginTop: "120px",
          width: "90vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          bgcolor: 'transparent',
          overflowX: "hidden",
        }}
      >
        <Typography
          fontWeight={600}
          fontSize={{ xs: "1.5rem", lg: 56 }}
          sx={{ color: "black", m: 0, p: 0, mt: { xs: "4rem", lg: "0rem" } }}
        >
          My Projects
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            width: { xs: "100%", lg: "50%" },
            textAlign: "center",
            mb: '2rem',
            lineHeight: { xs: 1.5, lg: 1.75 },
            fontSize: { xs: "0.75rem", lg: "1rem" }
          }}
        >
          These are the projects  that reflect my software development journey. Turning real-world needs into clean, scalable applications.
        </Typography>
        <ProjectCarousel
          title="Featured Projects"
          items={items}
          cardWidth={300}
          categoryValue={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categoryOptions={categories}
        />
      </Container>
      {/* End of fourth Section */}

      {/* Start of fifth Section */}
      <Container
        id="section-contact"
        sx={{
          scrollMarginTop: "120px",
          width: "90vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          bgcolor: 'transparent',
          my: '10%',
        }}
      >
        <Typography
          fontWeight={600}
          fontSize={{ xs: "1.5rem", lg: 56, }}
          sx={{ color: "black", m: 0, p: 0, mt: { xs: "2rem", lg: "0rem" } }}
        >
          Lets Create Together
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            width: { xs: "95%", lg: "50%" },
            textAlign: "center",
            lineHeight: { xs: 1.5, lg: 1.75 },
            fontSize: { xs: "0.75rem", lg: "1rem" }
          }}>
          I provide UI/UX design, web and mobile development, and hands-on project management to bring ideas into production.
        </Typography>
        <MotionButton
          disableElevation
          variant="contained"
          color="primary"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          sx={{
            width: 'auto',
            alignSelf: 'flex-start',
            color: 'white',
            mt: '1rem',
            p: "0.5rem 2rem",
            fontWeight: 500,
            mx: 'auto'
          }}
          onClick={() => { window.location.href = "mailto:paver.jade09@gmail.com"; }}
        >
          Contact Me
        </MotionButton>
      </Container>
      {/* End of fifth Section */}
    </DefaultLayout>
  );
}