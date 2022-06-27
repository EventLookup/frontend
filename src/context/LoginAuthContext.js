import { useState , createContext } from "react";

export const LoginAuthContext = createContext();

export const LoginAuthContextProvider = ({children}) => {
    const [ token , setToken ] = useState('');
    console.log("CONTEXT token " , token);
    return (
        <LoginAuthContext.Provider value={{token , setToken}}>
            {children}
        </LoginAuthContext.Provider>
    )
}