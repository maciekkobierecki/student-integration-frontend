import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
      'Authorization': `${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
  })
}
