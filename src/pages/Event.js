import { NavLink, useParams } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import {BiLoader} from "react-icons/bi";
import "./Event.css";
import { useEffect } from "react";
import axios from "../api/axios";
import { useState } from "react";

const Event = (props) => {
  const { id } = useParams();
  const [singleEvent, setSingleEvent] = useState("loading");

  useEffect(() => {
    const getSingleEvent = async () => {
      try {
        const res = await axios.get(`/events/${id}`);
        // console.log(res.data);
        setSingleEvent(res.data.event);
        console.log("test: ", res.data.event)
        // console.log(singleEvent);
                
      } catch (err) {
        console.log(err?.response);
        setSingleEvent(null);
      }
    };
    getSingleEvent();
  }, [id]);

  
  return (
    <>
      <div className="single-event">
        <section className="back">
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <span>
              <BsFillArrowLeftCircleFill />
            </span>
            <span>zurück</span>
          </NavLink>
        </section>
        {singleEvent==="loading" ? <BiLoader /> : 
          singleEvent===null? <p>kein Event gefunden</p> : 
          typeof(singleEvent)==="object" ? 
          <div className="description" style={{ border: "1px solid black" }}>
          <time>
            {singleEvent.eventDate} um {singleEvent.eventTime} Uhr
          </time>
          <h4>{singleEvent.title}</h4>
          <p>{singleEvent.host}</p>
          <p>{singleEvent.description}</p>
          <br />
          <p>
            {singleEvent.location.zip} {singleEvent.location.city}
          </p>
          <p>
            {singleEvent.location.street} {singleEvent.location.houseNr}
          </p>
        </div> : setSingleEvent(null)
        }
      </div>
    </>
  );
};

export default Event;
