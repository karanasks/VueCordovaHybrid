<template>
  <div>      
      <div>
          <div>
              <h1>{{msg}}</h1>
          </div>

          <br />
          <input type="text" v-model="kmlUrl" placeholder="Enter url for KML">          
          <button @click="kmlGoClick">Go</button>          
          <button @click="refreshPage">Refresh Page</button>            

          <br />
          
          <label>Test KML 1:</label><div>https://storage.googleapis.com/cfb-documents/cityscape-3.kml</div>
          <br />
          <label>Test KML 2:</label><div>https://storage.googleapis.com/cfb-documents/cityscape-4.kml</div>          
          
          <br />          
          <div id='leafMap' ref='leafletMapArea'></div>          
      </div>      
  </div>
</template>

<script>   

export default {
    name: 'LeafletMap',    

    data () {
        return {
            msg: 'Leaflet Maps Demo',
            fileData: null,
            kmlUrl: ''
        }
    },

    methods: {
        
        kmlGoClick() {
            if(this.kmlUrl != '')
                this.plotKmlFromUrl()
            else
                alert('Enter URL for KML file.')
        },

        plotKmlFromUrl() {            
            L.mapbox.accessToken = 'pk.eyJ1Ijoia2FyYW5hc2tzIiwiYSI6ImNqcjBiajhieDBubXA0NXFxZHhkZG56YWgifQ.EZy14EoG6-82Qepje2p4dw';

            var osmUrl = "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            var osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            var osm = L.tileLayer(osmUrl, {
                maxZoom: 18,
                attribution: osmAttrib
            });

            // initialize the map on the "map" div with a given center and zoom
            var map = L.map("leafMap").setView([40, -75], 4).addLayer(osm);

            var runLayer = omnivore
            .kml(this.kmlUrl)
            .on("ready", function(event) {
                console.clear();            
                event.target.eachLayer(function(layer) {
                console.log(layer);
                let biadata = JSON.parse(layer.feature.properties.description),
                    bianame = layer.feature.properties.name;
                layer.bindTooltip(bianame);
                layer.bindPopup("<strong>" + bianame + "</strong>" + "<br>" + biadata.desc);
                switch(biadata.accessibility){
                    case 0:
                    layer.setStyle({color:'green'});
                    break;
                    case 1:
                    layer.setStyle({color:'yellow'});
                    break;
                    case 2:
                    layer.setStyle({color:'red'});
                    break;
                }
                });
                map.fitBounds(event.target.getBounds());                
            })
            .addTo(map);
        },

        refreshPage(){
            this.$router.go()            
        }

    }

}
</script>

<style scoped>
    body { margin:0; padding:0; }    
    #leafMap { height: 390px; }
</style>
