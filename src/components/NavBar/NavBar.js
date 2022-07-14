import MobileNavigation from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";
import "./NavBar.css";
import { MenuContextProvider } from "../../context/MobileNavBarContext";
import { FilterContext } from "../../context/FilterContext";
import FilterSite from "./FilterSite";
import { useContext } from "react";

const NavBar = (props) => {
  const { isOnCalender } = useContext(FilterContext);

  return (
    <div className="navbar">
      <MenuContextProvider>
        {isOnCalender && (
          <FilterSite
            today={props.today}
            tomorrow={props.tomorrow}
            month={props.month}
            nextMonth={props.nextMonth}
          />
        )}
        <MobileNavigation />
        <DesktopNavigation />
      </MenuContextProvider>
    </div>
  );
};

export default NavBar;
