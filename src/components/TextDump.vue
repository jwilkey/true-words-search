<template>
  <div class="flex-column text-dump">
    <div class="text-input theme-mid flex-one shadow" contenteditable="true" @input="update($event.target.innerText)"></div>
    <button @click="fetchCrossReferences" class="callout-light shadow-long">submit</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'TextDump',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    ...mapActions(['setCrossReferences']),
    update (text) {
      this.text = text
    },
    fetchCrossReferences () {
      const self = this
      axios.post('http://localhost:3100/cross-reference', {text: this.text}, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        self.setCrossReferences(response.data)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.text-dump {
  margin: 0;
  button {
    height: 80px;
    border-radius: 0;
    &:hover {
      opacity: 0.7;
    }
  }
}
.text-input {
  padding: 10px;
  font-size: 16px;
  font-family: sans-serif;
  margin: 15px;
}
</style>
