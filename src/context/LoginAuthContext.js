import { useState , createContext } from "react";
import axios from 'axios';

export const LoginAuthContext = createContext();

export const LoginAuthContextProvider = ({children}) => {
    const [ token , setToken ] = useState('');
    console.log("CONTEXT token " , token);

    axios.defaults.headers.common['authorization'] = token || axios.defaults.headers.common.authorization;

    console.log('context', axios.defaults.headers.common.authorization);
    return (
        <LoginAuthContext.Provider value={{token , setToken}}>
            {children}
        </LoginAuthContext.Provider>
    )
}