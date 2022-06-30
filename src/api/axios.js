import axios from "axios";

export default axios.create({
  baseURL: 'https://eventlookup.herokuapp.com'
  // baseURL: 'http://localhost:3000'
})