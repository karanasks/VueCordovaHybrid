<template>
  <div>  
    <div id="map" style="width: 100%; height: 100%; display: block;"></div>   
  </div>  
</template>

<script>
export default {
  name: 'HelloWorld',  
  
  data () {
    return {
        
    }
  },

  methods: {

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        
        return color;
    },

    initMap() { debugger
        var kmlColor = this.getRandomColor();
        var control;
        var L = window.L;        
        var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; 2013 OpenStreetMap contributors'
        });
        var map = L.map('map', {
            center: [0, 0],
            zoom: 2
        }).addLayer(osm);

        var style = {
            color: 'blue',
            opacity: 1.0,
            fillOpacity: 1.0,
            weight: 2,
            clickable: false
        };        

        var overlayMaps = {};

        debugger
        L.Control.FileLayerLoad.LABEL = 'Up';
        control = L.Control.fileLayerLoad({
            fitBounds: true,
            layerOptions: {
                style: style,
                pointToLayer: function (data, latlng) {
                    debugger
                    return L.circleMarker(
                        latlng,
                        { style: style }
                    );
                },
                
                onEachFeature: function(feature, layer) {                   
                    // for assigning custom colour to KML
                    layer.defaultOptions.style.color = kmlColor;
                    
                    // Need to assign a random name in case it is not defined in the file. You may not need this.
                    var name = feature.properties.name;
                    if (typeof name === "undefined") {
                        name = "random" + Math.round(Math.random()*100);
                    }
                    
                    // layer.bindPopup( "Name: " + name);
                    
                    // Store the reference to each individual layer if you want to add them to the Layers Control as individual layers.
                    overlayMaps[name] = layer;
                }

                //overlayMaps[name] = layer
            }
        });
        control.addTo(map);
        control.loader.on('data:loaded', function (e) {           
            
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }

            kmlColor = color;
            
            // // Add to map layer switcher
            // // layerswitcher.addOverlay(e.layer, e.filename);

            // for (var i in overlayMaps) {            
            //     layerswitcher.addOverlay(overlayMaps[i], i)
            // }
            // overlayMaps = {};
        });
    }
   
  },

  mounted(){
    this.initMap()
  }
}
</script>