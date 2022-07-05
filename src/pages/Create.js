import "./Create.css"
import { useState , useEffect, useContext } from "react"
import axios from "../api/axios";
import useAuth from '../hooks/useAuth';
import { AuthContext } from "../context/LoginAuthContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate();
    const { setAuthOption } = useAuth();
    const { loggedIn } = useContext(AuthContext);

    const [inputVeranstaltungsName, setInputVeranstaltungsName] = useState("")
    const [inputLocation, setInputLocation] = useState("")
    const [inputDatum, setInputDatum] = useState("")
    const [inputUhrzeit, setInputUhrzeit] = useState("")
    const [inputBeschreibung, setInputBeschreibung] = useState("")
    const [inputStraße, setInputStraße] = useState("")
    const [inputHausnr, setInputHausnr] = useState("")
    const [inputPLZ, setInputPLZ] = useState("")
    const [inputStadt, setInputStadt] = useState("")
    const [inputEmail, setInputEmail] = useState("")

    const[message, setMessage] = useState("");

    const [errors , setErrors] = useState("")
    
    const capitalize = (string) => {
        let capitalized = string.charAt(0).toUpperCase() + string.slice(1);
        return capitalized
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
    const onChangeHandlerEmail = (e) => {
        setInputEmail(e.target.value)
    }


    useEffect(() => {
      if(!loggedIn){
         navigate('/login')
      }
      setAuthOption('refresh');
    }, [loggedIn]);

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
        postponed: false,
        participants: [],
        website: inputEmail

    }

    const handleSubmit = async (e) => {
        setMessage("");
        setErrors("")
        e.preventDefault();
        try {
          let response = await axios.put("/events",
              body
            , 
            {
              withCredentials: true 
            }
          );
          console.log(response);
          setMessage(response.data.msg)
        } catch (error) {
          // mit dem error objekt muss man im frontend weiter arbeiten und fehler ausgeben
          // hier mach ich das erstmal nur mit einem console.error
          console.error(error?.response?.data?.errors);
          if(error.response) setErrors(error.response.data.msg);
          
        }
        console.log(errors)
    }

    return (
      loggedIn &&
        <div className="create">
            <main>
                <h2>Trage eine Veranstaltung ein</h2>
                <form onSubmit={handleSubmit}>
                    <input onChange={onChangeHandlerVeranstaltungsName} type="text" placeholder="Name der Veranstaltung" ></input>
                    {errors.title && <h5 className="error-message">{errors.title}</h5>}
                    <input onChange={onChangeHandlerLocation} type="text" placeholder="Location" ></input>
                    {errors.host && <h5 className="error-message">{errors.host}</h5>}
                    <input onChange={onChangeHandlerDatum} type="text" placeholder="Datum" ></input>
                    <input onChange={onChangeHandlerUhrzeit} type="text" placeholder="Uhrzeit" ></input>
                    {errors.eventTime && <h5 className="error-message">{errors.eventTime}</h5>}
                    <textarea onChange={onChangeHandlerBeschreibung} placeholder="Beschreibung" ></textarea>
                    <input onChange={onChangeHandlerEmail} type="text" placeholder="Email (Optional)" ></input>
                    <h5>Adresse</h5>
                    <input onChange={onChangeHandlerStraße} type="text" placeholder="Straße" ></input>
                    {errors.street && <h5 className="error-message">{errors.street}</h5>}
                    <input onChange={onChangeHandlerHausnr} type="text" placeholder="Hausnr." ></input>
                    {errors['location.houseNr'] && <h5 className="error-message">{errors['location.houseNr']}</h5>}
                    <input onChange={onChangeHandlerPLZ} type="text" placeholder="PLZ" ></input>
                    {errors['location.zip'] && <h5 className="error-message" >{errors['location.zip']}</h5>}
                    <input onChange={onChangeHandlerStadt} type="text" placeholder="Stadt" ></input>
                    {errors.city && <h5 className="error-message">{errors.city}</h5>}
                    <button type="submit">Absenden</button>
                    <h5 style= {{color: "green"}}>{message}</h5>
                </form>
                
            </main>
            
        </div>
    );
}

export default Create;