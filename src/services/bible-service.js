import axios from 'axios'

export default {
  fetchCrossReferences (text) {
    return axios.post('http://localhost:3100/cross-reference', {text}, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      return response.data
    })
  },
  fetchTexts (passages) {
    return axios.get(`http://localhost:3100/texts/${passages.join(',')}`)
    .then(response => {
      return response.data.response.search.result.passages
    })
  }
}
