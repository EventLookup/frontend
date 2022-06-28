import { useState } from "react";
import { Navigate } from 'react-router-dom';
import axios from "../api/axios";
import { setJWTToken, getJWTToken } from "../util/tokenFunctions";

import "./Login.css";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      if(res.data.accessToken){
        axios.defaults.headers.common['authorization'] = `Bearer ${res.data.accessToken}`;
      }

    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (email && password) {
      loginFunc();
    } else {
      // Hier sollte man dem Nutzer mitteilen was passiert wenn NICHT
      // log reicht nicht
      console.log('Bitte Email und/ oder Passwort eingeben!');
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
        <button onClick={onSubmitHandler}>Login</button>
      </form>
    </main>
  );
};

export default Login;
