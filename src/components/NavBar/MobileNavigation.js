import NavLinks from "./NavLinks";
import "./NavBar.css"
import { TbMenu2 } from 'react-icons/tb';
import {CgClose} from "react-icons/cg";

import { useState } from "react";

const MobileNavigation = () => {
const [open, setOpen] = useState(false);

const hamburgerIcon = <TbMenu2 onClick={() => setOpen(!open)} className="hamburger"/>;
const closeIcon = <CgClose onClick={() => setOpen(!open)} className="hamburger"/>;

return(
        <nav className="mobile-nav">
            
            {open ? closeIcon : hamburgerIcon}
            {open && <div className="mobile-navlinks"><NavLinks/></div>}
            
       </nav>
    )
}

export default MobileNavigation;