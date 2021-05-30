<template>
  <div id="footers">
    <footer>
      <div class="footer-box">
        <div class="motto">Cloud · 游戈在代码里的人生</div>
      </div>
      <div class="bottom">
        <div>关于</div>
        <div>归档</div>
        <div>Demo</div>
        <div>留言</div>
      </div>
      <div class="record">粤ICP202168928号-1</div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'Footers',
}
</script>

<style scoped>
footer {
  background: #161a1d;
  color: #fff;
  padding-bottom: 30px;
}
.footer-box {
  width: 90%;
  margin: auto;
}
.motto {
  color: #989898;
  padding: 20px;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.05);
}
.bottom {
  width: 90%;
  margin: auto;
  display: flex;
  padding-top: 30px;
}
.bottom > div {
  font-size: 12px;
  color: #505050;
  padding: 0 20px;
}
.record {
  width: 90%;
  margin: auto;
  font-size: 12px;
  color: #505050;
  padding-top: 20px;
  padding-left: 40px;
}
</style>
