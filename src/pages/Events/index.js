import { Container, Grid, Card, CardContent, Button } from "@mui/material";
import SchedulerApp from "../../components/Scheduler";
import { useParams } from 'react-router-dom';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';



export default function EventsPage() {
   const { idRoom } = useParams();

   return (
      <Container maxWidth={"xl"} sx={{ padding: "40px" }}>
         <Card>
            <CardContent>
               <Button component="a" href="/" variant="text" startIcon={<KeyboardArrowLeftOutlinedIcon />}>
                  Voltar
               </Button>
               <Grid justifyContent={"center"} minHeight="90vh" direction="column" container>
                  {idRoom && <SchedulerApp idRoom={idRoom} ></SchedulerApp>}
               </Grid>
            </CardContent>
         </Card>
      </ Container >
   )
}