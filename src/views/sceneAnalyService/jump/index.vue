
<template>
  <div class="wrap">
    <!-- <iframe ref="iframe" class="app-down" src="http://localhost/appManagementPlatform/NoLogin?token=BearereyJhbGciOiJIUzUxMiJ9.eyJkYXRhIjoiYWRtaW4iLCJleHAiOjE2MzIzNTk3Nzg0NzV9.zdt386XTS-Xx0ioxZjOTjR2Nn5y_H0ohujg2d3R3QxbdFSoEND5x6x9Pv8zIj1pNWkoqXRqJy4QI9WqsjfKxPg" frameborder="0" scrolling="yes"></iframe> -->
    <iframe ref="iframe" class="app-down" :src="src" frameborder="0" scrolling="yes"></iframe>
    <div ref="hha"></div>
  </div>
</template>
<script>
export default {
  name: "jump",
  data() {
    return {
      src: ""
    };
  },
  created() {
    console.log(787);
    let duanToken =
      "BearereyJhbGciOiJIUzUxMiJ9.eyJkYXRhIjoiYWRtaW4zIiwiZXhwIjoxNjMyODAzMTk4NTMxfQ.VQHxPxzTAuCqGyoziKLOYdCSbqoZOIqaK3LhIrUpOxri_qtr9VntTW1bKttzmNYDLyPHAH8K2Mvfju2SfGuxcg"
       setTimeout(_ => {
      this.src =
        // "http://localhost:8119/appManagementPlatform/index.html"
        // "http://localhost:8119/appManagementPlatform/NoLogin?token=" +
        "http://localhost/NoLogin?token=" +
        // "http://www.newbigdata.net:8888/appManagementPlatform/NoLogin?token=" +
        duanToken;
    }, 900);
  },
  mounted() {
    this.$refs.hha.onload = _ => {
      console.log(_);
    };
  },
  methods: {
    sendMessage() {
      console.log(this);
      let mapFrame = this.$refs["iframe"];
      let iframeWin = mapFrame.contentWindow;
      iframeWin.postMessage(
        {
          wzf: "dfgdgdhd"
        },
        "*"
      );
    }
  }
};
</script>
<style scoped lang='scss'>
.app-down {
  width: 100%;
  height: 100%;
}
</style>