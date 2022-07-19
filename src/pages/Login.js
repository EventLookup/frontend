import { useEffect } from "react";
// css
import "./Login.css";

// custom hook
import useAuth from "../hooks/useAuth";

const Login = () => {
  const {
    // optionen sind login, refresh, logout 
    setAuthOption, 
    email,
    setEmail, 
    password,
    setPassword,
    // falls fehler existieren, gibt errors diese zurück
    loginErrors
    } = useAuth();

  //  handler
const emailHandler = (e) => {
  setEmail(e.target.value);
};
const passwordHandler = (e) => {
  setPassword(e.target.value);
};

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (email && password) {
      setAuthOption('login');
    } else {
      console.log(loginErrors);
      e.preventDefault();
    }
  };
  console.log()
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

        <p className="err-msg">{loginErrors}</p>
        {/* <p className="err-msg">{backendErr}</p> */}

        <button onClick={onSubmitHandler}>Einloggen</button>
        <p className="signup-now">Noch kein Konto? <a href="/signup">Jetzt registrieren</a></p>
      </form>
    </main>
  );
};

export default Login;
