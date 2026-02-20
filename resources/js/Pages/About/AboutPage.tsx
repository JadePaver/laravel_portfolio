import DefaultLayout from '@/Layouts/DefaultLayout';
import { Container, Typography } from '@mui/material';

export default function AboutPage() {
    return (
        <DefaultLayout>
            <Container
                sx={{
                    width: "50vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h1" gutterBottom sx={{ fontWeight: 'bold', color: "green" }}>
                    About Page
                </Typography>
            </Container>
        </DefaultLayout>
    );
}
