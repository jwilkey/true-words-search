import axios from 'axios'

const url = 'https://true-words-server.herokuapp.com'
const config = {
  headers: { 'Content-Type': 'application/json', 'x-truewords-id': window.twid }
}

export default {
  fetchCrossReferences (text) {
    return axios.post(`${url}/cross-reference`, {text}, config)
    .then(response => {
      return response.data
    })
  },
  fetchTexts (passages) {
    return axios.get(`${url}/texts/${passages.join(',')}`, config)
    .then(response => {
      return response.data.response.search.result.passages
    })
  },
  search (query) {
    return axios.get(`${url}/search/${query}`, config)
    .then(response => {
      return response.data
    })
  }
}
