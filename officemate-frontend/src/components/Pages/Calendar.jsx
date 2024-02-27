import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "./Users/Authprovider";

function Calendar() {
  const [allEvents, setAllEvents] = useState([]);
  const {getUser} = useContext(AuthContext);

  useEffect(() => {
    getEvent();
  }, []);
  const getEvent = async () => {
    try {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + getUser().token
        }
      }
      const res = await axios.get("http://localhost:3000/notes/all",config);

      if (res) {
        const events = []
        res.data.map((data) => {
          if (data.isEvent) {
            const event = {
              title: data.Title,
              start: data.Date,
              extendedProps: {
                description: data.Description,
                tasks: data.Tasks
              },
            };
            events.push(event)
            
          }
        });
        setAllEvents((prev) => events);
      }
    } catch (error) {
      console.log("🚀 ~ getEvent ~ error:", error);
    }
  };


  return (
    <div className="mx-10 mt-8">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "resourceTimelineWook, dayGridMonth,timeGridWeek",
        }}
        events={allEvents}
      />
    </div>
  );
};

export default Calendar;