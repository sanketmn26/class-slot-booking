import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ user, eventsData }) => {
  let events = [];

  if (eventsData) {
    eventsData.map((value) => {
      let event = {
        title: `${value.subject} ${
          user.type === "student" ? "(" + value.name + ")" : ""
        }`,
        start: moment(`${value.date}T${value.timeFrom}`).toDate(),
        end: moment(`${value.date}T${value.timeTo}`).toDate(),
      };
      events.push(event);
    });
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Calendar
        id="calendar"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, width: "90%" }}
      />
    </div>
  );
};

export default MyCalendar;
