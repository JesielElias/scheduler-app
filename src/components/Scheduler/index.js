import { useEffect, useState } from "react";

import { ViewState } from '@devexpress/dx-react-scheduler';

import {
   Scheduler,
   DayView,
   WeekView,
   MonthView,
   DateNavigator,
   Appointments,
   ViewSwitcher,
   Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';
import api from "../../service/api";


export default function SchedulerApp({ idRoom }) {
   const [events, setEvents] = useState([]);
   const [data, setData] = useState(new Date());

   const currentDateChange = (value) => {
      setData(value);
   }

   async function loadEvents() {
      api
         .get("event/" + idRoom)
         .then((response) => {
            const arr = response.data.map((r => {
               r.startDate = new Date(r.startDate);
               r.endDate = new Date(r.endDate);
               return r;
            }));
            setEvents(arr);
         })
         .catch((err) => {
            console.log(err);
         });
   }

   useEffect(() => {
      loadEvents();
   }, []);

   return (
      <>
         <Scheduler
            data={events}
            locale={"pt-BR"}
         >
            <ViewState
               currentDate={data}
               onCurrentDateChange={currentDateChange}
               defaultCurrentViewName="Month"
            />
            <DayView
               startDayHour={7}
               endDayHour={22}
            />
            <WeekView
               startDayHour={7}
               endDayHour={22}
            />
            <MonthView
               startDayHour={7}
               endDayHour={22}
            />

            <Toolbar />
            <DateNavigator />
            <Appointments />
            <ViewSwitcher />
         </Scheduler>
      </>
   );
}
