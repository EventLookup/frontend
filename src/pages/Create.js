import "./Create.css"
import { useState , useEffect } from "react"
import axios from "../api/axios";
import { createGetAndSetRefreshToken } from "../util/tokenFunctions";

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

    let body = {
            title: inputVeranstaltungsName,
            description: inputBeschreibung,
            location: {
                street: inputStraße,
                houseNr: inputHausnr,
                city: inputStadt,
                zip: inputPLZ
            },
            host: inputLocation,
            eventTime: inputUhrzeit,
            eventDate: inputDatum,
            cancelled: false,
            postponend: false,
            participants: [],
            website: ""

        }

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


    useEffect(() => {
      
      createGetAndSetRefreshToken()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          let response = await axios.put("/events", {
              body
            }, 
            {
              withCredentials: true 
            }
          );
          console.log(response);
        } catch (error) {
          // mit dem error objekt muss man im frontend weiter arbeiten und fehler ausgeben
          // hier mach ich das erstmal nur mit einem console.error
          console.error(error);
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