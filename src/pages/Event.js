import { NavLink, useParams } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import {BiLoader} from "react-icons/bi";
import "./Event.css";
import { useEffect, useContext } from "react";
import { LoginAuthContext } from "../context/LoginAuthContext";
import axios from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Event = (props) => {
  const { id } = useParams();
  const [singleEvent, setSingleEvent] = useState("loading");
  const {loggedIn} = useContext(LoginAuthContext);
  const navigate = useNavigate();
  const [eingabe, setEingabe] = useState("");

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

  const navigiereOderEingabe = (event) => {
    event.preventDefault();
    !loggedIn ? (
      navigate('/Login')
      ) : (
    setEingabe(event.target.value)
      )
  }

  
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
        <div className="input">
          <p>Verabredet euch hier (Login erforderlich):</p>
          <form onSubmit={navigiereOderEingabe}>
            <textarea onChange={(event) => setEingabe(event.target.value)
            }></textarea>
            <input type="submit"></input>
          </form>
        </div>
        <div className="output">{eingabe}</div>
      </div>
    </>
  );
};

export default Event;
