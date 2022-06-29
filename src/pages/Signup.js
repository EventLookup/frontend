import { useEffect } from "react";
import { useState } from "react";
import axios from "../api/axios";

import "./SignUp.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organisator, setOrganisator] = useState(false);
  const [adress, setAdress] = useState("");
  const [fullname, setFullname] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [usernameErr , setUsernameErr] = useState("");
  const [emailErr , setEmailErr] = useState("");
  const [passwordErr , setPasswordErr] = useState("");
  const [generallErr , setGenerallErr] = useState('');

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
    setGenerallErr('');
  };
  const organisatorHandler = (e) => {
    organisator === false ? setOrganisator(true) : setOrganisator(false);
  };

  const signUpFunc = async () => {
    try {
      const res = await axios.post(
        "/signup",
        {
          username,
          email,
          password,
          organisator,
          adress,
          fullname,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (err) {
      setErrMsg(err?.response?.data?.errors)
      console.log(errMsg);
      // console.log(err.response); //allgemeiner error
      // setErrMsg(err.response.data.errors[1].msg); //error msg
      // setErrMsg(err.response.data.errors); //alle error msgs
      // console.log(errMsg);
      // versuch1
      if(errMsg) {
        // Username error ============
        const userErr = errMsg.find((obj) => obj.param === "username");
        console.log(userErr)
        // Email error ==========
        const emailErr = errMsg.find( (obj) => obj.param === "email");
        console.log(emailErr)
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


    }
  };
  const onSignUpHandler = (e) => {
    if (!username || !email || !password) {
      setGenerallErr('im frontend ist eine error man')
      if(!username){
        setGenerallErr('Wie ist Ihr Name?');
      } else if(!email){
        setGenerallErr('Ihre Email-Adresse bitte nicht vergessen');
      } else if(!password){
        setGenerallErr('Also password auch noch bitte');
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

        <p className="err-msg">{generallErr}</p>

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

        {organisator && (
          <>
            <input
              type="text"
              name="adress"
              id="adress"
              placeholder="Adresse"
              onChange={(e) => setAdress(e.target.value)}
            />
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Vollständiger Name"
              onChange={(e) => setFullname(e.target.value)}
            />
          </>
        )}
        <button type="submit" onClick={onSignUpHandler}>
          Sign Up
        </button>
      </form>
    </main>
  );
};

export default Signup;
