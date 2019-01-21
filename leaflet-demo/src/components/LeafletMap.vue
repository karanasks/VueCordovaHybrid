<template>
  <div>      
      <div>            
          <div>
              <span @click="moveBack" style="float: left;"><i class="material-icons">keyboard_backspace</i></span>
              <h4>{{msg}}</h4>
          </div>

          <div id='leafMap' ref='leafletMapArea'></div>          
      </div>      
  </div>
</template>

<script>   

export default {
    name: 'LeafletMap',    

    data () {
        return {
            msg: 'Map Viewer',            
            kmlUrl: ''
        }
    },

    methods: {

        loadKml() { 
            this.kmlUrl = localStorage.kmlUrl;
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

        moveBack(){
            this.$router.go(-1)            
        }
                
    },

    mounted(){
        this.loadKml();
    }

}
</script>

<style scoped>
    body { margin:0; padding:0; }    
    #leafMap { height: 590px; }
</style>
