import axios from "axios";

export default axios.create({
  withCredentials:true,
  baseURL: 'https://eventlookup.herokuapp.com/',
  headers: {
    'Access-Control-Allow-Origin': true
  }
})