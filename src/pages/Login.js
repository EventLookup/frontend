import { useContext, useState } from "react";
import { LoginAuthContext } from "../context/LoginAuthContext";
import axios from "../api/axios";

import "./Login.css";

const Login = () => {
  const { setToken } = useContext(LoginAuthContext);

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
      

    console.log( res.data );

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
