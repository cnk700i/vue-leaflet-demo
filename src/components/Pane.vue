<template>
  <div id="staionPane">
    <div id="stationName">{{ name }}</div>
    <div>
      <span>告警数量：</span>
      <a id="alarmNum" @click="handleClick">{{ alarmNum }}</a>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      name: '',
      id: null,
      alarmNum: 0
    }
  },
  mounted() {
    console.log(this.roomData)
    console.log(this.batteryDevices)
  },
  methods: {
    handleClick() {
      alert(this.alarmNum)
    }
  }
}
</script>
<style scoped>
#stationName {
  margin-top: 20px;
}
</style>
