<template>
  <div class="cross-references">
    <div class="hi-bottom topic-group theme-mid" v-for="(verseRefs, word) in crossReferences">
      <p class="topic callout-light">{{ word }}</p>
      <div class="verse hi-bottom" v-for="verseRef in verseRefs">
        <p class="verse-ref">{{ formatted(verseRef[0]) }}</p>
        <transition name="fade">
          <div class="verse-text" v-html="verseText(verseRef[0])"></div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bibleService from '../services/bible-service'

export default {
  name: 'CrossReferences',
  data () {
    return {
      verses: []
    }
  },
  computed: {
    ...mapGetters(['crossReferences'])
  },
  watch: {
    crossReferences () {
      const self = this
      var passages = []
      Object.values(this.crossReferences).forEach(v => {
        passages = passages.concat(v)
      })
      bibleService.fetchTexts(passages)
      .then(verses => {
        self.verses = verses
      })
    }
  },
  methods: {
    formatted (verseRef) {
      return verseRef
    },
    verseText (verseRef) {
      if (this.verses && this.verses.length) {
        const verseRange = verseRef.split('-')
        const passage = this.verses.find(v => v.start_verse_id.includes(verseRange[0]) && (verseRange.length === 2 ? v.end_verse_id.includes(verseRange[1]) : true))
        return passage ? passage.text : undefined
      }
      return undefined
    }
  }
}
</script>

<style lang="less">
.verse-text {
  h3.s1 {
    font-size: 18px;
    margin: 0;
  }
}
</style>

<style lang="less" scoped>
.cross-references {
  padding-left: 5px;
  overflow-x: visible;
}
.topic-group {
  z-index: 1;
}
.topic {
  padding: 8px;
  margin-left: -5px;
}
.verse {
  padding: 8px;
  margin-left: 10px;
  .verse-ref {
    font-weight: bold;
  }
  .verse-text {
    h3 {
      font-size: 18px;
      margin: 0;
    }
  }
  &:last-child {
    border-bottom: none;
  }
}
</style>
