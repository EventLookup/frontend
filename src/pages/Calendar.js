import "./calendar.css";
import axios from "axios";
import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";

const datum = new Date();
const wochentag = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
const day = datum.getDay();
const date = datum.getDate();
const month = datum.getMonth()+1;
const year = datum.getFullYear();
const dateToday = `${date}.${
  month<=9?
  `0${month}`:
  `${month}`
}.${year}`;

function Calendar() {
  // const url = 'http://eventlookup.herokuapp.com/events';
  const url2 = 'http://eventlookup.herokuapp.com/events?day={dateToday}';
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(url2).then(res => {
      console.log(res.data.events);
      setEvents(res.data.events);
    })
  },[])

    return (
      <div className="Calendar">
        <main>
        <section id="Sidebar_Cal">
        <SideNav/>
        <div>
        <h2>Calendar today</h2>
        <h3>{`${wochentag[day]}, ${dateToday}`}</h3>
        <div>{events.map( event => <p key={event._id}>{event.title}</p> ) } </div>
        </div>
        </section>
        </main>
        </div>
    );
  }
  export default Calendar;
