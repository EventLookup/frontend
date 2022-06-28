import axios from "../api/axios";


const createGetAndSetRefreshToken = async () => {
  const res = await axios.get('/refresh', {withCredentials:true})
  console.log(res.data);
  axios.defaults.headers.common['authorization'] = `Bearer ${res.data.accessToken}`;
}


export {
  createGetAndSetRefreshToken
}