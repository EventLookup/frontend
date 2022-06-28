import './SideNav.css';

function SideNav(props) {
    return (
      <div className="SideNav">
        <aside>
          <div>heute</div>
          <div>morgen</div>
          <div>Monat</div>
          <div id="Suche">
            <form>
              <input type="text" placeholder='Ort' size="10" maxLength="20"/>
            </form>
          </div>
        </aside>
      </div>
    );
  }
  export default SideNav;