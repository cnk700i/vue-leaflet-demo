<template>
  <div class="vue-leaflet-container">
    <l-map ref="map" style="width: 100%; height: 100%" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution" />
      <template v-for="(marker, index) in markers">
        <l-marker :key="index" :lat-lng="marker.location">
          <l-popup :content="
              cardTemplate[0] +
                marker.name + // 传入站点名称
                cardTemplate[1] +
                marker.id + // 传入站点id
                cardTemplate[2]
            " />
        </l-marker>
      </template>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import L from 'leaflet'
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
      cardTemplate: [],
      stationAlarmNum: {'1': 10, '2': 8}
    }
  },
  created() {
    this.cardTemplate[0] = '<div id="stationName">'
    this.cardTemplate[1] = '</div><br>告警数量：<a id="alarmNum" href="javascript:void(0);" sid="'
    this.cardTemplate[2] = '">0&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a><br>'
    this.getMarks()
  },
  mounted() {
    var that = this
    this.$refs.map.mapObject.on('popupopen', function (e) {
      // 根据dom属性获取站点id，知道该弹窗属于哪个站点
      const sid = document.getElementById('alarmNum').getAttribute('sid')
      // 根据站点id获取该站点的告警数量，并更新弹窗页面内容
      document.getElementById('alarmNum').innerHTML = that.stationAlarmNum[sid]
      // dom元素点击事件，根据需要跳转
      document.getElementById('alarmNum').onclick = function (e) {
        const stationName = document.getElementById('stationName').innerHTML
        alert('点击marker为' + stationName)
      }
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
    }
  }
}
</script>
<style scoped>
.vue-leaflet-container {
  width: 100%;
  height: 100vh;
}
</style>
