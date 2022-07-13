// react
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// util
import jwt_decode from 'jwt-decode';
import axios from "../api/axios";
// context
import { AuthContext } from "../context/LoginAuthContext";

const useAuth = () => {
  // hooks
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(AuthContext);
  // useStates
  const [authOption, setAuthOption] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState(null);

  // helper functions
  const createGetAndSetRefreshToken = async () => {
    const res = await axios.get('/refresh')
    return setAxiosDefaultHeader(res.data.accessToken);
  }

  const setAxiosDefaultHeader = (token) => {

    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  
    const authHeader = { ...axios.defaults.headers.common };
    const isBearerIncluded = authHeader.authorization.includes('Bearer eyJh');
   
    /* 
      Wir dokodieren unser JW TOKEN in dem der erstell Zeitpunkt als auch der Ablaufzeitpunkt
      enthalten ist. Wir setzen daraufhin die setTimeout funktion die nach ablauf dieser
      Zeit feuert und den header leer macht, als auch den refreshToken aus der Datenbank
      im Dokument löscht! 
    */
    if(isBearerIncluded){
      const decodedToken = jwt_decode(token);
      const timeTillExpInMs = ( decodedToken.exp - decodedToken.iat ) * 1000;
      return setTimeout( async () => {
        axios.defaults.headers.common['authorization'] = "";
        await axios.get('/logout');
        console.log('ausgeloggt');
      }, timeTillExpInMs);
  
    } else {
      navigate('/login');
    }
  }


  const login = async () => {
    try {
      const res = await axios.post(
        "/login",
        {
          email,
          password,
        }
      );

      if(res.data.accessToken){
        const timer = setAxiosDefaultHeader(res.data.accessToken);
        clearTimeout(timer);
        navigate(-1);
        setLoggedIn(true);
      }

    } catch (err) { 
      // Das Error Handling muss noch Grafisch dargestellt werden
      setLoginErrors(err?.response?.data?.errors)
    }
  };

  useEffect(() => {

    (async () => {
      if(authOption === 'refresh'){
        createGetAndSetRefreshToken();
      }
      
      if(authOption === 'login'){
        login();
      }
  
      if(authOption === 'logout'){
        axios.defaults.headers.common['authorization'] = "";
        try {
          console.log("im try block")
          await axios.get('/logout');
        } catch (e) {
          console.log("Error: ",  e) 
        };
        setLoggedIn(false);
      }
    })();

  }, [authOption]);

  return {
    setAuthOption,
    email,
    setEmail,
    password,
    setPassword,
    loginErrors
  };
}
 
export default useAuth;