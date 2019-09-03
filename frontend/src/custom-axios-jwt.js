import axios from 'axios'
import moment from 'moment'
import jwt_decode from 'jwt-decode'

const axiosclient = axios.create({
  baseURL: 'http://localhost:8000'
})

axiosclient.interceptors.request.use(async (config) => {
  // Decode available tokens
  let jwta = {}
  let jwtr = {}
  if (window.localStorage.getItem('jwta') && window.localStorage.getItem('jwtr')) {
    jwta = jwt_decode(window.localStorage.getItem('jwta'))
    jwtr = jwt_decode(window.localStorage.getItem('jwtr'))
  }

  // Update tokens if the access token is expired and a valid refresh token is available
  if (jwta.exp < moment().unix() && jwtr.exp > moment().unix()) {
    const response = await axios.post("http://localhost:8000/api/token/refresh/", {
      'refresh': window.localStorage.getItem('jwtr')
    })
    window.localStorage.setItem('jwta', response.data.access)
    window.localStorage.setItem('jwtr', response.data.refresh)
    jwta = jwt_decode(response.data.access)
  }

  // Add access token to request
  if (jwta.exp > moment().unix()) {
    config.headers['Authorization'] = `Bearer ${window.localStorage.getItem('jwta')}`
  }

  // Disconnect user if authentication tokens are expired
  // (Added to avoid unnecessary API calls)
  if (jwta.exp < moment().unix() && jwtr.exp < moment().unix()) {
    window.localStorage.clear()
    window.location = '/login-page'
  }

  return config
})

axiosclient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      window.localStorage.clear()
      window.location = '/'
    }
    return Promise.reject(error.response)
  }
)

export default axiosclient