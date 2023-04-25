import React from "react";
import {DateTime} from "luxon"

import { Calendar, Event, luxonLocalizer } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.scss";
import { Box } from "@mui/material";

// const ctx = document.getElementById("canvas").getContext("2d");
// const fillPattern = ctx.createLinearGradient(0, 0, 200, 0);


const localizer = luxonLocalizer(DateTime);
const myEventsList: Event[] = [
  {
    title: "All Day Event very long title",
    start: new Date("2022-04-08T10:00"),
    end: new Date("2022-04-09T17:00"),
    resource: "test"
  },
  {
    title: "Long Event",
    start: new Date("2022-04-08T23:00"),
    end: new Date("2022-04-08T23:39")
  },
  {
    title: "Long Event 2",
    start: new Date("2022-04-08T23:00"),
    end: new Date("2022-04-10T23:39")
  },
  {
    title: "Long Event 3",
    start: new Date("2022-04-08T23:00"),
    end: new Date("2022-04-08T23:39")
  },
  {
    title: "Long Event 4",
    start: new Date("2022-04-08T23:00"),
    end: new Date("2022-04-08T23:39")
  },
  {
    title: "Long Event 5",
    start: new Date("2022-04-08T23:00"),
    end: new Date("2022-04-08T23:39")
  }
];

const MyCalendar = () => (
  <Calendar
    localizer={localizer}
    events={myEventsList}
    startAccessor="start"
    endAccessor="end"
    // defaultView="day"
    style={{ height: "80vh" }}
    popup
    // views={["month", "week", "day"]}
  />
);


const IndexPage = () => {

  return (
    <Box className="IndexPage" >
      <MyCalendar />
    </Box>
  );
};

export default IndexPage;
