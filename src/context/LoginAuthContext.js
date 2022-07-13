import { useState , createContext } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [ token , setToken ] = useState('');
    // console.log("CONTEXT token " , token);

    axios.defaults.headers.common['authorization'] = token || axios.defaults.headers.common.authorization;

    // console.log('context', axios.defaults.headers.common.authorization);
    return (
        <AuthContext.Provider value={{token , setToken}}>
            {children}
        </AuthContext.Provider>
    )
}