import "./Calender.css";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import {
  BsFillArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsFillCalendarMonthFill,
  BsFillCalendarDateFill,
  BsFillCalendarEventFill
} from "react-icons/bs";
import { 
  format,
  addDays,
  subDays,
  addMonths,
  subMonths
} from 'date-fns';
import { de } from 'date-fns/locale'

/* 
 TODOS im Kalender

 limit 20, 50, 100
 page (pagination)
 css styling
 semantik
 console.log() im useEffect entfernen
 err handling, bzw. was soll angezeigt werden wenn an dem Tag keine Events sind oder gar in dem gesamten
 Monat?
*/

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [lookingForDay, setLookingForDay] = useState(true);


  const handleAddDate = () => {
    if(lookingForDay){
      setDate(addDays(date, 1));
    } else {
      setDate(addMonths(date, 1));
    }
  }

  const handleSubDate = () => {
    if(lookingForDay){
      setDate(subDays(date, 1));
    } else {
      setDate(subMonths(date, 1));
    }
  }

  const handleResetDate = () => {
    setLookingForDay(true);
    setDate(new Date());
  }

  useEffect(() => {
    let url;

    const fetchData = async () => {
      if(lookingForDay){
        url = `/events?day=${format(date, `dd.MM.yyyy`)}`
      } else {
        url = `/events?month=${format(date, `MM.yyyy`)}`
      }

      console.log(url);

      try {
        const res = await axios.get(url);
        setEvents(res.data.events);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [lookingForDay, date]);

  return (
    <div className="Calendar">
    <main>
      <section id="SideNav_Cal">
        <div id="SideNav">
          <SideNav />
        </div>
        <div id="h3_Cal">
          <h3>
              <BsFillArrowLeftCircleFill onClick={ handleSubDate } />
            <span id="ausgabe">
              {
                lookingForDay ? 
                  format(date, 'EEEE, dd.MM.yyyy', { locale: de })
                : format(date, 'MMMM yyyy', { locale: de })
              }
            </span>
              <BsArrowRightCircleFill onClick={ handleAddDate } />
          </h3>
          <h3>
            <BsFillCalendarMonthFill onClick={ () => setLookingForDay(false)}/>
          </h3>
          <h3>
            <BsFillCalendarDateFill onClick={ () => setLookingForDay(true)}/>
          </h3>
          <h3>
            <BsFillCalendarEventFill onClick={ handleResetDate } />
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