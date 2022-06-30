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
let month = datum.getMonth() + 1;
const year = `${datum.getFullYear()}`;

let read_month = `${month <= 9 ? `0${month}` : `${month}`}`;

console.log("month: ", month);
console.log("read_month: ", read_month);
console.log("year: ", year);
// console.log("dateToday: ", dateToday);

function Calendar() {
  
  const [events, setEvents] = useState([]);
  const [day, setDay] = useState(new Date().getDay());
  const [date, setDate] = useState(new Date().getDate());

  const dateToday = `${date}.${month <= 9 ? `0${month}` : `${month}`}.${year}`;

  let url = `http://eventlookup.herokuapp.com/events?day=${dateToday}`;
  // let url2 = `http://eventlookup.herokuapp.com/events`;
  let url3 = `http://eventlookup.herokuapp.com/events?month=${read_month}`;


  function forwardDay(prev) {
    day<6 ? setDay(prev => prev+=1) : setDay(0);
  }
  function forwardDate(elem) {
    date<31 ? setDate(elem => elem+=1) : setDate(1);
  }
  const forwardClick = event => {
    forwardDay();
    forwardDate();
  }

  function backDay(back) {
    day>0 ? setDay(back => back-=1) : setDay(6);
  }
  function backDate(elem) {
    date>1 ? setDate(elem => elem-=1) : setDate(30);
  }
  const backClick = event => {
    backDay();
    backDate();
  }

  useEffect(() => {
    console.log(day);
    axios.get(url).then((res) => {
      console.log(res.data.events);
      setEvents(res.data.events);
    });
  }, []);

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
               {wochentag[day]}, {dateToday}
              <span onClick={forwardClick}>
                <BsArrowRightCircleFill />
              </span>
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
