import axios from 'axios'

var synonyms = {}

export default {
  fetchSynonyms (word) {
    if (Array.isArray(synonyms[word])) {
      return Promise.resolve(synonyms[word])
    }

    const base = 'https://thesaurus.altervista.org/thesaurus/v1'
    const synKey = 'CQMMQFvjuOzTzfUzQCrz'
    const url = `${base}?key=${synKey}&language=en_US&output=json&word=${word}`

    return axios.get(url)
    .then(response => {
      const synonymsJoined = response.data.response.map(syn => syn.list.synonyms)
      synonyms[word] = []
      synonymsJoined.reduce((obj, group) => {
        group.split('|').forEach(w => {
          synonyms[word].push(w.toLowerCase().replace(' (similar term)', ''))
        })
      }, [])
      return synonyms[word]
    })
  }
}
