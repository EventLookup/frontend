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
    }
  };

  const onSubmitHandler = (e) => {
    
    if (!email || !password) {
      setFrontendErr('Fehler im Client');
      if(!email){
        setFrontendErr("Fügen Sie bitte eine Email Adresse ein");
      } else if(!password){
        setFrontendErr("Vergessen Sie Ihren Passwort bitte nicht")
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Passwort"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="err-msg">{frontendErr}</p>
        <button onClick={onSubmitHandler}>Login</button>
      </form>
    </main>
  );
};

export default Login;
