import { NavLink } from "react-router-dom";

const NavLinks = ()=> {
    return(
        <>
            <NavLink to='/'>KALENDER</NavLink> { } {/* Diese Abstände müssten noch über CSS gelöst werden, finde ich! */}
            <NavLink to='/create'>EINTRAGEN</NavLink> { }
            <NavLink to='/Login'>LOGIN</NavLink> { }
            <NavLink to='/Signup'>REGISTRIEREN</NavLink> { }
        </>
    )
}

export default NavLinks;