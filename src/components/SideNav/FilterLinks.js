import { useState } from "react";
import { getMonth } from 'date-fns/esm';
import "./FilterLinks.css";

const FilterLinks = (props) => {

  const monat = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];

  const [city, setCity] = useState('');

  function cityChange(event) {
    setCity(event.target.value);
    
  }

  return (
    <div className="FilterLinks">
      <aside>
        <div onClick={props.today}>heute</div>
        <div onClick={props.tomorrow}>morgen</div>
        <div onClick={props.month}>{monat[getMonth(new Date())]}</div>
          <div onClick={props.nextMonth}>{monat[getMonth(new Date())+1]}</div>
        <div id="Suche">
          <form>
            <input
              type="text"
              value={city}
              placeholder="Ort"
              size="10"
              maxLength="20"
              onChange={cityChange}
            />
          </form>
        </div>
      </aside>
    </div>
  );
};

export default FilterLinks;
