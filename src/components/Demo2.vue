<template>
  <div class="vue-leaflet-container">
    <l-map id="lmap" ref="map" style="width: 100%; height: 100%" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution" />
      <template v-for="(marker, index) in markers">
        <l-marker :key="index" :lat-lng="marker.location" @click="handleMarkerClick(marker)">
          <l-popup :content="cardTemplate" :options="popupOptions" />
          <!-- 优化 -->
          <!-- <l-popup :content="cardTemplate[0] + marker.id + cardTemplate[1]" :options="popupOptions" /> -->
        </l-marker>
      </template>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import L from 'leaflet'
import Vue from 'vue'
import Pane from './Pane'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data() {
    return {
      zoom: 10,
      center: L.latLng(39.916706, 116.403694),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markers: [],
      text: 'this is a marker',
      cardTemplate: '<div id="pane">',
      // 优化
      // cardTemplate: ['<div id="pane_', '" />'],
      pane: null,
      stationAlarmNum: {'1': 10, '2': 8},
      // popup的options，这里只指定class，其它属性可以参考官网api文档
      popupOptions: {
        className: 'mypopup'
      }
    }
  },
  created() {
    this.getMarks()
  },
  mounted() {
    var that = this
    this.$refs.map.mapObject.on('popupopen', function(e) {
      that.pane.$mount('#pane')
      // 优化
      // that.pane.$mount('#pane_' + that.pane.id)
    })
  },
  methods: {
    getMarks() {
      this.$nextTick(() => {
        // 实际通过api获取点信息
        const marker1 = {
          location: L.latLng(39.916706, 116.403694),
          name: '测试站点1',
          id: '1'
        }
        const marker2 = {
          location: L.latLng(39.936706, 116.303694),
          name: '测试站点2',
          id: '2'
        }
        // 保存到markers，通过v-for初始化LMarker
        this.markers.push(marker1)
        this.markers.push(marker2)
      })
    },
    handleMarkerClick(station) {
      if (this.pane != null) {
        this.pane.$destroy()
      }
      var Component = Vue.extend(Pane)
      this.pane = new Component()
      this.pane.alarmNum = this.stationAlarmNum[station.id]
      this.pane.name = station.name
      this.pane.id = station.id
    }
  }
}
</script>
<style scoped>
.vue-leaflet-container {
  width: 100%;
  height: 100vh;
}

/* 弹出层内容 */
#lmap >>> .mypopup .leaflet-popup-content {
  margin: 0 auto !important;
  text-align: center;
  width: 120px !important;
  height: 100px !important;
  font-size: 14px;
}
</style>
