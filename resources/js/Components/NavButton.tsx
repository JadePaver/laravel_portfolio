import { Button } from "@mui/material";

interface NavButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export default function NavButton({ children, href, onClick }: NavButtonProps) {
  return (
    <Button
      variant="text"
      href={href}
      onClick={onClick}
      sx={{
        fontFamily: "Poppins, sans-serif",
        color: "black",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "transparent",
          color: "primary.main",
        },
      }}
    >
      {children}
    </Button>
  );
}