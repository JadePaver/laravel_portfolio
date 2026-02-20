import React, { useEffect, useRef, useState } from "react";
import { Box, Stack, Typography, SxProps } from "@mui/material";
import { motion } from "framer-motion";
import IconStackExpandable from "./IconStackExpandable";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

interface ServiceCardProps {
  title?: string;
  description?: string;
  iconSrc?: string;
  items?: string[];
  width?: number | string;
  height?: number | string; // collapsed height
  sx?: SxProps;
  iconHeight?: number; // allow overriding icon height if needed
  hoverExtra?: number | string; // extra height added when hovered (acts as padding)
  hoverBottomExtra?: number | string; // additional bottom padding/height when hovered
}

/**
 * Reusable service card.
 * - Fixes expanding height by precisely measuring full content height (including collapsed margins)
 *   and animating to that value. Uses display: flow-root to avoid margin-collapsing issues.
 * - Shows 4 lines of description initially; expands to full on hover.
 * - Elevates straight up (no horizontal shift) on hover.
 */
export default function ServiceCard({
  title,
  description,
  iconSrc = "/icons/pm_icon.svg",
  items = ["git", "github", "vscode", "laravel", "nodejs", "react", "typescript"],
  width = "265px",
  height = "320px",
  sx,
  iconHeight = 50,
  hoverExtra = 32, // base extra height when hovered
  hoverBottomExtra = 16, // extra bottom padding/height when hovered
}: ServiceCardProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [expandedHeightPx, setExpandedHeightPx] = useState<number | null>(null);

  const parsePx = (value: number | string | undefined, fallback = 320) => {
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const m = value.match(/^(\d+)(px)?$/);
      if (m) return Number(m[1]);
    }
    return fallback;
  };

  const collapsedHeight = parsePx(height, 320);
  const hoverExtraPx = parsePx(hoverExtra, 32);
  const hoverBottomExtraPx = parsePx(hoverBottomExtra, 16);
  const measureBuffer = 8; // small buffer to prevent last line clipping due to rounding

  // Measure the full content height accurately (no margin collapse)
  useEffect(() => {
    const measure = () => {
      if (!contentRef.current) return;

      const original = contentRef.current;
      const parent = original.parentElement as HTMLElement;
      if (!parent) return;

      // Clone the content wrapper (flow-root) so margins don't collapse
      const clone = original.cloneNode(true) as HTMLElement;

      // Remove clamp on clone's description nodes so we measure full height
      const descNodes = clone.querySelectorAll("[data-desc]");
      descNodes.forEach((node) => {
        const el = node as HTMLElement;
        (el.style as any).WebkitLineClamp = "unset";
        el.style.display = "block";
        el.style.overflow = "visible";
      });

      // Offscreen measurement container
      const tempWrapper = document.createElement("div");
      tempWrapper.style.position = "absolute";
      tempWrapper.style.visibility = "hidden";
      tempWrapper.style.pointerEvents = "none";
      tempWrapper.style.left = "-9999px";
      tempWrapper.style.top = "0";
      tempWrapper.style.width = original.clientWidth + "px"; // match current width
      tempWrapper.appendChild(clone);
      document.body.appendChild(tempWrapper);

      // Height of content wrapper (includes internal margins because of flow-root)
      const fullContentHeight = clone.getBoundingClientRect().height;

      // Add the card's vertical paddings so the container height matches MotionBox's padding box
      const computed = window.getComputedStyle(parent);
      const paddingTop = parseFloat(computed.paddingTop || "0");
      const paddingBottom = parseFloat(computed.paddingBottom || "0");

      const total = Math.ceil(fullContentHeight + paddingTop + paddingBottom + measureBuffer);
      setExpandedHeightPx(total);

      document.body.removeChild(tempWrapper);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [description, items, title, iconSrc, width, height]);

  // Target height when hovered: measured expanded height + extras
  const targetHeight =
    hovered && expandedHeightPx
      ? expandedHeightPx + hoverExtraPx + hoverBottomExtraPx
      : hovered && !expandedHeightPx
      ? collapsedHeight + hoverExtraPx + hoverBottomExtraPx
      : collapsedHeight;

  // Subtle elevation settings
  const outerShadowCollapsed = "0px 6px 14px rgba(0,0,0,0.07)";
  const outerShadowHovered = "0px 16px 32px rgba(0,0,0,0.12)";
  const innerInsetShadow = "inset 0 8px 16px rgba(0,0,0,0.03)";
  const cubicEase: [number, number, number, number] = [0.22, 0.1, 0.22, 1];

  return (
    <MotionBox
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        height: targetHeight, // animate to the exact measured height
        y: hovered ? -3 : 0, // move only upwards
        boxShadow: hovered ? outerShadowHovered : outerShadowCollapsed,
      }}
      transition={{
        height: { type: "tween", duration: 0.26, ease: cubicEase },
        y: { type: "spring", stiffness: 200, damping: 20 },
        boxShadow: { type: "tween", duration: 0.22, ease: cubicEase },
      }}
      sx={{
        position: "relative",
        bgcolor: "#F8F8F8",
        borderRadius: "1rem",
        width,
        // initial collapsed height
        height: `${collapsedHeight}px`,
        p: "3rem 1rem 1rem 1rem",
        overflow: "hidden", // content will fit because we compute and animate to full height
        cursor: "default",
        display: "block",
        willChange: "transform, box-shadow, height",
        ...((sx as object) || {}),
      }}
    >
      {/* Light inner inset shadow overlay */}
      <MotionBox
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          boxShadow: innerInsetShadow,
          opacity: 0,
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: cubicEase }}
      />

      {/* Content wrapper.
          Use flow-root to prevent margin-collapsing so measurement matches visible layout. */}
      <Box ref={contentRef} sx={{ display: "flow-root" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Box
            component="img"
            src={iconSrc}
            alt={`${title ?? "Service"} Icon`}
            sx={{
              height: iconHeight,
              width: "auto",
              maxWidth: "100%",
              display: "block",
            }}
          />
          <IconStackExpandable items={items} />
        </Stack>

        {/* Title: visible initially, subtle lift on hover */}
        {title && (
          <MotionTypography
            fontWeight={700}
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "left",
              mt: 3,
              WebkitFontSmoothing: "antialiased",
            }}
            animate={{
              y: hovered ? -1 : 0,
              scale: hovered ? 1.002 : 1,
            }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
          >
            {title}
          </MotionTypography>
        )}

        {/* Description: 4 lines initially, full on hover */}
        {description && (
          <MotionTypography
            data-desc
            variant="body2"
            sx={{
              textAlign: "left",
              mt: 2,
              letterSpacing: "0.02em",
              lineHeight: 1.7,
              display: "-webkit-box",
              WebkitLineClamp: hovered ? "unset" : "4",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              wordBreak: "break-word",
            }}
            animate={{
              y: hovered ? 0 : 4,
              opacity: 1,
            }}
            transition={{ duration: 0.28, ease: cubicEase }}
          >
            {description}
          </MotionTypography>
        )}
      </Box>
    </MotionBox>
  );
}