import axios from 'axios';

//const api_url = process.env.NODE_ENV === 'production' ? 'https://northkino.herokuapp.com/api/xml' : 'http://localhost:3001/api/xml';
const api_url = 'https://northkino.herokuapp.com/api/xml'
export const getData = (params) => axios.get(api_url, {params}).then(result=>result.data).catch(e => console.log(e))

export const current = item => {
  const now = new Date();
  const release = new Date(item.dtLocalRelease)
  return now >= release;
}
