import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import "./SignUp.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [organizer, setOrganizer] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [street, setStreet] = useState("");
  const [housenr, setHousenr] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  // error messages
  const [errMsg, setErrMsg] = useState(""); //error from axios
  const [usernameErr, setUsernameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [frontendErr, setFrontendErr] = useState("");

  const [firstnameErr, setFirstnameErr] = useState("");
  const [lastnameErr, setLastnameErr] = useState("");
  const [streetErr, setStreetErr] = useState("");
  const [housenrErr, setHousenrErr] = useState("");
  const [cityErr, setCityErr] = useState("");
  const [zipErr, setZipErr] = useState("");
  //successful registered message
  const [registeredMsg, setRegisteredMsg] = useState("");

  // handlers
  const usernameHandler = (e) => {
    setUsername(e.target.value);
    setUsernameErr("");
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
    setFrontendErr("");
  };
  const organisatorHandler = (e) => {
    organizer === false ? setOrganizer(true) : setOrganizer(false);
    // console.log(organizer);
  };

  const firstnameHandler = (e) => {
    setFirstname(e.target.value);
  };
  const lastnameHandler = (e) => {
    setLastname(e.target.value);
  };
  const streetHandler = (e) => {
    setStreet(e.target.value);
  };
  const housenrHandler = (e) => {
    setHousenr(e.target.value);
  };
  const cityHandler = (e) => {
    setCity(e.target.value);
  };
  const zipHandler = (e) => {
    setZip(e.target.value);
  };
  useEffect(() => {
    setOrganizer(organizer);
  }, [organizer]);

  useEffect(() => {
    // Error updating beim ersten klick
    if (errMsg) {
      if (errMsg.username) {
        setUsernameErr(errMsg.username);
      }
      if (errMsg.email) {
        setEmailErr(errMsg.email);
      }
      if (errMsg.password) {
        setPasswordErr(errMsg.password);
      }
      if(errMsg.firstname){
        setFirstnameErr(errMsg.firstname);
      }
      if(errMsg.lastname){
        setLastnameErr(errMsg.lastname);
      }
      // if(errMsg.address.street){
      //   setStreetErr(errMsg.address.street)
        // console.log( {errMsg:address.street})
      // }
      // if(errMsg.address.houseNr){
      //   setHousenrErr(errMsg.address.houseNr)
      // }
      // if(errMsg.address.city){
      //   setCityErr(errMsg.address.city)
      // }
      // if(errMsg.address.zip){
      //   setZipErr(errMsg.address.zip)
      // }
      console.log(errMsg)
      setRegisteredMsg(registeredMsg);
    }
    setRegisteredMsg(registeredMsg);
  }, [errMsg, registeredMsg]);

  const signUpFunc = async () => {
    try {
      const body = {
        username,
        email,
        password,
        organizer: organizer,
        firstname,
        lastname,
        street,
        housenr,
        city,
        zip,
      };
      const res = await axios({
        method: "post",
        url: "https://eventlookup.herokuapp.com/signup",
        data: body,
      });
      console.log(res.data.msg);
      setRegisteredMsg(res?.data.msg);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.msg);
      setErrMsg(err?.response?.data?.msg);
    }
  };
  const onSignUpHandler = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setFrontendErr("Bitte füllen Sie die Pflichtpfelder aus.");
      if (!username) {
        setFrontendErr(
          "Der Username muss zwischen 3 und 50 Zeichen lang sein."
        );
      } else if (!email) {
        setFrontendErr("Bitte gib eine gültige Email-Adresse an.");
      } else if (!password) {
        setFrontendErr("Das Passwort muss mindestens 10 Zeichen lang sein.");
      }
      return;
    } else {
      await signUpFunc();
    }
  };

  // die errmsg erhalten (Arr) => und durch filter schauen in welchen input der Fehler stattfindet... und dann unter die passende stelle des inputs den Fehler anzeigen lassen

  return (
    <main className="main-signup">
      <form action="" className="form-signup">
        <h2>Registrieren</h2>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Nutzername"
          onChange={usernameHandler}
          required
        />

        <p className="err-msg">{usernameErr}</p>

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={emailHandler}
          required
        />

        <p className="err-msg">{emailErr}</p>

        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Passwort"
          requiredonchange="true"
          onChange={passwordHandler}
        />

        <p className="err-msg">{passwordErr}</p>

        {/* <p className="err-msg">{frontendErr}</p> */}

        <label htmlFor="veranstalter">
          {" "}
          <input
            type="checkbox"
            name="veranstalter"
            id="veranstalter"
            onClick={organisatorHandler}
          />
          Veranstalter
        </label>

        {/* <p className="err-msg">{errMsg}</p> */}

        {organizer && (
          <>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Vorname"
              onChange={firstnameHandler}
              required
            />
            <p className="err-msg">{firstnameErr}</p>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Nachname"
              onChange={lastnameHandler}
              required
            />
            <p className="err-msg">{lastnameErr}</p>
            <input
              type="text"
              name="street"
              id="street"
              placeholder="Straße"
              onChange={streetHandler}
              required
            />
            <p className="err-msg">{console.log(streetErr)}</p>
            <input
              type="text"
              name="housenr"
              id="housenr"
              placeholder="Haus Nr."
              onChange={housenrHandler}
              required
            />
            <p className="err-msg">{housenrErr}</p>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Stadt"
              onChange={cityHandler}
              required
            />
            <p className="err-msg">{cityErr}</p>
            <input
              type="text"
              name="zip"
              id="zip"
              placeholder="Postleitzahl"
              onChange={zipHandler}
              required
            />
            <p className="err-msg">{zipErr}</p>
          </>
        )}
        <button type="submit" onClick={onSignUpHandler}>
          Sign Up
        </button>
        {/* <p className="registered-msg">{registeredMsg}</p> */}
        {registeredMsg && (
          <p className="registered-msg">
            Für {username} wurde ein Benutzerkonto angelegt!
          </p>
        )}
      </form>
    </main>
  );
};

export default Signup;
