<template>
  <div id="headers" :style="changeHeaderStyle">
    <div class="logo-box">
      <div id="logo">Cloud</div>
      <div id="nav">
        <span class="link" :class="{ active: activeId == 1 }" @click="loadLink('/', 1)">首页</span>
        <span class="link" :class="{ active: activeId == 2 }" @click="loadLink('/blog', 2);">博文</span>
        <span class="link" :class="{ active: activeId == 3 }" @click="loadLink('/message', 3)">留言</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Headers",
  data () {
    return {
      changeHeaderStyle: {
        top: '18px',
        backgroundColor: "rgba(255,255,255,0)",
        boxShadow: "0 0 2px rgba(0,0,0,0), 0 0 10px rgba(0,0,0,0)"
      },
      activeId: 1,
    }
  },
  methods: {
    loadLink (path, id) {
      this.activeId = id
      this.$router.push(path)
    },
    handleScroll () {
      let top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset)
      if (top > 20) {
        this.changeHeaderStyle.backgroundColor = "rgba(255,255,255,1)"
        this.changeHeaderStyle.top = '0px',
          this.changeHeaderStyle.boxShadow = "0 0 2px rgba(0,0,0,.063), 0 0 10px rgba(0,0,0,.125)"
      } else {
        this.changeHeaderStyle.backgroundColor = "rgba(255,255,255,0)"
        this.changeHeaderStyle.top = '18px'
        this.changeHeaderStyle.boxShadow = "0 0 2px rgba(0,0,0,0), 0 0 10px rgba(0,0,0,0)"

      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style scoped>
#headers {
  position: fixed;
  left: 0;
  right: 0;
  top: 18px;
  z-index: 999;
  background: red;
  transition: all 0.3s;
}
.logo-box {
  width: 90%;
  display: flex;
  height: 56px;
  line-height: 56px;
  margin: auto;
  background-color: #fff;
}
#logo {
  width: 100px;
  height: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  background-color: #0d9af2;
}
#nav {
  margin-left: auto;
  margin-right: 20px;
}
#nav .link {
  position: relative;
  cursor: pointer;
  text-decoration: none;
  color: #000;
  font-size: 16px;
  font-weight: bold;
  padding: 0 20px;
}
#nav .link:before {
  content: '';
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  left: 17px;
  bottom: -5px;
  background: #0d9af2;
  transition: all 0.5s;
}
#nav .active {
  color: #0d9af2;
}
#nav .active:before {
  content: '';
  display: block;
  width: 40px;
  height: 1px;
  position: absolute;
  left: 17px;
  bottom: -5px;
  background: #0d9af2;
  transition: all 0.5s;
}
#nav .link:hover:before {
  width: 20px;
  height: 1px;
}
</style>