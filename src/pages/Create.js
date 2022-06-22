import "./Create.css"

const Create = () => {
    return ( 
      <div className="create">
          <main>
              <h2>Trage eine Veranstaltung ein</h2>
              <form>
                <input type="text" placeholder="Name der Veranstaltung"></input>
                <input type="text" placeholder="Location"></input>
                <input type="text" placeholder="Datum"></input>
                <input type="text" placeholder="Uhrzeit"></input>
                <textarea placeholder="Beschreibung"></textarea>
                <h5>Adresse</h5>
                <input type="text" placeholder="Straße"></input>
                <input type="text" placeholder="Hausnr."></input>
                <input type="text" placeholder="PLZ"></input>
                <input type="text" placeholder="Stadt"></input>
                <button type="submit">Absenden</button>
              </form>
          </main>
      </div>
    );
  }
   
  export default Create;