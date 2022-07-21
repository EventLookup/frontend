// import FilterLinks from './FilterLinks';
import './SideNav.css';
import {useContext} from 'react';
import { getMonth } from 'date-fns/esm';
import {FilterOptionContext} from "../../context/FilterOptionContext";

function SideNav(props) {

  const monat = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];

  const [city, setCity] = useContext(FilterOptionContext);

  function cityChange(e) {
    e.preventDefault();
    // setCity(e.target.value);
    console.log(city);
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
            <form onSubmit={cityChange}>
              <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder='Ort' size="10" maxLength="20"/>
              {/* <input type="submit" value="los" id="los" /> */}
            </form>
          </div>
        </aside>
      </div>
    );
  }
  export default SideNav;