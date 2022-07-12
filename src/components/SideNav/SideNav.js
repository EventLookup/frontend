// import FilterLinks from './FilterLinks';
import './SideNav.css';
import {useState} from 'react';
import { getMonth } from 'date-fns/esm';
// import {BuildCity} from "../../context/CityContext";

function SideNav(props) {

  const monat = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];

  const [city, setCity] = useState(props.city);

  function cityChange(event) {
    setCity(event.target.value);
  }
    return (
      <div className="SideNav">
        {/* <FilterLinks /> */}
        <aside>
          <div onClick={props.today}>heute</div>
          <div onClick={props.tomorrow}>morgen</div>
          <div onClick={props.month}>{monat[getMonth(new Date())]}</div>
          <div onClick={props.nextMonth}>{monat[getMonth(new Date())+1]}</div>
          <div id="Suche">
            <form>
              <input type="text" value={city} onChange={cityChange} placeholder='Ort' size="10" maxLength="20"/>
            </form>
          </div>
          <div>{city}</div>
        </aside>
      </div>
    );
  }
  export default SideNav;