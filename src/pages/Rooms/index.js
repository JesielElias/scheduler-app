import { Box, Button, Card, CardActionArea, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import AddEventDialog from "../../components/AddEvent";
import api from "../../service/api";

export default function RoomsPage() {
   const [rooms, setRooms] = useState([]);
   const [loading, setLoading] = useState(true);
   const [openDialog, setOpenDialog] = useState(false);

   async function loadRooms() {
      setLoading(true);
      api
         .get("event/rooms")
         .then((response) => {
            setRooms(response.data);
            setLoading(false);
         })
         .catch((err) => {
            console.log(err);
            setLoading(false);
         });
   }

   useEffect(() => {

      loadRooms();

   }, []);

   return (
      <>

         <Container maxWidth={"lg"} sx={{ padding: "40px" }}>
            <Card sx={{ padding: "25px" }}>
               <CardContent>
                  <Grid container justifyContent={"space-between"} sx={{ marginBottom: "30px" }}>
                     <Grid item >
                        <Typography gutterBottom variant="h5" component="div">
                           Salas de reunião
                        </Typography>
                     </Grid>
                     <Grid item>
                        <Button variant="outlined" onClick={() => setOpenDialog(true)}>Agendar sala</Button>
                     </Grid>
                  </Grid>
                  <AddEventDialog open={openDialog} rooms={rooms} setOpen={setOpenDialog} onSuccess={(() => loadRooms())}></AddEventDialog>
                  {loading ? <Box minHeight={"300px"} display="flex" alignItems={"center"} justifyContent="center"><CircularProgress></CircularProgress></Box> : <Grid direction="row" container columnSpacing={2} rowSpacing={2}>
                     {rooms.map((room, index) => {
                        return (
                           <Grid item key={index} xs={3}>
                              <Card variant="outlined">

                                 <CardActionArea component="a" href={`/room/` + room.id} sx={{ padding: "10px", textAlign: "center", borderLeft: room.scheduling ? "7px solid rgba(0, 112, 255, 0.5)" : "7px solid #a2a2a2" }}>
                                    <CardContent >
                                       <Typography gutterBottom variant="subtitle1" component="div">
                                          {room.name}
                                       </Typography>
                                    </CardContent>
                                 </CardActionArea>
                              </Card>
                           </Grid>
                        )
                     })}
                  </Grid>}

               </CardContent>
            </Card>

         </Container>
      </>

   )
}