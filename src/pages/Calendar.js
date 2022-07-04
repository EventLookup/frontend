import "./calendar.css";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import {
  BsFillArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsFillCalendarMonthFill,
  BsFillCalendarDateFill
} from "react-icons/bs";
import wochentag from "../helpers/weekdays";
import {forwardDate, forwardDay} from "../helpers/calenderDateFunctions";

const datum = new Date();
const year = `${datum.getFullYear()}`;
const month = datum.getMonth() + 1;
const read_month = `${month <= 9 ? `0${month}` : `${month}`}`;

console.log("month: ", month);
console.log("read_month: ", read_month);
console.log("year: ", year);

function Calendar() {
  const [events, setEvents] = useState([]);
  const [day, setDay] = useState(new Date().getDay());
  const [date, setDate] = useState(new Date().getDate());

  const forwardClick = (event) => {
    forwardDay(day, setDay);
  forwardDate(date, setDate);
    setUrl(`/events?day=${date+1 <= 9 ? `0${date+1}` : `${date+1}`}.${read_month}.${year}`);
  };

  function backDay(back) {
    day > 0 ? setDay((back) => (back -= 1)) : setDay(6);
  }
  function backDate(elem) {
    date > 1 ? setDate((elem) => (elem -= 1)) : setDate(30);
  }
  const backClick = (event) => {
    backDay();
    backDate();
    setUrl(`/events?day=${date-1 <= 9 ? `0${date-1}` : `${date-1}`}.${read_month}.${year}`);
  };

  let dateToday = `${date <= 9 ? `0${date}` : `${date}`}.${read_month}.${year}`;
  console.log("dateToday: ", dateToday);

  // let dayOrMonth = `day=${dateToday}`;
  // console.log(dayOrMonth);

  const [dayOrMonth, setDayOrMonth] = useState(`day=${dateToday}`);

  const [url, setUrl] = useState(
    `/events?${dayOrMonth}`
    // `/events?day=01.07.2022`
  );

  function showMonth() {
    // dayOrMonth = `month=${read_month}`;
    setUrl(prev => `/events?${dayOrMonth}`);
    setDayOrMonth(prev => `month=${read_month}`);
    console.log(url);
  }

  function showDay() {
    // dayOrMonth = `day=${dateToday}`;
    setUrl(prev => `/events?${dayOrMonth}`);
    setDayOrMonth(prev => `day=${dateToday}`);
    console.log(url);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        console.log(res.data.events);
        console.log("url: ", url);
        setEvents(res.data.events);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [url]);


  return (
    <div className="Calendar">
      <main>
        {console.log("wochentag: ", day)}
        {console.log("datum: ", date)}
        <section id="SideNav_Cal">
          <div id="SideNav">
            <SideNav />
          </div>
          <div id="h3_Cal">
            <h3>
              <span onClick={backClick}>
                <BsFillArrowLeftCircleFill />
              </span>
              <span id="ausgabe">
              {wochentag[day]}, {dateToday}
              </span>
              <span onClick={forwardClick}>
                <BsArrowRightCircleFill />
              </span>
            </h3>
            <h3 onClick={showMonth}>
              <BsFillCalendarMonthFill />
            </h3>
            <h3 onClick={showDay}>
              <BsFillCalendarDateFill />
            </h3>
            <div id="Cal">
              {events.map((event) => (
                <div key={event._id} className="event">
                  {event.host}
                  <br />
                  <p>{event.title}</p>
                </div>
              ))}{" "}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default Calendar;
