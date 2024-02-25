import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios";
import { useEffect, useState } from "react";

function Calendar() {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    getEvent();
  }, []);
  const getEvent = async () => {
    try {
      const res = await axios.get("http://localhost:3000/notes");
      if (res) {
        res.data.map((data) => {
          if (data.Calendar) {
            const event = {
              title: data.Title,
              start: data.Date,
              extendedProps: {
                description: data.Description,
                calendar: data.Calendar,
                tasks: data.Tasks,
              },
            };
            setAllEvents((prev) => [...prev, event]);
          }
        });
      }
    } catch (error) {
      console.log("🚀 ~ getEvent ~ error:", error);
    }
  };

  console.log(allEvents);

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