<template>
  <div>      
      <div>
          <div>
              <h1>{{msg}}</h1>
          </div>
          <!-- <div id='map'></div> -->
      </div>    

        <!-- <div id="mydivpart"></div> -->
      <button @click="pickFile">Choose File</button>

      <!-- Hidden Control -->
      <file-base64 :done="getFiles" :multiple="false" ref="attachment" style="display: none"></file-base64>
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
        pickFile() {
        this.$refs.attachment.$el.click();
        },

        getFiles(files) {debugger
            let data = {
                name: files.name,
                type: "binary",
                datas: files.base64,
                datas_fname: files.name,
                // res_model: "mail.channel",
                // res_id: Number(this.channel.id),
                filetype: files.type,
                filePath: files.path
            };  
            
            this.loadMap();
        },

        loadMap(){
            alert("started loading map")
        }

        // onInitFs() {  
        //     console.log('Opened file system: ' );
        // },

        // selectFile() {
        //     alert("choosing file")     

        //     window.webkitStorageInfo.requestQuota(PERSISTENT, 1024*1024, function (grantedBytes) {  
        //         window.requestFileSystem(window.PERSISTENT, grantedBytes, this.onInitFs(), errorHandler);
        //     }, function (e) {
        //         console.log('Error', e);
        //     });

        //     // var type = window.TEMPORARY;
        //     // var size = 5*1024*1024;
        //     // window.requestFileSystem(type, size, successCallback, errorCallback)

        //     // function successCallback(fs) {
        //     //     fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
        //     //         alert('File creation successfull!')
        //     //     }, errorCallback);
        //     // }

        //     // function errorCallback(error) {
        //     //     alert("ERROR: " + error.code)
        //     // }


        //     // window.requestFileSystem(window.TEMPORARY, 0, function (fs) {
        //     //     console.log('file system open: ' + fs.name);
        //     //     fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry) {
        //     //         console.log("fileEntry is file?" + fileEntry.isFile.toString());
        //     //         // fileEntry.name == 'someFile.txt'
        //     //         // fileEntry.fullPath == '/someFile.txt'
        //     //         writeFile(fileEntry, null);
        //     //     }, this.onErrorCreateFile());

        //     // }, this.onErrorLoadFs());
        // },

        // onErrorCreateFile(){
        //     alert("Error creating file")
        // },

        // onErrorLoadFs(){
        //     alert("Error loading File System")
        // }
    
    },

    mounted() {
            // L.mapbox.accessToken = 'pk.eyJ1Ijoia2FyYW5hc2tzIiwiYSI6ImNqcjBiajhieDBubXA0NXFxZHhkZG56YWgifQ.EZy14EoG6-82Qepje2p4dw';
            // var map = L.mapbox.map('map', 'mapbox.streets');

            // //var map = L.map('map').setView([51.505, -0.09], 13);

            // // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            // //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // // }).addTo(map);

            // // L.marker([51.5, -0.09]).addTo(map)
            // //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            // //     .openPopup();


            // // omnivore will AJAX-request this file behind the scenes and parse it:
            // // note that there are considerations:
            // // - The file must either be on the same domain as the page that requests it,
            // //   or both the server it is requested from and the user's browser must
            // //   support CORS.

            // // Internally this uses the toGeoJSON library to decode the KML file
            // // into GeoJSON
            // var runLayer = omnivore.kml('../assets/KML_Samples.kml')
            //     .on('ready', function() {
            //         map.fitBounds(runLayer.getBounds());
            //     })
            //     .addTo(map);
        }    
        
    }
</script>

<style scoped>
    body { margin:0; padding:0; }
    /* #map { position:absolute; top:0; bottom:0; width:100%; } */
    /* #map { height: 390px; } */
</style>
