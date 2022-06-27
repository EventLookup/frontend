import axios from "axios";

export default axios.create({
  baseURL: 'https://eventlookup.herokuapp.com'
});