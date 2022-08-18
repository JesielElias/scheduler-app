import { AppBar, Typography } from "@mui/material";
import { Container } from "@mui/system";

export default function HeaderApp() {
   return (
      <AppBar position="static">
         <Container maxWidth={"lg"} sx={{ padding: "15px" }}>
            <Typography
               variant="h6"
               noWrap
               component="a"
               href="/"
               sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
               }}
            >
               Agendador
            </Typography>
         </Container>
      </AppBar>
   )
}