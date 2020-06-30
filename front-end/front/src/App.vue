<template>
  <div id="app">
    <navbar/>
  </div>
</template>

<script>
// 
import navbar from './components/navbar.vue'

export default {
  name: 'App',
  components: {
    navbar
  }
}
</script>

<style>

body{
  margin:0;
  height: 100%;
}
#app {
  font-family: 'Roboto Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fc5185;
  background-image: linear-gradient( #f0f0f0,#f0f0f0);
  height: 100vh;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #dbdbdb; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: black; 
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #5e5e5e; 
}

</style>
