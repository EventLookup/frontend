import FilterLinks from "./FilterLinks";
import "./FilterLinks.css"
import {CgClose} from "react-icons/cg";
import {BsFilterSquare} from "react-icons/bs";
import { useState } from "react";

const FilterSite = () => {
const [open, setOpen] = useState(false);

const button = <button className="button" onClick={() => setOpen(!open)}>Filter <BsFilterSquare/></button>;
const closeIcon = <CgClose onClick={() => setOpen(!open)} />;

return(
        <div>
            {open ? closeIcon : button}
            {open && <div id="mobileFilterLinks"><FilterLinks/></div>}           
       </div>
    )
}

export default FilterSite;