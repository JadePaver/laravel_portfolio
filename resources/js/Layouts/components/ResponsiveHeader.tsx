import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Stack,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 240;
const logoSrc = "/images/portfolio_logo.svg";

const menuItems = [
  { label: "Home", section: "section-hero" },
  { label: "About Me", section: "section-about" },
  { label: "Services", section: "section-services" },
  { label: "Projects", section: "section-projects" },
  { label: "Contact", section: "section-contact" },
];

interface ResponsiveHeaderProps {
  scrollTo: (section: string) => void;
}

function ResponsiveHeader({ scrollTo }: ResponsiveHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1201,
          bgcolor: "#fff",
          boxShadow: 2,
          py: 1,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={logoSrc} alt="Logo" height={42} />
          <Typography
            variant="h6"
            sx={{ ml: 2, fontWeight: 600, display: { xs: "none", sm: "block" } }}
          >
            Jade Paver
          </Typography>
        </Box>

        {/* xs: Menu Icon, sm+: Full menu */}
        {isXs ? (
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{ ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Stack direction="row" spacing={2}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => scrollTo(item.section)}
                sx={{ color: "#353535", fontWeight: 600, fontSize: "1.05rem" }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant="contained"
              color="warning"
              sx={{
                fontWeight: 800,
                fontSize: "1rem",
                px: 4,
                py: 1,
              }}
              href="/paver_cv.pdf"
              download
            >
              DOWNLOAD CV
            </Button>
          </Stack>
        )}
      </Box>

      {/* Drawer for xs screens */}
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": { width: "100%", maxWidth: 420, mx: "auto" }
        }}
      >
        <Toolbar
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <img src={logoSrc} alt="Logo" height={42} />
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List sx={{ my: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => { scrollTo(item.section); setDrawerOpen(false); }}>
                <ListItemText primary={item.label} primaryTypographyProps={{
                  sx: { fontWeight: 600, fontSize: "1.1rem", textAlign: "center" }
                }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Button
            variant="contained"
            color="warning"
            fullWidth
            sx={{ fontWeight: 800, fontSize: "1rem", py: 1 }}
            href="/paver_cv.pdf"
            download
          >
            DOWNLOAD CV
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default ResponsiveHeader;