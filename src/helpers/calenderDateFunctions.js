function forwardDay(day, setDay) {
    day < 6 ? setDay((prev) => (prev += 1)) : setDay(0);
  }
  function forwardDate(date, setDate) {
    date < 31 ? setDate((elem) => (elem += 1)) : setDate(1);
  }
  export {
    forwardDate,
    forwardDay
  }