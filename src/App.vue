<template>
    <div class="form-container">
      <order/>
  </div>
</template>

<script>
import Order from './components/Order'

export default {
  name: 'App',
  components: {
    Order
  }
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
