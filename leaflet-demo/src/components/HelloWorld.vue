<template>
  <div class="hello">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>   
    <br />
    <input type="text" v-model="kmlUrl" placeholder="Enter url for KML">              
    <button @click="openMap">Open Map</button>

    <!-- <div>Demo KMl files</div>
    <br />
    <label>Test KML 1:</label><div>https://raw.githubusercontent.com/karanasks/VueCordovaHybrid/master/leaflet-demo/src/assets/KML%20Samples/Sample11.kml</div>
    <br />
    <label>Test KML 2:</label><div>https://raw.githubusercontent.com/karanasks/VueCordovaHybrid/master/leaflet-demo/src/assets/KML%20Samples/Sample14.kml</div>  -->
  </div>  
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Leaflet demo app',
      kmlUrl: 'https://raw.githubusercontent.com/karanasks/VueCordovaHybrid/master/leaflet-demo/src/assets/KML%20Samples/Sample11.kml'
    }
  },
  methods: {
    openMap() {
      if(this.kmlUrl != ''){
        localStorage.kmlUrl =this.kmlUrl 
        this.$router.push("/LeafletMap");
      }
      else
        alert('Enter URL for KML file.')      
    }
  }
}
</script>