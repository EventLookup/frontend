
import MobileNavigation from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";
import "./NavBar.css"

const NavBar = () => {
  
  return ( 
    <div className="navbar">
        <MobileNavigation/>
        <DesktopNavigation/>
    </div>
  );
}
 
export default NavBar;