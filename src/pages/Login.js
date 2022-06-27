import { useContext, useState } from "react";
import { LoginAuthContext } from "../context/LoginAuthContext";
import axios from "axios";

import "./Login.css";

const Login = () => {
  const { setToken } = useContext(LoginAuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginFunc = async () => {
    try {
      const res = await axios.post(
        "https://eventlookup.herokuapp.com/login",
        {
          email: email,
          password: password,
        }, {
          withCredentials: true,
          headers: {"Content-Type": "application/json"}
        }
      );
      setToken(res.data.accessToken);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (email && password) {
      loginFunc();
    }
  };

  return (
    <main className="main-login">
      <form action="" method="POST" className="login">
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
