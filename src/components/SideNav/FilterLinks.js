import "./FilterLinks.css"; 

const FilterLinks = (props)=> {
    return(
        <div className="FilterLinks">
        <aside>
          <div onClick={props.today}>heute</div>
          <div onClick={props.tomorrow}>morgen</div>
          <div onClick={props.month}>Juni</div>
          <div onClick={props.nextMonth}>Juli</div>
          <div id="Suche">
            <form>
              <input type="text" placeholder='Ort' size="10" maxLength="20"/>
            </form>
          </div>
        </aside>
      </div>
    )
}

export default FilterLinks;