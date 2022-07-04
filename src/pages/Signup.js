import { useEffect } from "react";
import { useState } from "react";
import axios from "../api/axios";

import "./SignUp.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizer, setOrganizer] = useState(false);
  const [adress, setAdress] = useState("");
  const [fullname, setFullname] = useState("");
  // error messages 
  const [errMsg, setErrMsg] = useState(""); //error from axios
  const [usernameErr , setUsernameErr] = useState(""); 
  const [emailErr , setEmailErr] = useState(""); 
  const [passwordErr , setPasswordErr] = useState("");
  const [frontendErr , setFrontendErr] = useState("");
  //successful registered message
  const [registeredMsg , setRegisteredMsg] = useState("");

  // handlers
  const usernameHandler = (e) => {
    setUsername(e.target.value);
    setUsernameErr('');
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    setEmailErr('');
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setPasswordErr('');
    setFrontendErr('');
  };
  const organisatorHandler = (e) => {
    organizer === false ? setOrganizer(true) : setOrganizer(false);
    console.log(organizer);
  };
  const adressHandler = (e) => {
    setAdress(e.target.value);

  }
  const fullnameHandler = (e) => {
    setFullname(e.target.value);
  }
  useEffect(()=> {
    setOrganizer(organizer);
    console.log("organizer im useeffect",organizer);
  }, [organizer])
 
  useEffect( () => {
    // Error updating beim ersten klick
    if(errMsg) {
      console.log(errMsg);
      // Username error ============
      const userErr = errMsg.find((obj) => obj.param === "username");
      if(userErr){
        console.log(userErr)
      }
      // Email error ==========
      const emailErr = errMsg.find( (obj) => obj.param === "email");
      if(emailErr){
        console.log(emailErr)
      }
      // Password error =======
      const passwordErr = errMsg.find( (obj) => obj.param === "password");
      console.log(passwordErr)


      if(passwordErr){
        const passwordErrMsgString = passwordErr?.msg;
        console.log("passwordErrMsgString" ,passwordErrMsgString);
        setPasswordErr(passwordErrMsgString);
        console.log(passwordErrMsgString);
      }
      if(emailErr){
        const emailErrMsgString = emailErr?.msg;
        setEmailErr(emailErrMsgString);
        console.log(emailErrMsgString);
      } 
      if(userErr){
        const userErrMsgString = userErr?.msg;
        setUsernameErr(userErrMsgString);
        console.log("userErrMsgString",userErrMsgString)
      }
    }
    setRegisteredMsg(registeredMsg);
  }, [errMsg , registeredMsg]);

  // useEffect( () => {
  //   if(registeredMsg){
  //     const registeredMsgString = registeredMsg.find((obj) => obj === "msg");
  //     setRegisteredMsg(registeredMsgString);
  //     console.log(registeredMsg)
  //   }
  // }, [registeredMsg]);

 
  const signUpFunc = async () => {
    try {
      const res = await axios.post(
        "/signup",
        {
          username,
          email,
          password,
          organizer: organizer,
          adress,
          fullname,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setRegisteredMsg(res?.data)
    } catch (err) {
      console.log(err);
      setErrMsg(err?.response?.data?.errors)
      // console.log(errMsg);
      // console.log(err.response); //allgemeiner error
      // setErrMsg(err.response.data.errors[1].msg); //error msg
      // setErrMsg(err.response.data.errors); //alle error msgs
      // console.log(errMsg);
      // versuch1

    }
  };
  const onSignUpHandler = (e) => {
    if (!username || !email || !password) {
      setFrontendErr('Bitte füllen Sie die Pflichtpfelder aus.')
      if(!username){
        setFrontendErr('Der Username muss zwischen 3 und 50 Zeichen lang sein.');
      } else if(!email){
        setFrontendErr('Bitte gib eine gültige Email-Adresse an.');
      } else if(!password){
        setFrontendErr('Das Passwort muss mindestens 10 Zeichen lang sein.');
      } else if(organizer && !adress){
        // wartet auf das backend
        setFrontendErr("Bitte tragen sie Ihre Adresse ein.")
        return;
      } else if(organizer && !fullname) {
        setFrontendErr("Bitte tragen Sie Ihren vollständigen Namen ein.")
      }
      return;
    } else {
      signUpFunc();
      e.preventDefault();
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

        <p className="err-msg">{frontendErr}</p>

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

        {organizer && (
          <>
            <input
              type="text"
              name="adress"
              id="adress"
              placeholder="Adresse"
              onChange={adressHandler}
            />
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Vollständiger Name"
              onChange={fullnameHandler}
            />
          </>
        )}
        <button type="submit" onClick={onSignUpHandler}>
          Sign Up
        </button>
        {/* <p className="registered-msg">{registeredMsg}</p> */}
        {registeredMsg && (<p className="registered-msg">Für {username} wurde ein Benutzerkonto angelegt!</p>)}
      </form>
    </main>
  );
};

export default Signup;
