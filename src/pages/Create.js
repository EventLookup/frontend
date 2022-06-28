import "./Create.css"
import { useState , useContext} from "react"
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

    //const {token, setToken} = useContext(LoginAuthContext);
    
    const capitalize = (string) => {
        let capitalized = string.charAt(0).toUpperCase() + string.slice(1);
        return capitalized
    }

    let body = {
            title: capitalize(inputVeranstaltungsName),
            description: capitalize(inputBeschreibung),
            location: {
                street: capitalize(inputStraße),
                houseNr: inputHausnr,
                city: capitalize(inputStadt),
                zip: inputPLZ
            },
            host: capitalize(inputLocation),
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

    
    

    const handleSubmit = async (e) => {
        e.preventDefault();

         try{
            const client = await axios.create({
                baseURL: "https://eventlookup.herokuapp.com/events" 
             });
    
             const getEvents = async () => {
                let response = await client.put("", {
                    body
                }, {
                    headers: {
                                authorization: `Bearer ` 
                            },
                            withCredentials: true 
                });
                console.log(response);
             };
             getEvents();
         }catch(err){
            console.error(err)
         }
         
         
    }

    return (
        <div className="create">
            <main>
                <h2>Trage eine Veranstaltung ein</h2>
                <form onSubmit={handleSubmit} action="" method="POST">
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