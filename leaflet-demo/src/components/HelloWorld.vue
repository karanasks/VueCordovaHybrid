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
    initMap() {       

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
            color: 'red',
            opacity: 1.0,
            fillOpacity: 1.0,
            weight: 2,
            clickable: false
        };
        L.Control.FileLayerLoad.LABEL = 'Up';
        control = L.Control.fileLayerLoad({
            fitBounds: true,
            layerOptions: {
                style: style,
                pointToLayer: function (data, latlng) {
                    return L.circleMarker(
                        latlng,
                        { style: style }
                    );
                }
            }
        });
        control.addTo(map);
        control.loader.on('data:loaded', function (e) {
            var layer = e.layer;
            console.log(layer);
        });
    }
   
  },

  mounted(){
    this.initMap()
  }
}
</script>