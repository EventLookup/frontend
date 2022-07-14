import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar.js";
import "./header.css";
import logo from "../../assets/logo_black.png";
import logoMobile from "../../assets/logo_black_mobile.png";

const Header = (props) => {
  return (
    <header>
      <img className="logo-mobile" src={logoMobile} alt="logo-mobile"></img>
      <img className="logo" src={logo} alt="logo"></img>
      <NavBar
        today={props.today}
        tomorrow={props.tomorrow}
        month={props.month}
        nextMonth={props.nextMonth}
      />
      <Outlet />
    </header>
  );
};

export default Header;
