import axios from 'axios';

const api_url = 'http://localhost:3001/api/xml';

export const getData = (params) => axios.get(api_url, {params}).then(result=>result.data).catch(e => console.log(e))

export const current = item => {
  const now = new Date();
  const release = new Date(item.dtLocalRelease)
  return now >= release;
}