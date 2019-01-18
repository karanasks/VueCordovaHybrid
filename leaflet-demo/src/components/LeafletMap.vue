<template>
  <div>      
      <div>
          <div>
              <h1>{{msg}}</h1>
          </div>
          <div id='leafMap' ref='leafletMapArea'></div>
      </div>    
        
      <button @click="chooseFile">Choose File</button>

      <!-- Hidden Control -->
      <file-base64 :done="getFile" :multiple="false" ref="fileAttachment" style="display: none"></file-base64>
  </div>
</template>

<script>
    import FileBase64 from "../utils/FileBase64";

    export default {
    name: 'LeafletMap',

    components: {
        FileBase64
    },

    data () {
        return {
            msg: 'Leaflet Maps Demo'
        }
    },

    methods: {
        chooseFile() {
            this.$refs.fileAttachment.$el.click();
        },

        getFile(files) {debugger
            let data = {                
                type: "binary",
                data: files.base64,
                fileName: files.name,              
                filetype: files.type,
                filePath: files.path
            };  
            
            this.loadMap();
        },

        loadMap(){
            alert("started loading map")
        }    

    },

    mounted() {
            L.mapbox.accessToken = 'pk.eyJ1Ijoia2FyYW5hc2tzIiwiYSI6ImNqcjBiajhieDBubXA0NXFxZHhkZG56YWgifQ.EZy14EoG6-82Qepje2p4dw';
            

            // var map = L.map('leafMap').setView([51.505, -0.09], 13);

            // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // }).addTo(map);

            // L.marker([51.5, -0.09]).addTo(map)
            //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            //     .openPopup();


            var map = L.mapbox.map('leafMap', 'mapbox.streets');

            // omnivore will AJAX-request this file behind the scenes and parse it:
            // note that there are considerations:
            // - The file must either be on the same domain as the page that requests it,
            //   or both the server it is requested from and the user's browser must
            //   support CORS.

            // Internally this uses the toGeoJSON library to decode the KML file
            // into GeoJSON
            var runLayer = omnivore.kml('../assets/KML_Samples.kml')
                .on('ready', function() {
                    map.fitBounds(runLayer.getBounds());
                })
                .addTo(map);
        }    
        
    }
</script>

<style scoped>
    body { margin:0; padding:0; }
    /* #leafMap { position:absolute; top:0; bottom:0; width:50%; height: 50%;} */
    #leafMap { height: 390px; }
</style>
