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

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (email && password) {
      setAuthOption('login');
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
