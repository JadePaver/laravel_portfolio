import React from "react";
import { Stack, Button, ButtonProps } from "@mui/material";

export interface ProjectCategoryButtonsProps {
  value: string;
  onChange: (value: string) => void;
  options?: string[]; // default options
  buttonProps?: Omit<ButtonProps, "onClick" | "variant" | "color">;
  gap?: number;
}

/**
 * ProjectCategoryButtons
 * Fix: Prevent width change on selection by using identical padding and layout rules
 * for both selected and unselected states.
 *
 * - Unselected: #F8F8F8 background, 1px inset outline, black text
 * - Selected: primary.main background, white text, no outline
 * - Uniform pill radius, consistent spacing, no special first/last styles
 * - Horizontally scrollable on xs with smaller buttons
 */
export default function ProjectCategoryButtons({
  value,
  onChange,
  options = ["All", "UI/UX", "Web Development", "Mobile App", "Project Management"],
  buttonProps,
  gap = 2,
}: ProjectCategoryButtonsProps) {
  return (
    <Stack 
      direction="row" 
      spacing={gap}
      sx={{
        overflowX: "auto",
        overflowY: "hidden",
        flexWrap: "nowrap",
        // Hide scrollbar but keep functionality
        "&::-webkit-scrollbar": {
          height: 6,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: 3,
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "rgba(0,0,0,0.3)",
        },
        // For Firefox
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(0,0,0,0.2) transparent",
        // Add padding to prevent first/last button from being cut off
        px: { xs: 0.5, md: 0 },
        pb: 1, // space for scrollbar
      }}
    >
      {options.map((opt) => {
        const isSelected = opt === value;
        return (
          <Button
            key={opt}
            onClick={() => onChange(opt)}
            disableRipple
            {...buttonProps}
            sx={(theme) => ({
              // Typography - responsive sizing
              textTransform: "none",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 300,
              fontSize: { xs: 12, md: 14 },

              // Geometry (same in both states to avoid width shift) - responsive
              borderRadius: { xs: "10px", md: "12px" },
              minWidth: "auto",
              px: { xs: 1.8, md: 2.6 }, // smaller padding on xs
              py: { xs: 0.5, md: 0.7 },
              lineHeight: 1.75,
              flexShrink: 0, // prevent buttons from shrinking in scroll container

              // Base (unselected)
              bgcolor: "#F8F8F8",
              color: "black",
              border: "none",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18)",

              // Selected (do NOT change padding)
              ...(isSelected && {
                bgcolor: theme.palette.primary.main,
                color: theme.palette.common.white,
                boxShadow: "none",
                "&:hover": { bgcolor: theme.palette.primary.dark },
              }),

              // Hover (unselected)
              "&:hover": !isSelected
                ? { bgcolor: "#F0F0F0", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.22)" }
                : undefined,

              // Prevent layout shift from font weight changes by keeping letter-spacing stable
              letterSpacing: 0.2,

              // Focus ring
              "&.Mui-focusVisible": {
                boxShadow: isSelected
                  ? `0 0 0 3px ${theme.palette.primary.main}40`
                  : `inset 0 0 0 1px rgba(0,0,0,0.22), 0 0 0 3px ${theme.palette.primary.main}30`,
              },
            })}
          >
            {opt}
          </Button>
        );
      })}
    </Stack>
  );
}