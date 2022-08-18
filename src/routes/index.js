import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventsPage from "../pages/Events";
import RoomsPage from "../pages/Rooms";
import HeaderApp from "../components/Header";

export default function RouterApp() {
   return (
      <BrowserRouter>
         <HeaderApp></HeaderApp>
         <Routes>

            <Route path="/" element={<RoomsPage />}></Route>
            <Route path="/room/:idRoom" element={<EventsPage></EventsPage>}></Route>
         </Routes>
      </BrowserRouter>
   )
}