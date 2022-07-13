import { useState,  createContext } from "react";
export const FilterContext = createContext();

export const FilterContextProvider = ({children}) => {
    const [isOnCalender, setIsOnCalender] = useState(true);
    
    return (
        <FilterContext.Provider value={{isOnCalender, setIsOnCalender}}>
            {children}
        </FilterContext.Provider>
    )
}