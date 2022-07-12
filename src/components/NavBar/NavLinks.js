import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { MenuContext } from "../../context/MobileNavBarContext";
import { AuthContext } from "../../context/LoginAuthContext";
import { FilterContext } from "../../context/FilterContext";
import useAuth from "../../hooks/useAuth";

const NavLinks = () => {
    const {setOpen} = useContext(MenuContext);
    const {loggedIn} = useContext(AuthContext)
    const {setAuthOption} = useAuth()

    const {setIsOnCalender} = useContext(FilterContext)

    return(
        <>
            <NavLink onClick={() => {
                setOpen(false)
                setIsOnCalender(true)
                }} to='/'>KALENDER</NavLink> { } {/* Diese Abstände müssten noch über CSS gelöst werden, finde ich! */}
            <NavLink onClick={() => {
                setOpen(false)
                setIsOnCalender(false)
                }} to='/create'>EINTRAGEN</NavLink> { }
            {!loggedIn ?
            <>
            <NavLink onClick={() => {
                setOpen(false)
                setIsOnCalender(false)
                }} to='/Login'>LOGIN</NavLink> { }
            <NavLink onClick={() => {
                setOpen(false)
                setIsOnCalender(false)
                }} to='/Signup'>REGISTRIEREN</NavLink> { }
            </>
            :
            <button className="log-button" onClick={()=> {
                setAuthOption("logout")
            }}>LOGOUT</button>
            }
        </>
    )
}

export default NavLinks;