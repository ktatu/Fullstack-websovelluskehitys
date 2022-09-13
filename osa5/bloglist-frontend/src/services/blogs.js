import axios from 'axios'
const baseUrl = '/api/blogs'

let userToken = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async  (blogData) => {
  const config = {
    headers: { Authorization: userToken }
  }

  const res = await axios.post(baseUrl, blogData, config)

  return res
}

const setToken = token => {
    userToken = token
}

export default { getAll, create, setToken }