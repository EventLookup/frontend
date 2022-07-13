import { NavLink, useParams } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import './Event.css';
import { useEffect } from "react";
import axios from "../api/axios";
import { useState } from "react";

const Event = (props) => {
  const { id } = useParams();
  const [event , setEvent] = useState('');

  useEffect( () => {
    const getSingleEvent = async () => {
      try{
        const res = await axios.get(`/events/${id}`)
        console.log(res.data)
        setEvent(res.data.event);
      } catch(err){
        console.log(err?.response)
      }
    }
    getSingleEvent()
  },[id])
  
  return (
    <>
      <div className="single-event">
        <section className="back">
          <NavLink to="/" style={{textDecoration: "none"}}>
            <span><BsFillArrowLeftCircleFill /></span>
            <span>zurück</span>
          </NavLink>
        </section>
        <div className="description" style={{border: "1px solid black"}}>
          <time>{event.eventDate} um {event.eventTime}</time>
          <h4>{event.title}</h4>
          {/* <p>{event.location.city}</p> */}
          <p>
            {event.description}
          </p>
        </div>
        {/* <br />
        <div className="location" style={{border: "1px solid black"}}>
          <h4>Titel des Events</h4>
          <p>Straße und Straßennummer,</p>
          <p>Postleitzahl und Stadt</p>
        </div>
        <br />
        <div className="kommentare" style={{border: "1px solid black"}}>
            kommentare
        </div> */}
      </div>
    </>
  );
};

export default Event;
