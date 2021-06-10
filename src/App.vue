<template>
  <div id="app">
    <ViewPort></ViewPort>
  </div>
</template>

<script>
import ViewPort from './components/ViewPort.vue'
export default {
  name: 'App',
  components: {
    ViewPort
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
</style>
