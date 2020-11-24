<template>
  <div id="app">
    <Overview msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Overview from './components/Overview.vue'

export default {
  name: 'App',
  components: {
    Overview
  }
}
</script>

<style>
@import './styles/global.scss';
</style>
