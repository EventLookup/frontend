import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { MenuContext } from "../../context/MobileNavBarContext";

const NavLinks = () => {
    const {setOpen} = useContext(MenuContext);

    return(
        <>
            <NavLink onClick={() => setOpen(false)} to='/'>KALENDER</NavLink> { } {/* Diese Abstände müssten noch über CSS gelöst werden, finde ich! */}
            <NavLink onClick={() => setOpen(false)} to='/create'>EINTRAGEN</NavLink> { }
            <NavLink onClick={() => setOpen(false)} to='/Login'>LOGIN</NavLink> { }
            <NavLink onClick={() => setOpen(false)} to='/Signup'>REGISTRIEREN</NavLink> { }
        </>
    )
}

export default NavLinks;