<template>
  <div class="vfull flex-row">
    <text-dump class="flex-one"></text-dump>
    <cross-references class="theme-mid shadow"></cross-references>
  </div>
</template>

<script>
import TextDump from '../components/TextDump'
import CrossReferences from '../components/CrossReferences'

export default {
  name: 'TextCrossReference',
  components: { TextDump, CrossReferences }
}
</script>

<style lang="less" scoped>
.cross-references {
  border-left: solid 1px #bbb;
  margin-bottom: 100px;
  max-width: 40%;
}
.flex-row {
  & > * {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
