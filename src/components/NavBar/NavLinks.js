import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { MenuContext } from "../../context/MobileNavBarContext";
import { AuthContext } from "../../context/LoginAuthContext";
import useAuth from "../../hooks/useAuth";

const NavLinks = () => {
    const {setOpen} = useContext(MenuContext);
    const {loggedIn} = useContext(AuthContext)
    const {setAuthOption} = useAuth()
    return(
        <>
            <NavLink onClick={() => setOpen(false)} to='/'>KALENDER</NavLink> { } {/* Diese Abstände müssten noch über CSS gelöst werden, finde ich! */}
            <NavLink onClick={() => setOpen(false)} to='/create'>EINTRAGEN</NavLink> { }
            {!loggedIn ?
            <>
            <NavLink onClick={() => setOpen(false)} to='/Login'>LOGIN</NavLink> { }
            <NavLink onClick={() => setOpen(false)} to='/Signup'>REGISTRIEREN</NavLink> { }
            </>
            :
            <button onClick={()=> {
                setAuthOption("logout")
            }}>LOGOUT</button>
            }
        </>
    )
}

export default NavLinks;