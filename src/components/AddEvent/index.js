import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, List, ListItem, ListItemText, TextField, useStepContext, } from "@mui/material";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Box } from "@mui/system";
import ptBrLocal from 'date-fns/locale/pt-BR';
import axios from "axios";
import { addMinutes, format } from "date-fns";
import AlertMui from '@mui/material/Alert';
import api from "../../service/api";

export default function AddEventDialog(props) {
   const { open, setOpen, rooms, onSuccess } = props;

   const [title, setTitle] = useState('');
   const [room, setRoom] = useState(null);
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date());
   const [error, setError] = useState(null);
   const [itemsError, setItemsErros] = useState([]);


   useEffect(() => {
      setTitle('');
      setStartDate(new Date());
      setEndDate(addMinutes(new Date(), 30));
      setRoom(null);
      setError(null);
      setItemsErros([]);
   }, [open]);

   const handleCancel = () => {
      setOpen(false);
   };

   function handleSubmit(e) {
      console.log('submit');
      e.preventDefault();


      if (startDate > endDate)
         setError("Data final não pode ser menor que a data inicial");
      else if (startDate === endDate)
         setError("Selecione um intervalo válido de agendamento");
      else {
         api
            .post("event", {
               title: title,
               idRoom: room.id,
               startDate: format(startDate, "yyyy-MM-dd'T'HH:mm:00'Z'"),
               endDate: format(endDate, "yyyy-MM-dd'T'HH:mm:00'Z'")
            })
            .then((r) => {
               setOpen(false);

               if (onSuccess != null)
                  onSuccess();
            })
            .catch((error) => {
               console.log(error.response.data.message);
               setError(error.response.data.message);
               if (error.response.data.items != null)
                  setItemsErros(error.response.data.items);
               else
                  setItemsErros([]);
            });

      }

   }

   return (
      <Dialog open={open} fullWidth={true}
         maxWidth={"sm"}>
         <DialogTitle>Novo evento</DialogTitle>
         <Box
            component={"form"}
            onSubmit={handleSubmit}
         >
            <DialogContent sx={{ paddingTop: "25px" }}>

               <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBrLocal}>
                  <Grid container columnSpacing={3} rowSpacing={3}>
                     <Grid item xs={12}>
                        <TextField
                           required
                           id="title"
                           label="Título"
                           fullWidth
                           variant="standard"
                           value={title}
                           onChange={(event) => setTitle(event.target.value)}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <Autocomplete
                           id="select-room"
                           fullWidth
                           required
                           value={room}
                           onChange={(event, newValue) => {
                              setRoom(newValue);
                           }}
                           options={rooms}
                           autoHighlight
                           getOptionLabel={(option) => option.name}
                           renderOption={(props, option) => (
                              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                 {option.name}
                              </Box>
                           )}
                           renderInput={(params) => (
                              <TextField
                                 variant="standard"
                                 {...params}
                                 label="Selecione a sala"
                                 required
                                 inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                 }}
                              />
                           )}
                        />
                     </Grid>
                     <Grid item xs={6}>
                        <DateTimePicker
                           label="Data inicial"
                           for
                           renderInput={(params) => <TextField required variant="standard" {...params} />}
                           value={startDate}
                           onChange={(newValue) => {
                              setStartDate(newValue);
                           }}
                        />
                     </Grid>
                     <Grid item xs={6}>
                        <DateTimePicker
                           label="Data final"
                           renderInput={(params) => <TextField required variant="standard" {...params} />}
                           value={endDate}
                           onChange={(newValue) => {
                              setEndDate(newValue);
                           }}
                        />
                     </Grid>
                     {error &&
                        <Grid item xs={12}>
                           <AlertMui severity="error">
                              {error}
                              {itemsError.length > 0 &&
                                 <List>
                                    {itemsError.map((item) => {
                                       console.log(item);
                                       return (
                                          < ListItem >
                                             <ListItemText primary={item}></ListItemText>
                                          </ListItem>
                                       )

                                    })}
                                 </List>
                              }

                           </AlertMui>
                        </Grid>
                     }
                  </Grid>
               </LocalizationProvider>

            </DialogContent>
            <DialogActions>
               <Button onClick={handleCancel}>Cancelar</Button>
               <Button type="submit">Confirmar</Button>
            </DialogActions>
         </Box>
      </Dialog >
   );
}

AddEventDialog.propTypes = {
   rooms: PropTypes.array.isRequired,
   setOpen: PropTypes.func.isRequired,
   open: PropTypes.bool.isRequired,
   onSuccess: PropTypes.func
};