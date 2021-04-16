<template>
  <div class="hello">
    <img src="../assets/logo.png" />
    <h1>{{ msg }}</h1>
    <h2>Popup组件</h2>
    <ul>
      <li>
        <router-link  :to="{path:'/demo1'}" >
          直接拼接内容
        </router-link>
      </li>
      <li>
        <router-link  :to="{path:'/demo2'}" >
          动态渲染组件
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Vue Leaflet Demo'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
