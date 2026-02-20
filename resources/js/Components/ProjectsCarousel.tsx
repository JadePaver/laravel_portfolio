import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Typography, IconButton, Stack, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProjectCategoryButtons from "@/Components/ProjectCategoryToggleButton";

import { motion, Variants } from "framer-motion";

const MotionBox = motion(Box);

export type ProjectCarouselItem = {
    title: string;
    color: string;
    image?: string;
    category?: string[]; // categories the item belongs to
    link?: string;
};

type DisplayItem = ProjectCarouselItem | { type: "filler" };

export interface ProjectCarouselProps {
    title?: string;
    items: ProjectCarouselItem[];
    cardWidth?: number | string;
    categoryValue?: string;
    onCategoryChange?: (value: string) => void;
    categoryOptions?: string[];
}

export default function ProjectCarousel({
    title = "Featured Projects",
    items,
    cardWidth = 450,
    categoryValue = "All",
    onCategoryChange,
    categoryOptions = ["All", "UI/UX", "Web Development", "Mobile App", "Project Management"],
}: ProjectCarouselProps) {
    const theme = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);

    const filteredItems = useMemo(() => {
        if (categoryValue === "All") return items;
        return items.filter((it) => (it.category ?? []).includes(categoryValue));
    }, [items, categoryValue]);

    const widthPx: number =
        typeof cardWidth === "number"
            ? cardWidth
            : typeof cardWidth === "string" && cardWidth.endsWith("px")
                ? parseInt(cardWidth)
                : 450;

    const gapUnit = 2;
    const gapPx: number = Number(theme.spacing(gapUnit).replace("px", ""));

    const displayItems: DisplayItem[] = [{ type: "filler" }, ...filteredItems, { type: "filler" }];

    const trackRef = useRef<HTMLDivElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const [dragOffset, setDragOffset] = useState(0);

    const dragState = useRef<{
        isDragging: boolean;
        startX: number;
        lastX: number;
        velocity: number;
        frame: number | null;
        dragMoved: boolean;
    }>({
        isDragging: false,
        startX: 0,
        lastX: 0,
        velocity: 0,
        frame: null,
        dragMoved: false,
    });

    const glareCardVariants: Variants = {
        rest: {
            // keep your existing scaling logic in `sx.transform`
            // so variants only handle the overlay animation
        },
        hover: {},
    };

    useEffect(() => {
        setCurrentIndex(0);
    }, [categoryValue]);

    const visibleCards = 3;

    const getViewportWidth = () => {
        const parentWidth = viewportRef.current?.clientWidth ?? 0;
        const ideal = widthPx * visibleCards + gapPx * (visibleCards - 1);
        return Math.min(ideal, parentWidth || ideal);
    };

    const applyCenterTransform = () => {
        const track = trackRef.current;
        const viewportWidth = getViewportWidth();
        if (!track || !viewportWidth) return;
        const centerIdx = currentIndex + 1;
        const offset = (widthPx + gapPx) * centerIdx - (viewportWidth - widthPx) / 2;
        track.style.transition = "transform 350ms cubic-bezier(.57,.17,.55,1.07)";
        track.style.transform = `translateX(-${offset}px)`;
    };

    useEffect(() => {
        applyCenterTransform();
        const track = trackRef.current;
        if (!track) return;
        const handleTransitionEnd = () => {
            track.style.transition = "";
        };
        track.addEventListener("transitionend", handleTransitionEnd);
        return () => track.removeEventListener("transitionend", handleTransitionEnd);
    }, [currentIndex, widthPx, gapPx, filteredItems.length]);

    useEffect(() => {
        const onResize = () => applyCenterTransform();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") setCurrentIndex((idx) => Math.max(0, idx - 1));
            if (e.key === "ArrowRight") setCurrentIndex((idx) => Math.min(filteredItems.length - 1, idx + 1));
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [filteredItems.length]);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        let dragStartIndex = 0;
        let currentOffset = 0;

        function setTrackX(draggedOffset: number) {
            const viewportWidth = getViewportWidth();
            const centerIdx = currentIndex + 1;
            const baseOffset = (widthPx + gapPx) * centerIdx - (viewportWidth - widthPx) / 2;
            const node = trackRef.current;
            if (!node) return;
            node.style.transition = "none";
            node.style.transform = `translateX(${-baseOffset + draggedOffset}px)`;
        }

        function onPointerDown(e: PointerEvent | TouchEvent) {
            const clientX =
                (e as PointerEvent).clientX ||
                (((e as TouchEvent).touches &&
                    (e as TouchEvent).touches[0] &&
                    (e as TouchEvent).touches[0].clientX) as number) ||
                0;
            dragState.current.isDragging = true;
            dragState.current.startX = clientX;
            dragState.current.lastX = clientX;
            dragState.current.dragMoved = false;
            dragStartIndex = currentIndex;
            currentOffset = 0;
            window.addEventListener("pointermove", onPointerMove);
            window.addEventListener("pointerup", onPointerUp);
            window.addEventListener("touchmove", onPointerMove, { passive: false });
            window.addEventListener("touchend", onPointerUp);
        }

        function onPointerMove(e: PointerEvent | TouchEvent) {
            const clientX =
                (e as PointerEvent).clientX ||
                (((e as TouchEvent).touches &&
                    (e as TouchEvent).touches[0] &&
                    (e as TouchEvent).touches[0].clientX) as number) ||
                0;
            if (!dragState.current.isDragging) return;
            e.preventDefault?.();
            dragState.current.dragMoved = true;
            const dx = clientX - dragState.current.lastX;
            currentOffset += dx;
            setDragOffset(currentOffset);
            setTrackX(currentOffset);
            dragState.current.lastX = clientX;
        }

        function onPointerUp() {
            if (!dragState.current.isDragging) return;
            dragState.current.isDragging = false;
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("touchmove", onPointerMove);
            window.removeEventListener("touchend", onPointerUp);

            if (currentOffset === 0) return;
            const draggedItems = Math.round(-currentOffset / (widthPx + gapPx));
            let newIdx = dragStartIndex + draggedItems;
            newIdx = Math.max(0, Math.min(filteredItems.length - 1, newIdx));
            setCurrentIndex(newIdx);
            setDragOffset(0);
            applyCenterTransform();
        }

        el.addEventListener("pointerdown", onPointerDown);
        el.addEventListener("touchstart", onPointerDown, { passive: false });

        return () => {
            el.removeEventListener("pointerdown", onPointerDown);
            el.removeEventListener("touchstart", onPointerDown);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("touchmove", onPointerMove);
            window.removeEventListener("touchend", onPointerUp);
        };
    }, [currentIndex, widthPx, gapPx, filteredItems.length]);

    const handlePrev = () => setCurrentIndex((idx) => Math.max(0, idx - 1));
    const handleNext = () => setCurrentIndex((idx) => Math.min(filteredItems.length - 1, idx + 1));

    const navButtonSx = {
        position: "absolute" as const,
        top: "50%",
        transform: "translateY(-50%)",
        width: 48,
        height: 48,
        borderRadius: "999px",
        bgcolor: "rgba(255,255,255,0.9)",
        color: theme.palette.mode === "dark" ? "grey.100" : "grey.900",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "none", // remove shadow
        backdropFilter: "blur(6px)",
        zIndex: 5,
        transition:
            "transform 200ms ease, background-color 200ms ease, opacity 200ms ease",
        "&:hover": {
            transform: "translateY(-50%) scale(1.06)",
            bgcolor: "rgba(255,255,255,0.98)",
        },
        "&:active": {
            transform: "translateY(-50%) scale(0.98)",
        },
        "&:disabled": {
            opacity: 0.4,
        },
    } as const;

    return (
        <Box
            sx={{
                width: "100%",
                mx: "auto",
                position: "relative",
                py: 3,
                userSelect: "none",
                perspective: "1200px",
                transformStyle: "preserve-3d",
                overflowX: "hidden",
            }}
        >
            {/* Header + Category buttons */}
            <Stack spacing={2} sx={{ alignItems: "center", px: 2 }}>
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ fontFamily: "Poppins, sans-serif", userSelect: "none", textAlign: "center" }}
                >
                    {title}
                </Typography>

                <ProjectCategoryButtons
                    value={categoryValue}
                    onChange={(val) => {
                        onCategoryChange?.(val);
                    }}
                    options={categoryOptions}
                />
            </Stack>

            {/* Centering wrapper */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                {/* Viewport */}
                <Box
                    ref={viewportRef}
                    sx={{
                        width: "100%",
                        maxWidth: `${widthPx * visibleCards + gapPx * (visibleCards - 1)}px`,
                        position: "relative",
                        overflow: "hidden", // prevent vertical scroll in viewport
                        userSelect: "none",
                    }}
                >
                    {/* Left Arrow */}
                    <IconButton
                        aria-label="previous"
                        onClick={handlePrev}
                        disabled={currentIndex <= 0}
                        sx={{ ...navButtonSx, left: 8 }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>

                    {/* Right Arrow */}
                    <IconButton
                        aria-label="next"
                        onClick={handleNext}
                        disabled={currentIndex >= filteredItems.length - 1}
                        sx={{ ...navButtonSx, right: 8 }}
                    >
                        <ChevronRightIcon />
                    </IconButton>

                    {/* Track */}
                    <Box
                        ref={trackRef}
                        sx={{
                            display: "flex",
                            gap: gapUnit,
                            width: `${displayItems.length * widthPx + gapPx * (displayItems.length - 1)}px`,
                            minHeight: "100%/",
                            py: { xs: '10%', lg: '5%' },
                            transition: "transform 350ms cubic-bezier(.57,.17,.55,1.07)",
                            alignItems: "flex-start",
                            cursor: "grab",
                            userSelect: "none",
                            overflowY: "hidden", // remove vertical scroll on the track
                        }}
                    >
                        {displayItems.map((item, idx) => {
                            if ("type" in item && item.type === "filler") {
                                return (
                                    <Box
                                        key={`filler-${idx}`}
                                        sx={{
                                            minWidth: `${widthPx}px`,
                                            width: `${widthPx}px`,
                                            background: "none",
                                            height: "auto",
                                            flexShrink: 0,
                                            userSelect: "none",
                                            overflow: "hidden", // ensure no vertical scroll in filler
                                            boxShadow: "none",  // no shadow on filler
                                        }}
                                    />
                                );
                            }

                            const realItem = item as ProjectCarouselItem;

                            const cardDistance = widthPx + gapPx;
                            const currentCenterIndex = currentIndex + 1 - dragOffset / cardDistance;
                            const distanceFromCenter = Math.abs(idx - currentCenterIndex);

                            const farScale = 0.35;
                            let scale: number;
                            if (distanceFromCenter >= 2) {
                                scale = farScale;
                            } else {
                                const maxScale = 1.13;
                                const minScale = 0.6;
                                const decay = 1.25;
                                scale = minScale + (maxScale - minScale) * Math.exp(-decay * distanceFromCenter);
                            }

                            return (
                                <Box
                                    key={realItem.title}
                                    tabIndex={0}
                                    sx={{
                                        minWidth: `${widthPx}px`,
                                        width: `${widthPx}px`,
                                        borderRadius: 2,
                                        bgcolor: "transparent",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "stretch",
                                        justifyContent: "flex-start",
                                        color: "white",
                                        flexShrink: 0,
                                        transition:
                                            "transform 320ms cubic-bezier(.57,.17,.55,1.07)",
                                        transform: `scale(${scale})`,
                                        zIndex: distanceFromCenter < 0.6 ? 2 : 1,
                                        p: 0,
                                        userSelect: "none",
                                        overflow: "show",
                                        boxShadow: "none",  // remove shadow from each card
                                    }}
                                >
                                    {realItem.image && (
                                        <MotionBox
                                            initial="rest"
                                            animate="rest"
                                            whileHover="hover"
                                            variants={{
                                                rest: {
                                                    rotateX: 0,
                                                    rotateY: 0,
                                                    scale: 1,
                                                    boxShadow: "0px 2px 9px rgba(0,0,0,0.10)",
                                                },
                                                hover: {
                                                    rotateX: 8,
                                                    rotateY: -12,
                                                    scale: 0.97,
                                                    boxShadow: "0px 8px 8px rgba(0,0,0,0.22)",
                                                    transition: { type: "spring", stiffness: 260, damping: 20 },
                                                },
                                            }}
                                            sx={{
                                                width: "100%",
                                                display: "block",
                                                bgcolor: "transparent",
                                                pt: 0,
                                                userSelect: "none",
                                                cursor: "pointer",
                                                position: "relative",
                                                transformOrigin: "center",
                                                willChange: "transform, box-shadow",
                                                borderRadius: 2,
                                                overflow: "hidden", // ensures border + overlay + img clip together
                                                border: "1px solid rgba(0,0,0,0.12)", // <-- add consistent border (not only on hover)
                                            }}
                                            style={{
                                                perspective: "900px",
                                                transformStyle: "preserve-3d",
                                            }}
                                            onClick={() => {
                                                const base = window.location.href.replace(/\/$/, "");
                                                const next = String(realItem.link ?? "").replace(/^\//, "");
                                                window.location.assign(`${base}/projects/${next}`);
                                            }}
                                        >
                                            {/* BLUR OVERLAY + "More" text button */}
                                            <MotionBox
                                                variants={{
                                                    rest: { opacity: 0 },
                                                    hover: { opacity: 1, transition: { duration: 0.18, ease: "easeOut" } },
                                                }}
                                                sx={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    borderRadius: "inherit",
                                                    overflow: "hidden",
                                                    pointerEvents: "auto",
                                                    display: "grid",
                                                    placeItems: "center",
                                                    backgroundColor: "rgba(0,0,0,0.18)",
                                                    backdropFilter: "blur(2px)",
                                                    WebkitBackdropFilter: "blur(2px)",
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const base = window.location.href.replace(/\/$/, "");
                                                    const next = String(realItem.link ?? "").replace(/^\//, "");
                                                    window.location.assign(`${base}/projects/${next}`);
                                                }}
                                            >
                                                <Box
                                                    component="button"
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const base = window.location.href.replace(/\/$/, "");
                                                        const next = String(realItem.link ?? "").replace(/^\//, "");
                                                        window.location.assign(`${base}/projects/${next}`);
                                                    }}
                                                    sx={{
                                                        appearance: "none",
                                                        border: 0,
                                                        background: "transparent",
                                                        padding: 0,
                                                        cursor: "pointer",
                                                        fontFamily: "Poppins, sans-serif",
                                                        fontWeight: 600,
                                                        letterSpacing: "0.12em",
                                                        textTransform: "uppercase",
                                                        color: "common.white",
                                                        fontSize: 13,
                                                        position: "relative",
                                                        outline: "none",

                                                        "&::after": {
                                                            content: '""',
                                                            position: "absolute",
                                                            left: 0,
                                                            bottom: -4,
                                                            height: "2px",
                                                            width: "100%",
                                                            backgroundColor: "currentColor",
                                                            transform: "scaleX(0)",
                                                            transformOrigin: "left",
                                                            transition: "transform 180ms ease",
                                                        },
                                                        "&:hover::after, &:focus-visible::after": {
                                                            transform: "scaleX(1)",
                                                        },
                                                    }}
                                                >
                                                    {'MORE >'}
                                                </Box>
                                            </MotionBox>

                                            <Box
                                                component="img"
                                                src={realItem.image}
                                                alt={realItem.title}
                                                draggable={false}
                                                sx={{
                                                    display: "block",
                                                    width: "100%",
                                                    height: "auto",
                                                    objectFit: "cover",
                                                    objectPosition: "center",
                                                    userSelect: "none",
                                                    pointerEvents: "none",
                                                }}
                                            />
                                        </MotionBox>
                                    )}
                                    <Box sx={{ width: "100%", pt: 2, userSelect: "none", overflow: "hidden", textAlign: "left" }}>
                                        <Stack direction="row" spacing={1}>
                                            {(realItem.category ?? []).map((cat, i, arr) => (
                                                <Typography
                                                    variant="body2"
                                                    fontSize={12}
                                                    sx={{
                                                        textAlign: "left",
                                                        color: "primary.main",
                                                        mb: 0.5,
                                                        userSelect: "none",
                                                    }}
                                                    key={`${realItem.title}-${cat}-${i}`}
                                                    draggable={false}
                                                    component="span"
                                                >
                                                    {cat}
                                                    {i < arr.length - 1 ? "," : ""}
                                                </Typography>
                                            ))}
                                        </Stack>
                                        <Typography
                                            variant="subtitle2"
                                            fontWeight={600}
                                            sx={{ textAlign: "left", color: "#1E1E1E", mb: 1, userSelect: "none" }}
                                            draggable={false}
                                            component="span"
                                        >
                                            {realItem.title}
                                        </Typography>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}