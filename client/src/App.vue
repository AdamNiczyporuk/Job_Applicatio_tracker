<template>
  <div id="app">
    <router-view></router-view>  <!-- Renderuje odpowiedni komponent w zależności od trasy -->
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
