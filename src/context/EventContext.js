// eventDate, eventTime, title, location(street, houseNr, city, zip), description

import { useState, createContext } from "react";
export const EventContext = createContext();
export const EventContextProvider = props => {
    const[] = useState();

    return (
        <EventContext.Provider value={[]}>
            {props.children}
        </EventContext.Provider>
    );
}