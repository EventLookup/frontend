import { useState,  createContext } from "react";

export const LoginAuthContext = createContext();

export const LoginAuthContextProvider = ({children}) => {
    const [ isAuth, setIsAuth ] = useState(false);

    console.log('context', isAuth);
    return (
        <LoginAuthContext.Provider value={{isAuth, setIsAuth}}>
            {children}
        </LoginAuthContext.Provider>
    )
}