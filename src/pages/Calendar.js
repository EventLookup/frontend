import "./calendar.css";
import axios from "axios";
import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import {
  BsFillArrowLeftCircleFill,
  BsArrowRightCircleFill,
} from "react-icons/bs";

const datum = new Date();
const wochentag = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];
const day = datum.getDay();
const date = datum.getDate();
const month = datum.getMonth() + 1;
const year = `${datum.getFullYear()}`;
const dateToday = `${date}.${month <= 9 ? `0${month}` : `${month}`}.${year}`;
// {month+1} um 07 2022 zu bekommen
const read_month = `${month <= 9 ? `0${month + 1}` : `${month}`}`;
console.log(month);
console.log(read_month);
console.log(year);

function Calendar() {
  // const url_all = "http://eventlookup.herokuapp.com/events";
  const url_month =
    "http://eventlookup.herokuapp.com/events?month={read_month}&year={year}";
  // const url_day = "http://eventlookup.herokuapp.com/events?day={dateToday}";
  const [events, setEvents] = useState([]);

  useEffect(() => {
    try {
      axios.get(url_month).then((res) => {
        console.log(res.data.events);
        setEvents(res.data.events);
      });
    } catch (err) {
      console.log(err);
      return false;
    }
  }, []);

  return (
    <div className="Calendar">
      <main>
        <section id="SideNav_Cal">
          <div id="SideNav">
            <SideNav />
          </div>
          <div id="h3_Cal">
            <h3>
              <BsFillArrowLeftCircleFill /> {`${wochentag[day]}, ${dateToday}`}{" "}
              <BsArrowRightCircleFill />
            </h3>
            <div id="Cal">
              {events.map((event) => (
                <>
                  <div className="event">
                    {event.host}
                    <br />
                    <p key={event._id}>{event.title}</p>
                  </div>
                </>
              ))}{" "}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default Calendar;
