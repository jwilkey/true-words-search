<template>
  <div class="search flex-column">
    <div class="theme-mid shadow search-form flex-column">
      <form @submit.prevent="search" class="flex-row">
        <div class="flex-row flex-one align-center">
          <button type="submit" class="callout-light"><i class="fa fa-search"></i></button>
          <input name="search" :keyup.enter="search" class="hi-bottom flex-one" placeholder="search" v-model="query" autofocus />
        </div>

        <div v-if="results" class="filter flex-row flex-one align-center">
          <label for="filter" class="muted"><i class="fa fa-filter blue"></i></label>
          <input name="filter" class="hi-bottom flex-one" placeholder="filter" v-model="filter" />
          <button class="callout-light font-smaller" @click.prevent="toggleAdvanced"><i class="fa fa-gears"></i></button>
        </div>
      </form>

      <div v-if="showAdvanced" class="advanced hi-top">
        <button class="callout-light" @click="togglePos('n')" :class="posClass('n')">Nouns</button>
        <button class="callout-light" @click="togglePos('a')" :class="posClass('a')">Adjectives</button>
        <button class="callout-light" @click="togglePos('v')" :class="posClass('v')">Verbs</button>
      </div>
    </div>

    <div v-if="results" class="results flex-one flex-row" :class="{blur: loading}">
      <div class="flex-one flex-column">
        <p class="title back-orange shadow">{{ results.length }} verses</p>
        <div class="flex-one substance">
          <div class="verse theme-mid shadow" v-for="verse in filteredResults">
            <span class="reference callout-light alt">{{verse.book_name}} {{verse.chapter_id}}:{{verse.verse_id}}</span>
            <span class="verse-text" v-html="highlightQuery(verse.verse_text)"></span>
          </div>
        </div>
      </div>

      <div v-if="synResults" class="synonyms flex-one flex-column" :class="{faded: loadingSynonyms}">
        <p class="title back-red shadow">{{synonyms.length}} synonyms, {{synResults.length}} verses</p>
        <div class="flex-one substance">
          <div class="verse theme-mid shadow" v-for="verse in filteredSynResults">
            <span class="reference callout-light alt">{{verse.book_name}} {{verse.chapter_id}}:{{verse.verse_id}}</span>
            <span class="verse-text" v-html="highlightSyns(verse.verse_text)"></span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <i class="fa fa-circle-o-notch fa-spin fa-3x green"></i>
    </div>
  </div>
</template>

<script>
import bibleService from '../services/bible-service'

function l (text) {
  return text.toLowerCase()
}

export default {
  data () {
    return {
      query: '',
      fetchedQuery: '',
      loading: false,
      loadingSynonyms: false,
      filter: '',
      showAdvanced: false,
      pos: undefined,
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
      var re = new RegExp(`(${this.fetchedQuery})`, 'gi')
      var filterReg = new RegExp(`(${this.filter})`, 'gi')
      var t = this.filter ? text.replace(filterReg, '<span class="back-blue">$1</span>') : text
      return t.replace(re, '<span class="back-orange">$1</span>')
    },
    highlightSyns (text) {
      const pattern = `(${this.synonyms.join('|')})`
      var re = new RegExp(pattern, 'gi')
      var filterReg = new RegExp(`(${this.filter})`, 'gi')
      const t = this.filter ? text.replace(filterReg, '<span class="back-blue">$1</span>') : text
      return t.replace(re, '<span class="back-red">$1</span>')
    },
    togglePos (pos) {
      this.pos = this.pos === pos ? undefined : pos
      this.fetchSynonyms()
    },
    posClass (pos) {
      return this.pos === pos ? ['back-red'] : []
    },
    search () {
      this.loading = true

      const self = this
      bibleService.search(this.query)
      .then(results => {
        self.fetchedQuery = self.query
        self.results = results[1]
        self.loading = false
      })
      .catch(e => { self.loading = false })

      this.fetchSynonyms()
    },
    fetchSynonyms () {
      const self = this
      this.loadingSynonyms = true
      bibleService.synonyms(this.query, this.pos)
      .then(synonyms => {
        self.synonyms = synonyms.filter(s => !s.includes('antonym') && s.length > 2)
        bibleService.search(self.synonyms.join('|'))
        .then(results => {
          self.synResults = results[1]
          self.loadingSynonyms = false
        })
      })
      .catch(e => { self.loadingSynonyms = false })
    },
    toggleAdvanced () {
      this.showAdvanced = !this.showAdvanced
    }
  }
}
</script>

<style lang="less">
@import '../../static/less/common.less';

.search {
  height: 100%;
  .search-form {
    margin-top: 0%;
    transition: margin-top 0.7s;
    .filter {
      margin-left: 20px;
      button {
        margin-left: 20px;
      }
    }
  }
  .search-form.center {
    margin-top: 30%;
    form {
      padding: 20px 50px;
    }
  }
  form {
    padding: 20px 20px;
    border-radius: 2px;
    z-index: 100;
    button {
      margin-right: 7px;
    }
  }

  .advanced {
    padding: 5px 20px;
  }

  .results {
    .substance {
      padding-left: 5px;
      padding-right: 5px;
    }
    .verse {
      padding: 5px;
      margin-bottom: 8px;
      .back-orange, .back-red {
        padding-left: 1px;
        padding-right: 1px;
      }
      .reference {
        font-weight: bold;
      }
    }
    .title {
      padding: 5px 10px;
      z-index: 50;
    }
    .synonyms {
      transition: opacity 0.3s;
    }
  }
}
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;
  z-index: 1000;
  i {
    margin-top: 40%;
    text-shadow: 1px 0px 3px black;
  }
}
</style>
