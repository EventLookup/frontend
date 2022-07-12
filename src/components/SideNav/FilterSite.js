import FilterLinks from "./FilterLinks";
import "./FilterLinks.css";
import { CgClose } from "react-icons/cg";
import { BsFilterSquare } from "react-icons/bs";
import { useState } from "react";

const FilterSite = (props) => {
  const [open, setOpen] = useState(false);

  const button = (
    <button className="button" onClick={() => setOpen(!open)}>
      FILTER <BsFilterSquare />
    </button>
  );
  const closeIcon = <CgClose onClick={() => setOpen(!open)} />;

  return (
    <div>
      {open ? closeIcon : button}
      {open && (
        <div id="mobileFilterLinks">
          <FilterLinks
            today={props.today}
            tomorrow={props.tomorrow}
            month={props.month}
            nextMonth={props.nextMonth}
            city={props.city}
          />
        </div>
      )}
    </div>
  );
};

export default FilterSite;
