const calArray = [
    {
      title: "Matrix 4",
      category: "Film",
      location: {
        name: "Astoria",
        address: {
          street: "Hauptstr.",
          houseNr: "1",
          zip: "10250",
          city: "Berlin",
        },
      },
      date: "20.06.2022",
      time: "20:00",
    },
    {
      title: "The Flyin' High",
      category: "Konzert",
      location: {
        name: "NBL",
          address: {
            street: "Heinestr.",
            houseNr: "3",
            zip: "04075",
            city: "Leipzig",
          },
        },
        date: "01.07.2022",
        time: "21:00",
      },
      {
        title: "This Is England",
        category: "Film",
        location: {
          name: "Capitol",
          address: {
            street: "Brunnenstr.",
            houseNr: "16",
            zip: "10250",
            city: "Berlin",
          },
        },
        date: "20.06.2022",
        time: "20:00",
      },
      {
        title: "Die Art",
        category: "Konzert",
        location: {
          name: "MB",
          address: {
            street: "Roßstr.",
            houseNr: "23",
            zip: "04075",
            city: "Leipzig",
          },
        },
        date: "01.07.2022",
        time: "21:00",
      },
      {
        title: "Schiller - Die Räuber",
        category: "Theater",
        location: {
          name: "Schaubühne",
          address: {
            street: "Heinestr.",
            houseNr: "6",
            zip: "04075",
            city: "Leipzig",
          },
        },
        date: "01.07.2022",
        time: "20:00",
      },
      {
        title: "Kriminalgeschichten",
        category: "Literatur",
        location: {
          name: "Buchhaus",
          address: {
            street: "Hauptstr.",
            houseNr: "1",
            zip: "10250",
            city: "Berlin",
          },
        },
        date: "20.06.2022",
        time: "19:00",
      },
      {
        title: "90er Party",
        category: "Nachtleben",
        location: {
          name: "Werk5",
          address: {
            street: "Hafenstr.",
            houseNr: "1",
            zip: "20095",
            city: "Hamburg",
          },
        },
        date: "22.07.2022",
        time: "22:00",
      },
      {
        title: "Games Convention",
        category: "Sonstiges",
        location: {
          name: "Neue Messe",
          address: {
            street: "Messeallee.",
            houseNr: "1",
            zip: "04320",
            city: "Leipzig",
          },
        },
        date: "15.09.2022",
        time: "13:00",
      },
    ];
    // Array nach Kategorien in Objekten sortieren
    function SortArray(x, y) {
      return x.category.localeCompare(y.category);
    }
    const CALENDAR = calArray.sort(SortArray);
    
    // zeige nur Events von heute
      const datum = new Date();
      const wochentag = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
      const day = datum.getDay();
      const date = datum.getDate();
      const month = datum.getMonth()+1;
      const year = datum.getFullYear();
      const dateToday = `${date}.${
        month<=9?
        `0${month}`:
        `${month}`
      }.${year}`;
      console.log(datum);
      console.log(dateToday);
    
      const todayCal = CALENDAR.filter( (event) => {
        if(event.date === dateToday) {
          return true;
        }
        else {
          return false;
        }
      })
      console.log(todayCal);
    
    function Calendar() {
      return (
        <div className="App">
          <main>
          <h2>CalendarToday</h2>
          <h3>{`${wochentag[day]}, ${dateToday}`}</h3>
          <CalendarToday calendar={todayCal} />
          </main>
        </div>
      );
    }
    export default Calendar;
    
    function CalendarToday(props) {
      const calArr = [];
      let lastCategory = null;
    
      props.calendar.forEach((elem) => {
        if(elem.category !== lastCategory) {
        calArr.push (
          <CalCategory
            category={elem.category}
            key={elem.category}
          />
        );
        }
        lastCategory = elem.category;
    
        calArr.push (
          <CalEvent
            location={elem.location.name}
            time={elem.time}
            title={elem.title}
            key={elem.title}
          />
        );
        })
    
      return (
        <>
          {calArr}
        </>
      );
    }
    
    function CalCategory(props) {
      return (
        <>
          <h4>{props.category}</h4>
        </>
      )
    }
    
    function CalEvent(props) {
      return (
        <>
          <section>
            <div>{props.location}</div>
            <div>{props.time} Uhr</div>
            <div>{props.title}</div>
          </section>
          <p />
        </>
      );
    }
    
    