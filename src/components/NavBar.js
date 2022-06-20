import { NavLink } from "react-router-dom";

const NavBar = () => {
  return ( 
    <nav>
      <NavLink to='/'>Kalender</NavLink> { } {/* Diese Abstände müssten noch über CSS gelöst werden, finde ich! */}
      <NavLink to='/Login'>Log In</NavLink> { }
      <NavLink to='/Signup'>Registrieren</NavLink> { }
      <NavLink to='/Signup'>Event eintragen</NavLink> { }
    </nav>
  );
}
 
export default NavBar;