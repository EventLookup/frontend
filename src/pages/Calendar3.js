import "./calendar.css";
import axios from "axios";
import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import {
  BsFillArrowLeftCircleFill,
  BsArrowRightCircleFill,
} from "react-icons/bs";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [day, setDay] = useState(new Date().getDay());

  useEffect(() => {
    console.log(day);
  }, []);

  return (
    <div className="Calendar">
      <main>
        {console.log("main: ", day)}
        <section id="SideNav_Cal">
          <div id="SideNav">
            <SideNav />
          </div>
          <div id="h3_Cal">
            <h3>
              <div onClick={() => setDay((prev) => prev>0 ? prev-=1 : prev=6)}>
                <BsFillArrowLeftCircleFill />
              </div>
              <div onClick={() => setDay((prev) => prev<6 ? prev+=1 : prev=0)}>
                <BsArrowRightCircleFill />
              </div>
            </h3>
            <div id="Cal" style={{color: "white"}}>{day}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default Calendar;
