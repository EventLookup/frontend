import { useState, createContext } from "react";
export const FilterOptionContext = createContext();
export const FilterOptionContextProvider = props => {
    const[city, setCity] = useState("Berlin");

    return (
        <FilterOptionContext.Provider value={
            [city, setCity]
            }>
            {props.children}
        </FilterOptionContext.Provider>
    );
}