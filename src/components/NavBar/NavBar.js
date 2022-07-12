
import MobileNavigation from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";
import "./NavBar.css"
import { MenuContextProvider } from "../../context/MobileNavBarContext";
import { FilterContext} from "../../context/FilterContext";
import FilterSite from "./FilterSite"
import { useContext } from "react";

const NavBar = () => {
  
const {isOnCalender} = useContext(FilterContext)

  return ( 
    <div className="navbar">
      <MenuContextProvider>
        {isOnCalender && <FilterSite/>}
        <MobileNavigation/>
        <DesktopNavigation/>

      </MenuContextProvider>
    </div>
  );
}
 
export default NavBar;