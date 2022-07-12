import { useState, createContext } from "react";
export const BuildCity = createContext();
export const BuildCityProvider = props => {
    const[city, setCity] = useState("");
    return (
        <BuildCity.Provider value={[city, setCity]}>
            {props.children}
        </BuildCity.Provider>
    );
}