import "./Calender.css";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import SideNav from "../components/SideNav/SideNav";
import FilterSite from "../components/SideNav/FilterSite";
import {
  BsFillArrowLeftCircleFill,
  BsArrowRightCircleFill,
  // BsFillCalendarMonthFill,
  // BsFillCalendarDateFill,
  // BsFillCalendarEventFill,
} from "react-icons/bs";
import { format, addDays, subDays, addMonths, subMonths } from "date-fns";
import { de } from "date-fns/locale";
import { NavLink } from "react-router-dom";
// import { BuildCityProvider } from "../context/CityContext";

/* 
 TODOS im Kalender

 limit 20, 50, 100 +
 page (pagination)
 css styling (Footer) +
 semantik +
 console.log() im useEffect entfernen
 err handling, bzw. was soll angezeigt werden wenn an dem Tag keine Events sind oder gar in dem gesamten
 Monat?
*/

const Calendar = () => {
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
    setDate(addDays(new Date(), 1));
  };

  const handleNextMonth = () => {
    setLookingForDay(false);
    setDate(addMonths(new Date(), 1));
  };

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
        {/* <BuildCityProvider> */}
        <div id="SideNav_Cal">
          <section id="SideNav">
            <SideNav
              today={handleResetDate}
              tomorrow={handleNextDay}
              month={handleResetMonth}
              nextMonth={handleNextMonth}
              city=""
            />
          </section>
          <div id="Cal_Date_Cal">
            <section id="Date_Cal">
              <div>
                <FilterSite
                  today={handleResetDate}
                  tomorrow={handleNextDay}
                  month={handleResetMonth}
                  nextMonth={handleNextMonth}
                  city=""
                />
                <BsFillArrowLeftCircleFill onClick={handleSubDate} />
                <span id="ausgabe">
                  {lookingForDay
                    ? format(date, "EEEE, dd.MM.yyyy", { locale: de })
                    : format(date, "MMMM yyyy", { locale: de })}
                </span>
                <BsArrowRightCircleFill onClick={handleAddDate} />
              </div>
              <div>
                <label htmlFor="amount-select">Anzahl der Events: </label>
                <select
                  name="amount"
                  id="amount-select"
                  onChange={handleEventLimit}
                >
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </section>
            <section id="Cal">
              {events.length === 0 ? (
                <p>keine Events vorhanden</p>
              ) : (
                events.map((event) => (
                  <NavLink to="/event" key={event._id} state={events}>
                    <div className="event">
                      {event.host}
                      <br />
                      <p>{event.title}</p>
                    </div>
                  </NavLink>
                ))
              )}{" "}
            </section>
          </div>
        </div>
        {/* </BuildCityProvider> */}
      </main>
    </div>
  );
};

export default Calendar;
