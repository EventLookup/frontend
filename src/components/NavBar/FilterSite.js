import FilterLinks from "./FilterLinks";
import "./FilterLinks.css";
import { CgClose } from "react-icons/cg";
import { BsFilterSquare } from "react-icons/bs";
import { useState } from "react";
// import { addDays, addMonths,} from "date-fns";

const FilterSite = (props) => {
  // const [date, setDate] = useState(new Date());
  // const [LookingForDay, setLookingForDay] = useState(true);

  // const handleResetDate = () => {
  //   setLookingForDay(true);
  //   setDate(new Date());
  // };

  // const handleNextDay = () => {
  //   setLookingForDay(true);
  //   setDate(addDays(new Date(), 1));
  // };

  // const handleNextMonth = () => {
  //   setLookingForDay(false);
  //   setDate(addMonths(new Date(), 1));
  // };

  // const handleResetMonth = () => {
  //   setLookingForDay(false);
  //   setDate(new Date());
  // };

  const [open, setOpen] = useState(false);

  const button = (
    <button className="filter-button" onClick={() => setOpen(!open)}>
      FILTER <BsFilterSquare />
    </button>
  );
  const closeIcon = (
    <CgClose className="filter-button" onClick={() => setOpen(!open)} />
  );

  return (
    <div>
      {open ? closeIcon : button}
      {open && (
        <div id="mobileFilterLinks">
          <FilterLinks
            // today={handleResetDate}
            // tomorrow={handleNextDay}
            // month={handleResetMonth}
            // nextMonth={handleNextMonth}
            today={props.today}
            tomorrow={props.tomorrow}
            month={props.month}
            nextMonth={props.nextMonth}
          />
        </div>
      )}
    </div>
  );
};

export default FilterSite;
