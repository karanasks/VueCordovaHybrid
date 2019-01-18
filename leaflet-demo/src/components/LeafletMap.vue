<template>
  <div>      
      <div>
          <div>
              <h1>{{msg}}</h1>
          </div>
          <br />
          <button @click="chooseFile">Choose File</button>
          <br />
          <div id='leafMap' ref='leafletMapArea'></div>
          <!-- <img src='../assets/KML Samples/logo_dup.png' alt='image not found sorry'> -->
      </div>    
        
      

      <!-- Hidden Control -->
      <file-base64 :done="getFile" :multiple="false" ref="fileAttachment" style="display: none"></file-base64>
  </div>
</template>

<script
    src="http://cdn.leafletjs.com/leaflet-0.7/leaflet.js">
</script>
<script
    src="http://makinacorpus.github.io/Leaflet.FileLayer/leaflet.filelayer.js">
</script>
<script
    src="http://makinacorpus.github.io/Leaflet.FileLayer/togeojson/togeojson.js">
</script>

<script>
    import FileBase64 from "../utils/FileBase64";

    export default {
    name: 'LeafletMap',

    components: {
        FileBase64
    },

    data () {
        return {
            msg: 'Leaflet Maps Demo',
            fileData: null
        }
    },

    methods: {
        chooseFile() {
            this.$refs.fileAttachment.$el.click();
        },

        getFile(files) {debugger
            //var fileText = new Buffer(files.base64, 'base64').toString('ascii');
            this.fileData = {                
                type: "string",
                data: files.base64,
                fileName: files.name,              
                filetype: files.type,
                filePath: files.path,
                fileText: new Buffer(files.base64, 'base64').toString('ascii')
            };  
            
            // console.log(this.fileData)
            this.loadMap();
        },

        loadMap() {
            debugger
            //alert("started loading map")

            var kmlFilePath = this.fileData.filePath;            
            var kmlFileData = this.fileData.data;
            
            var kmlLocalUrl = '../assets/KML Samples/KmlSample2.kml';

            L.mapbox.accessToken = 'pk.eyJ1Ijoia2FyYW5hc2tzIiwiYSI6ImNqcjBiajhieDBubXA0NXFxZHhkZG56YWgifQ.EZy14EoG6-82Qepje2p4dw';

            //1
            // var map = L.mapbox.map('leafMap');
            // // .setView([38, -102.0], 5);

            
            // //omnivore.kml.parse(kmlFileData).addTo(map);

            // // omnivore will AJAX-request this file behind the scenes and parse it:
            // // note that there are considerations:
            // // - The file must either be on the same domain as the page that requests it,
            // //   or both the server it is requested from and the user's browser must
            // //   support CORS.

            // // Internally this uses the toGeoJSON library to decode the KML file
            // // into GeoJSON
            
            debugger
            // 2
            // var kmlFilePath = this.fileData.filePath;
            // var kmlFileData = this.fileData.data;
            // var kmlUrl = 'https://developers.google.com/kml/documentation/KML_Samples.kml';
            // var kmlLocalUrl = '../assets/KML Samples/KML_Samples.kml';

            //alert(kmlFilePath);

            // var runLayer = omnivore.kml.parse(kmlFileData)
            //     .on('ready', function() {
            //         //map.fitBounds(runLayer.getBounds());
            //     })
            //     .addTo(map);

            // 3
            //     L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //     attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            //     maxZoom: 18
            //     }).addTo(map);

            //  map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.
                                                                
            //  var kmlLayer = omnivore.kml(kmlLocalUrl, {async: true});
                                                                
            //  kmlLayer.on("loaded", function(e) { 
            //     map.fitBounds(e.target.getBounds());
            //  });
                                                    
            //  map.addLayer(kmlLayer);

            //4
            // var map = L.map('leafMap').fitWorld();

            //  L.Control.fileLayerLoad({
            //     // Allows you to use a customized version of L.geoJson.
            //     // For example if you are using the Proj4Leaflet leaflet plugin,
            //     // you can pass L.Proj.geoJson and load the files into the
            //     // L.Proj.GeoJson instead of the L.geoJson.
            //     layer: L.geoJson,
            //     // See http://leafletjs.com/reference.html#geojson-options
            //     layerOptions: {style: {color:'red'}},
            //     // Add to map after loading (default: true) ?
            //     addToMap: true,
            //     // File size limit in kb (default: 1024) ?
            //     fileSizeLimit: 1024,
            //     // Restrict accepted file formats (default: .geojson, .json, .kml, and .gpx) ?
            //     formats: [
            //         '.geojson',
            //         '.kml'
            //     ]
            // }).addTo(map);

            //5
            // var map = L.map('leafMap').setView([-41.2858, 174.78682], 14);
            // var mapLink = 
            //     '<a href="http://openstreetmap.org">OpenStreetMap</a>';
            // L.tileLayer(
            //     'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //     attribution: '&copy; ' + mapLink + ' Contributors',
            //     maxZoom: 18,
            //     }).addTo(map);

            // var style = {color:'red', opacity: 1.0, fillOpacity: 1.0, weight: 2, clickable: false};
            // L.Control.FileLayerLoad.LABEL = '<i class="fa fa-folder-open"></i>';
            // L.Control.fileLayerLoad({
            //     fitBounds: true,
            //     layerOptions: {style: style,
            //                 pointToLayer: function (data, latlng) {
            //                     return L.circleMarker(latlng, {style: style});
            //                 }},
            // }).addTo(map);


            //6
            // We’ll add a tile layer to add to our map, in this case it’s a OSM tile layer.
            // Creating a tile layer usually involves setting the URL template for the tile images
            var osmUrl = "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            var osmAttrib =
                '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            var osm = L.tileLayer(osmUrl, {
                maxZoom: 18,
                attribution: osmAttrib
            });

            // initialize the map on the "map" div with a given center and zoom
            var map = L.map("leafMap").setView([40, -75], 4).addLayer(osm);

            // Script for adding marker on map click
            function onMapClick(e) {
                var marker = L.marker(e.latlng, {
                    draggable: true,
                    title: "Resource location",
                    alt: "Resource Location",
                    riseOnHover: true
                })
                    .addTo(map)
                    .bindPopup(e.latlng.toString())
                    .openPopup();

                // Update marker on changing it's position
                marker.on("dragend", function(ev) {
                    var chagedPos = ev.target.getLatLng();
                    this.bindPopup(chagedPos.toString()).openPopup();
                });
            }

            map.on("click", onMapClick);

            var runLayer = omnivore
            .kml("https://storage.googleapis.com/cfb-documents/cityscape-4.kml")
            .on("ready", function(event) {
                console.clear();
            /*    console.log(event.target instanceof L.GeoJSON);
                console.log(event);
                event.target.options.onEachFeature = function(f,l){console.log(f);};
                console.log(event.target.options.onEachFeature);
            */
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
                //map.addLayer(event.target);
            })
            .addTo(map);

            let markers = [];
            for(let i=0;i<500;i++){
            markers.push(
                new L.Marker(
                [Math.random() * 180 - 90, Math.random() * 360 - 180]
                )
            );
            }
            map.addLayer(new L.LayerGroup(markers));
        },
        
        // onMapClick(e) {
        //     var marker = L.marker(e.latlng, {
        //         draggable: true,
        //         title: "Resource location",
        //         alt: "Resource Location",
        //         riseOnHover: true
        //     })
        //         .addTo(map)
        //         .bindPopup(e.latlng.toString())
        //         .openPopup();

        //     // Update marker on changing it's position
        //     marker.on("dragend", function(ev) {
        //         var chagedPos = ev.target.getLatLng();
        //         this.bindPopup(chagedPos.toString()).openPopup();
        //     });
        // }

    },

    mounted(){
        // this.loadMap();        
    }

    // mounted() {
    //         L.mapbox.accessToken = 'pk.eyJ1Ijoia2FyYW5hc2tzIiwiYSI6ImNqcjBiajhieDBubXA0NXFxZHhkZG56YWgifQ.EZy14EoG6-82Qepje2p4dw';
            

    //         // var map = L.map('leafMap').setView([51.505, -0.09], 13);

    //         // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //         //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //         // }).addTo(map);

    //         // L.marker([51.5, -0.09]).addTo(map)
    //         //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    //         //     .openPopup();


    //         var map = L.mapbox.map('leafMap', 'mapbox.streets');

    //         // omnivore will AJAX-request this file behind the scenes and parse it:
    //         // note that there are considerations:
    //         // - The file must either be on the same domain as the page that requests it,
    //         //   or both the server it is requested from and the user's browser must
    //         //   support CORS.

    //         // Internally this uses the toGeoJSON library to decode the KML file
    //         // into GeoJSON
    //         var runLayer = omnivore.kml('../assets/KML_Samples.kml')
    //             .on('ready', function() {
    //                 map.fitBounds(runLayer.getBounds());
    //             })
    //             .addTo(map);
    //     }    
        
    }
</script>

<style scoped>
    body { margin:0; padding:0; }
    /* #leafMap { position:absolute; top:0; bottom:0; width:50%; height: 50%;} */
    #leafMap { height: 390px; }
</style>
