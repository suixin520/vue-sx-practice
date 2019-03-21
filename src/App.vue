<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from 'components/m-header'
import Tab from 'components/tab'
export default {
  components: {
    MHeader,
    Tab
  }
}
</script>

<style lang="scss" scoped>
</style>
