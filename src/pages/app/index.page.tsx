import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {DateTime} from "luxon"
import "chartjs-adapter-luxon";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Calendar, Event, luxonLocalizer } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartDataLabels
);

const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 0,
      borderRadius: 100,
      // inflateAmount: 2,
      borderSkipped: false,
      pointStyle: ""
    }
  },
  barThickness: 50,
  scales: {
    xAxis: {
      type: "time",
      time: {
        unit: "hour"
      },
      min: "2022-04-08T00:00",
      max: "2022-04-08T23:59",
      grid: {
        borderDash: [5]
      }
    },
    yAxis: {
      display: false,
      stacked: true
    }
  },
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: `Today ${DateTime.now().toLocaleString(DateTime.DATE_FULL)}`
    },
    datalabels: {
      color: "#333",
      display: function (context: any) {
        return context.dataset.backgroundColor !== "#DD3900";
      },
      font: {
        weight: "bold"
      },
      formatter: function () {
        return "Bar title example";
      }
    }
  }
};

const labels = Array.from("a".repeat(2)).map(
  (appt, idx) => `Appointment ${idx + 1}`
);

// const ctx = document.getElementById("canvas").getContext("2d");
// const fillPattern = ctx.createLinearGradient(0, 0, 200, 0);

const data = {
  labels,
  datasets: [
    {
      data: [
        ["2022-04-08T10:00", "2022-04-08T14:00"],
        ["2022-04-08T23:00", "2022-04-09T23:30"]
      ],
      datalabels: {
        align: "end",
        anchor: "start"
      },
      backgroundColor: "#D1E2FF",
      // backgroundColor: fillPattern,
      borderSkipped: "end",
      label: "Ready for Service",
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || "";

            const dates = context.dataset.data.flatMap(
              (appointment: Array<string>) => {
                return appointment.map((date: string) => {
                  return DateTime.fromISO(date).toLocaleString(
                    DateTime.DATETIME_SHORT
                  );
                });
              }
            );

            return `${label}: ${dates[0]} - ${dates[1]}`;
          }
        }
      }
    },
    {
      data: [
        ["2022-04-08T14:00", "2022-04-08T16:00"],
        ["2022-04-09T23:30", "2022-04-09T23:59"]
      ],
      backgroundColor: "#DD3900",
      borderSkipped: "start",
      label: "Deadline Approaching",
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || "";

            const dates = context.dataset.data.flatMap(
              (appointment: Array<string>) => {
                return appointment.map((date: string) => {
                  return DateTime.fromISO(date).toLocaleString(
                    DateTime.DATETIME_SHORT
                  );
                });
              }
            );

            return `${label}: ${dates[0]} - ${dates[1]}`;
          }
        }
      }
    }
  ]
};

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
    style={{ height: "100vh" }}
    popup
    // views={["month", "week", "day"]}
  />
);

const getCurrentMinute = () =>
  new Date().getHours() * 60 + new Date().getMinutes();
const sizePerColumn = 60; // px

const IndexPage = () => {
  const [currentMinute, setCurrentMinute] = React.useState(() =>
    getCurrentMinute()
  );

  React.useEffect(() => {
    let intervalId: number;

    intervalId = setInterval(() => setCurrentMinute(getCurrentMinute), 500);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div className="IndexPage">
      <h1>Dashboard</h1>
      <div style={{ overflowX: "scroll", maxWidth: "100vw" }}>
        <div
          style={{
            // we have 24 hours in a day so:
            // widthOfOneHour x 24 (60px x 24 == 1440)
            width: `${sizePerColumn * 24}px`,
            minHeight: "400px",
            position: "relative"
          }}
        >
          <Bar options={options} data={data} />
          <div
            style={{
              top: 0,
              left: currentMinute,
              width: "3px",
              height: "100%",
              position: "absolute",
              backgroundColor: "blue",
              verticalAlign: "bottom",
              color: "blue"
            }}
          >
            {DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)}
          </div>
        </div>
      </div>
      <h2>Big Calendar</h2>
      <MyCalendar />
    </div>
  );
};

export default IndexPage;
