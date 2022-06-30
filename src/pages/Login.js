import { useEffect } from "react";
import {/*  useContext, */ useState } from "react";
// import { LoginAuthContext } from "../context/LoginAuthContext";
import axios from "../api/axios";

import "./Login.css";

const Login = () => {
  // const { setToken } = useContext(LoginAuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // input errors im frontend
  const [frontendErr , setFrontendErr] = useState("");
  // input errors vom backend
  // const [errMsg, setErrMsg] = useState(""); //error from axios
  const [backendErr, setBackendErr] = useState("");

//  handler
const emailHandler = (e) => {
  setEmail(e.target.value);
  setFrontendErr('');
  setBackendErr('');
};
const passwordHandler = (e) => {
  setPassword(e.target.value);
  setFrontendErr('');
  setBackendErr('');
};

useEffect( () => {
  setBackendErr(backendErr)
}, [backendErr])

  const loginFunc = async () => {
    try {
      const res = await axios.post(
        "/login",
        {
          email,
          password,
        }, {
          withCredentials: true
        }
      );
    console.log( res.data );
    } catch (err) {
      console.error(err);
      setBackendErr(err?.response?.data?.msg)
    }
  };

  const onSubmitHandler = (e) => {
    if (!email || !password) {
      let isValidEmail = [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g];
      setFrontendErr('Fehler im Client');
      if(!email){
        console.log('bist du hier schon?')
        setFrontendErr("Fügen Sie bitte eine Email Adresse ein");
        return;
      }else if(!email.match(isValidEmail)){
        console.log('bist du hier auch schon?')
        setFrontendErr('Fügen Sie bitte eine gültige Email Adresse ein');
      } else if(!password){
        setFrontendErr("Vergessen Sie Ihren Passwort bitte nicht");
      }
      return;
    } else {
      loginFunc();
      e.preventDefault();
    }
  };

  return (
    <main className="main-login">
      <form className="login">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
          onChange={emailHandler}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Passwort"
          required
          onChange={passwordHandler}
        />

        <p className="err-msg">{frontendErr}</p>
        <p className="err-msg">{backendErr}</p>

        <button onClick={onSubmitHandler}>Login</button>
      </form>
    </main>
  );
};

export default Login;
