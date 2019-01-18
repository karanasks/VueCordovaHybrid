// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// Wait for the deviceready event to start the render
document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady () {
  function readFromFile (fileName, cb) {
    var pathToFile = cordova.file.dataDirectory + fileName
    window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
      fileEntry.file(function (file) {
        var reader = new FileReader()

        reader.onloadend = function (e) {
          cb(JSON.parse(this.result))
        }

        reader.readAsText(file)
      }, errorHandler.bind(null, fileName))
    }, errorHandler.bind(null, fileName))
  }

  var fileData
  readFromFile('data.json', function (data) {
    fileData = data
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
