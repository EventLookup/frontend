import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { LoginAuthContext } from "../context/LoginAuthContext";
import "./Create.css";

const Create = () => {
  const { token, setToken } = useContext(LoginAuthContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "https://eventlookup.herokuapp.com/refresh"
        )
        setToken(res.data.accessToken)
      } catch (err) {
        // err.response.data.errors
        console.error(err);
      }
    };
    getData()
  }, []);

  return (
    <div className="create">
      <main>
        <h2>Trage eine Veranstaltung ein</h2>
        <form>
          <input type="text" placeholder="Name der Veranstaltung"></input>
          <input type="text" placeholder="Location"></input>
          <input type="text" placeholder="Datum"></input>
          <input type="text" placeholder="Uhrzeit"></input>
          <textarea placeholder="Beschreibung"></textarea>
          <h5>Adresse</h5>
          <input type="text" placeholder="Straße"></input>
          <input type="text" placeholder="Hausnr."></input>
          <input type="text" placeholder="PLZ"></input>
          <input type="text" placeholder="Stadt"></input>
          <button type="submit">Absenden</button>
        </form>
      </main>
    </div>
  );
};

export default Create;
