<template>
  <div class="search flex-column">
    <div class="search-form flex-column" :class="{'flex-center': !results}">
      <form @submit.prevent="search" class="theme-mid shadow flex-row">
        <div class="flex-row flex-one align-center">
          <label for="search" class="muted"><i class="fa fa-search"></i></label>
          <input name="search" class="hi-bottom flex-one" placeholder="search" v-model="query" autofocus />
        </div>
        <div v-if="results" class="filter flex-row flex-one align-center">
          <label for="filter" class="muted"><i class="fa fa-filter"></i></label>
          <input name="filter" class="hi-bottom flex-one" placeholder="filter" v-model="filter" />
        </div>
      </form>
    </div>

    <div v-if="results" class="results flex-one flex-row">
      <div class="flex-one substance">
        <p class="title callout-light shadow">{{ results.length }} verses</p>
        <div class="verse theme-mid shadow" v-for="verse in filteredResults">
          <span class="reference callout-light alt">{{verse.book_name}} {{verse.chapter_id}}:{{verse.verse_id}}</span>
          <span class="verse-text" v-html="highlightQuery(verse.verse_text)"></span>
        </div>
      </div>

      <div v-if="synResults" class="flex-one substance">
        <p class="title callout-light shadow">{{synonyms.length}} synonyms, {{synResults.length}} verses</p>
        <div class="verse theme-mid shadow" v-for="verse in filteredSynResults">
          <span class="reference callout-light alt">{{verse.book_name}} {{verse.chapter_id}}:{{verse.verse_id}}</span>
          <span class="verse-text" v-html="highlightSyns(verse.verse_text)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bibleService from '../services/bible-service'
import synonymService from '../services/synonym-service'

function l(text) {
  return text.toLowerCase()
}

export default {
  data () {
    return {
      query: '',
      fetchedQuery: '',
      filter: '',
      results: undefined,
      synonyms: undefined,
      synResults: undefined
    }
  },
  computed: {
    filteredResults () {
      if (this.filter) {
        return this.results.filter(v => l(v.verse_text).includes(l(this.filter)))
      }
      return this.results
    },
    filteredSynResults () {
      if (this.filter) {
        return this.synResults.filter(v => l(v.verse_text).includes(l(this.filter)))
      }
      return this.synResults
    }
  },
  methods: {
    highlightQuery (text) {
      var re = new RegExp(this.fetchedQuery, "g")
      return text.replace(re, `<span class="back-orange">${this.fetchedQuery}</span>`)
    },
    highlightSyns (text) {
      const pattern = `(${this.synonyms.join('|')})`
      var re = new RegExp(pattern, "g")
      return text.replace(re, '<span class="back-red">$1</span>')
    },
    search () {
      this.results = undefined
      this.synonyms = undefined
      this.synResults = undefined

      const self = this
      bibleService.search(this.query)
      .then(results => {
        self.fetchedQuery = self.query
        self.results = results[1]
      })

      synonymService.fetchSynonyms(this.query)
      .then(synonyms => {
        self.synonyms = synonyms.filter(s => !s.includes('antonym') && s.length > 2)
        bibleService.search(self.synonyms.join('|'))
        .then(results => {
          self.synResults = results[1]
        })
      })
    }
  }
}
</script>

<style lang="less">
.search {
  height: 100%;
  .search-form {
    transition: justify-content 0.3s;
    .filter {
      margin-left: 20px;
    }
  }
  .search-form.flex-center {
    height: 80%;
    margin-bottom: 20px;
    form {
      padding: 20px 50px;
    }
  }
  form {
    padding: 20px 20px;
    border-radius: 2px;
    z-index: 100;
    i {
      margin-right: 7px;
    }
  }

  .results {
    .flex-one {
      padding-left: 6px;
      padding-right: 2px;
    }
    .verse {
      padding: 5px;
      margin-bottom: 8px;
      .back-orange, .back-red {
        padding-left: 2px;
        padding-right: 2px;
      }
      .reference {
        font-weight: bold;
      }
    }
    .title {
      padding: 5px;
      margin-bottom: 8px;
      border-radius: 2px;
    }
  }
}
</style>
