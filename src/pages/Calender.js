import "./Calender.css";
import axios from "../api/axios";
import { useEffect, useState, useContext } from "react";
import { FilterContext } from "../context/FilterContext";
import SideNav from "../components/SideNav/SideNav";
import FilterSite from "../components/NavBar/FilterSite"
import {
  BsFillArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsFillCalendarMonthFill,
  BsFillCalendarDateFill,
  BsFillCalendarEventFill,
} from "react-icons/bs";
import { format, addDays, subDays, addMonths, subMonths, getDate } from "date-fns";
import { de } from "date-fns/locale";

/* 
 TODOS im Kalender

 limit 20, 50, 100 +
 page (pagination)
 css styling (Footer)
 semantik +
 console.log() im useEffect entfernen
 err handling, bzw. was soll angezeigt werden wenn an dem Tag keine Events sind oder gar in dem gesamten
 Monat?
*/

const Calendar = () => {
 const {setIsOnCalender} = useContext(FilterContext)
 setIsOnCalender(true);

  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [lookingForDay, setLookingForDay] = useState(true);
  const [eventLimit, setEventLimit] = useState(20);



  const handleAddDate = () => {
    if (lookingForDay) {
      setDate(addDays(date, 1));
    } else {
      setDate(addMonths(date, 1));
    }
  };

  const handleSubDate = () => {
    if (lookingForDay) {
      setDate(subDays(date, 1));
    } else {
      setDate(subMonths(date, 1));
    }
  };

  const handleResetDate = () => {
    setLookingForDay(true);
    setDate(new Date());
  };

  const handleNextDay = () => {
    setLookingForDay(true);
    // setDate(getDate(new Date()));
  }

  const handleResetMonth = () => {
    setLookingForDay(false);
    setDate(new Date());
  };

  const handleEventLimit = (e) => {
    setEventLimit(e.target.value);
  };

  useEffect(() => {
    let url;

    const fetchData = async () => {
      if (lookingForDay) {
        url = `/events?day=${format(date, `dd.MM.yyyy`)}&limit=${eventLimit}`;
      } else {
        url = `/events?month=${format(date, `MM.yyyy`)}&limit=${eventLimit}`;
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
  }, [lookingForDay, date, eventLimit]);

  return (
    <div className="Calendar">
      <main>
        <div id="SideNav_Cal">
          <section id="SideNav">
            <SideNav 
              today={handleResetDate}
              tomorrow={handleNextDay}
              month={handleResetMonth}
              nextMonth={handleAddDate}
            />
          </section>
          <div id="Cal_Date_Cal">
          <section id="Date_Cal">
            <div>
              <FilterSite /> 
              <BsFillArrowLeftCircleFill onClick={handleSubDate} />
              <span id="ausgabe">
                {lookingForDay
                  ? format(date, "EEEE, dd.MM.yyyy", { locale: de })
                  : format(date, "MMMM yyyy", { locale: de })}
              </span>
              <BsArrowRightCircleFill onClick={handleAddDate} />
            </div>
            <div>
              <BsFillCalendarMonthFill
                onClick={() => setLookingForDay(false)}
              />
            </div>
            <div>
              <BsFillCalendarDateFill onClick={() => setLookingForDay(true)} />
            </div>
            <div>
              <BsFillCalendarEventFill onClick={handleResetDate} />
            </div>
            <div>
              <label htmlFor="amount-select">Anzahl der Events: </label>
              <select name="amount" id="amount-select" onChange={handleEventLimit}>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </section>
          <section id="Cal">
            {events.map((event) => (
              <div key={event._id} className="event">
                {event.host}
                <br />
                <p>{event.title}</p>
              </div>
            ))}{" "}
          </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
