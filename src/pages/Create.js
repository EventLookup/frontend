import "./Create.css"
import { useState } from "react"
import axios from "axios";

const Create = () => {

    const [inputVeranstaltungsName, setInputVeranstaltungsName] = useState("")
    const [inputLocation, setInputLocation] = useState("")
    const [inputDatum, setInputDatum] = useState("")
    const [inputUhrzeit, setInputUhrzeit] = useState("")
    const [inputBeschreibung, setInputBeschreibung] = useState("")
    const [inputStraße, setInputStraße] = useState("")
    const [inputHausnr, setInputHausnr] = useState("")
    const [inputPLZ, setInputPLZ] = useState("")
    const [inputStadt, setInputStadt] = useState("")

    const onChangeHandlerVeranstaltungsName = (e) => {
        setInputVeranstaltungsName(e.target.value)
    }
    const onChangeHandlerLocation = (e) => {
        setInputLocation(e.target.value)
    }
    const onChangeHandlerDatum = (e) => {
        setInputDatum(e.target.value)
    }
    const onChangeHandlerUhrzeit = (e) => {
        setInputUhrzeit(e.target.value)
    }
    const onChangeHandlerBeschreibung = (e) => {
        setInputBeschreibung(e.target.value)
    }
    const onChangeHandlerStraße = (e) => {
        setInputStraße(e.target.value)
    }
    const onChangeHandlerHausnr = (e) => {
        setInputHausnr(e.target.value)
    }
    const onChangeHandlerPLZ = (e) => {
        setInputPLZ(e.target.value)
    }
    const onChangeHandlerStadt = (e) => {
        setInputStadt(e.target.value)
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
      const { data } = await axios.put('https://eventlookup.herokuapp.com/events', {
        title: inputVeranstaltungsName,
        description: inputBeschreibung,
        location: {
            street: inputStraße,
            houseNr: inputHausnr,
            city: inputStadt,
            zip: inputPLZ
        },
        host: inputLocation,
        eventTime: inputUhrzeit, // Uhrzeit darf nicht 06.40 lauten, sondern ohne die 0; Nur 6.40, werde ich versuchen anzupassen im Backend
        eventDate: inputDatum,
        cancelled: false,
        postponed: false,
        website: "frontend-test.de" // Muss in der Form noch abgefragt werden.
        
      }, 
      {
        headers: {
            // achte darauf, das der token nur 20 minuten gültig ist, bei jedem Seitenaufruf sollte auch https://eventlookup.herokuapp.com/refresh
            // aufgerufen werden, wodurch man einen neuen Token erhält und dieser sollte wieder in Context rein um diesen dann bei den 
            // Abfragen wie hier wieder zu haben
            // Unter anderem deshalb ist ein eigener hook sinnvoll um das nicht in jedem Seitenaufruf immer neu schreiben zu müssen
            // kann jedoch nicht sagen wie genau dieser auszusehen hat, habe mir dazu noch keine detailierteren Gedanken gemacht, viel Erfolg
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmE4NTIwNTdhZWM4NjY3MTE1YTE1NDEiLCJuYW1lIjoiRGltYSIsInJvbGVzIjpbNTA1MCwxMTExXSwiaWF0IjoxNjU1OTk1ODQ3LCJleHAiOjE2NTU5OTcwNDd9.o0Ux47-6PTfpYBSFyToz0I6Y5TZWpT9SRjCaYwpway0"
        },
        withCredentials: true
      });
      console.log(data); // Damit kannst du weiter arbeiten, der response lautet hier {msg: 'Event wurde erstellt}
      } catch (error) {
      console.error(error.response.data.errors);
      }

    }

    return ( 
        <div className="create">
            <main>
                <h2>Trage eine Veranstaltung ein</h2>
                <form onSubmit={handleSubmit}>
                    <input onChange={onChangeHandlerVeranstaltungsName} type="text" placeholder="Name der Veranstaltung" required></input>
                    <input onChange={onChangeHandlerLocation} type="text" placeholder="Location" required></input>
                    <input onChange={onChangeHandlerDatum} type="text" placeholder="Datum" required></input>
                    <input onChange={onChangeHandlerUhrzeit} type="text" placeholder="Uhrzeit" required></input>
                    <textarea onChange={onChangeHandlerBeschreibung} placeholder="Beschreibung" required></textarea>
                    <h5>Adresse</h5>
                    <input onChange={onChangeHandlerStraße} type="text" placeholder="Straße" required></input>
                    <input onChange={onChangeHandlerHausnr} type="text" placeholder="Hausnr." required></input>
                    <input onChange={onChangeHandlerPLZ} type="text" placeholder="PLZ" required></input>
                    <input onChange={onChangeHandlerStadt} type="text" placeholder="Stadt" required></input>
                    <button type="submit">Absenden</button>
                </form>
            </main>
        </div>
    );
}

export default Create;