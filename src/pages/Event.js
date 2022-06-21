import { NavLink } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import './Event.css';

const Event = (props) => {
  return (
    <>
      <div className="single-event">
        <section className="back">
          <NavLink to="/" style={{textDecoration: "none"}}>
            <span><IoIosArrowBack /></span>
            <span>zurück</span>
          </NavLink>
        </section>
        <div className="description" style={{border: "1px solid black"}}>
          <time>Datum und Uhrzeit</time>
          <h4>Titel des Events</h4>
          <p>Ort des Events</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus error illo, architecto, in dolorem magnam quidem
            aspernatur tenetur fugiat hic cumque doloremque aliquam ipsam
            ratione itaque reiciendis, nesciunt ipsa. Beatae adipisci
            repudiandae doloremque, veniam, modi incidunt obcaecati blanditiis
            exercitationem possimus labore, maxime pariatur laborum officiis ex
            cum quas voluptate id! Impedit neque nulla deserunt inventore, aut
            magni provident. Velit fuga vitae recusandae voluptatem dignissimos
            esse consectetur itaque, blanditiis nobis ullam consequuntur beatae
            iste vel. Necessitatibus sunt cupiditate sed dignissimos magni sit
            inventore? Exercitationem sed perferendis vero quas sit quia
            incidunt? Sunt sint possimus voluptatem suscipit aut? Voluptatem
            laborum nobis dolore.
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
