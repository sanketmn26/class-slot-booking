import React, { useEffect } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { useContext, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import MyCalendar from "./Calendar";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  // state to rerender commponent
  const [state, setState] = useState(1);

  // events from database
  const [eventsData, setEventsData] = useState();

  // event data from user to save in database
  const [event, setEvent] = useState({
    name: user.name,
    subject: "",
    timeFrom: "",
    timeTo: "",
    date: "",
  });

  // function for creation time slot event
  const createEvent = async () => {
    console.log(event);
    await axios
      .post(`http://localhost:5001/event`, {
        name: String(event.name),
        subject: String(event.subject),
        timeFrom: String(event.timeFrom),
        timeTo: String(event.timeTo),
        date: String(event.date),
      })
      .then(
        (res) => res.data,
        (err) => console.log(err)
      );
    setEvent({
      ...event,
      subject: "",
    });
    setState(state + 1);
  };

  // function to get events for teacher dashboard
  const teacherEvents = async () => {
    let data;
    await axios
      .get("http://localhost:5001/events", { params: { name: event.name } })
      .then(
        (res) => {
          data = res.data;
        },
        (err) => console.log(err)
      );
    setEventsData(data);
  };

  // function to get events for student dashboard
  const studentEvents = async () => {
    let data;
    await axios
      .get("http://localhost:5001/events", {
        params: { subject: event.subject },
      })
      .then(
        (res) => {
          data = res.data;
        },
        (err) => console.log(err)
      );
    setEventsData(data);
  };

  useEffect(() => {
    if (user.type === "teacher") teacherEvents();
  }, [state]);

  return (
    <>
      <Box
        id="dashboard"
        width="90%"
        p="1rem"
        m="1.5rem auto"
        borderRadius="1rem"
        sx={{ boxShadow: "0px 1px 15px #858585" }}
      >
        {/* Student Dashboard */}
        {user.type === "student" && (
          <>
            <Typography
              width="100%"
              textAlign="center"
            >{`(Student) ${user.name}`}</Typography>

            <Box display="grid" width="200px" m="1rem auto">
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">subject</InputLabel>
                <Select
                  label="subject"
                  labelId="demo-simple-select-label"
                  name="subject"
                  value={event.subject}
                  onChange={(e) => {
                    setEvent({ ...event, subject: e.target.value });
                  }}
                  required
                >
                  <MenuItem value="Maths">Maths</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                </Select>
                <Button
                  onClick={studentEvents}
                  fullWidth
                  variant="contained"
                  sx={{ marginY: "1rem" }}
                >
                  Show
                </Button>
              </FormControl>
            </Box>
          </>
        )}

        {/* Teacher Dashboard */}
        {user.type === "teacher" && (
          <>
            <Typography
              width="100%"
              textAlign="center"
            >{`(Teacher) ${user.name}`}</Typography>
            <Box display="grid" width="200px" m="1rem auto">
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">subject</InputLabel>
                <Select
                  width="200px"
                  label="subject"
                  labelId="demo-simple-select-label"
                  name="subject"
                  value={event.subject}
                  onChange={(e) => {
                    setEvent({ ...event, subject: e.target.value });
                  }}
                  required
                >
                  <MenuItem value="Maths">Maths</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                </Select>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    disablePast
                    sx={{ marginY: "10px" }}
                    onChange={(value) => {
                      setEvent({
                        ...event,
                        date: moment(value).format("YYYY-MM-DD"),
                      });
                    }}
                  />

                  <TimePicker
                    label="From"
                    onChange={(value) => {
                      setEvent({
                        ...event,
                        timeFrom: moment(value).format("HH:mm:ss"),
                      });
                    }}
                  />

                  <TimePicker
                    sx={{ marginY: "10px" }}
                    label="To"
                    onChange={(value) => {
                      setEvent({
                        ...event,
                        timeTo: moment(value).format("HH:mm:ss"),
                      });
                    }}
                  />
                </LocalizationProvider>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ marginY: "1rem" }}
                  onClick={createEvent}
                >
                  Set
                </Button>
              </FormControl>
            </Box>
          </>
        )}

        <MyCalendar user={user} eventsData={eventsData} />
      </Box>
    </>
  );
};

export default Dashboard;
