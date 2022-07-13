import "./Footer.css"
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";

const Footer = () => {

  const {setIsOnCalender} = useContext(FilterContext);

  return ( 
    <footer>
    <NavLink onClick={()=> setIsOnCalender(false)} to='/impressum'>IMPRESSUM</NavLink>
    </footer>
  );
}
 
export default Footer;