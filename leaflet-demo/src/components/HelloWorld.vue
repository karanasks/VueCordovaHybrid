<template>
  <div class="hello">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>    
    <button @click="openMap">Open Map</button>
  </div>  
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Leaflet demo app'
    }
  },
  methods: {
    openMap() {debugger
      this.$router.push("/LeafletMap");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
