import { useState ,useEffect } from "react";
import axios from "../api/axios";
// css
import "./Login.css";

// custom hook
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [emailLogin , setEmailLogin] = useState("")
  const [passwordLogin, setPasswordLogin] = useState("");
  const [frontendErr , setFrontendErr] = useState("");
  const [backendErr, setBackendErr] = useState("");
  //  handler
const emailHandler = (e) => {
  setEmailLogin(e.target.value);
  setFrontendErr('');
  setBackendErr('');
};
const passwordHandler = (e) => {
  setPasswordLogin(e.target.value);
  setFrontendErr('');
  setBackendErr('');
};
useEffect( () => {
  setBackendErr(backendErr)
}, [backendErr])
  const {
    // optionen sind login, refresh, logout 
    setAuthOption, 
    email, 
    password,
    // falls fehler existieren, gibt errors diese zurück
    loginErrors 
  } = useAuth();

  const loginFunc = async () => {
    try{
      const res = await axios.post(
        "/login" , {
          emailLogin,
          passwordLogin
        }, {
          withCredentials:true
        }
      );
      console.log(res.data);
    }catch(error){
    console.log(error);
    setBackendErr(error?.response?.data?.msg)
  }
  } 
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (email && password) {
      setAuthOption('login');
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
