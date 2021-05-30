<template>
  <div class="home">
    <div class="top" :class="{loading: isLoad, loadingfinsh: !isLoad}" ref="bgref">
      <div class="link-box">
        <div class="link">
          <a id="github-link" href="https://github.com/coderyqy" target="_blank">
            <svg
              t="1619828855938"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1123"
              width="32"
              height="32"
            >
              <path
                d="M511.968 73.152q119.424 0 220.288 58.848t159.712 159.712 58.848 220.288q0 143.424-83.712 258.016t-216.288 158.56q-15.424 2.848-22.848-4t-7.424-17.152q0-1.728 0.288-43.712t0.288-76.864q0-55.424-29.728-81.152 32.576-3.424 58.56-10.272t53.728-22.272 46.272-38.016 30.272-60 11.712-86.016q0-68-45.152-117.728 21.152-52-4.576-116.576-16-5.152-46.272 6.272t-52.576 25.152l-21.728 13.728q-53.152-14.848-109.728-14.848t-109.728 14.848q-9.152-6.272-24.288-15.424t-47.712-22.016-48.576-7.712q-25.728 64.576-4.576 116.576-45.152 49.728-45.152 117.728 0 48.576 11.712 85.728t30.016 60 46.016 38.272 53.728 22.272 58.56 10.272q-22.272 20.576-28 58.848-12 5.728-25.728 8.576t-32.576 2.848-37.44-12.288-31.712-35.712q-10.848-18.272-27.712-29.728t-28.288-13.728l-11.424-1.728q-12 0-16.576 2.56t-2.848 6.56 5.152 8 7.424 6.848l4 2.848q12.576 5.728 24.864 21.728t18.016 29.152l5.728 13.152q7.424 21.728 25.152 35.136t38.272 17.152 39.712 4 31.712-2.016l13.152-2.272q0 21.728 0.288 50.56t0.288 31.136q0 10.272-7.424 17.152t-22.848 4q-132.576-44-216.288-158.56t-83.712-258.016q0-119.424 58.848-220.288t159.712-159.712 220.288-58.848zM239.392 703.424q1.728-4-4-6.848-5.728-1.728-7.424 1.152-1.728 4 4 6.848 5.152 3.424 7.424-1.152zM257.12 722.848q4-2.848-1.152-9.152-5.728-5.152-9.152-1.728-4 2.848 1.152 9.152 5.728 5.728 9.152 1.728zM274.272 748.576q5.152-4 0-10.848-4.576-7.424-9.728-3.424-5.152 2.848 0 10.272t9.728 4zM298.272 772.576q4.576-4.576-2.272-10.848-6.848-6.848-11.424-1.728-5.152 4.576 2.272 10.848 6.848 6.848 11.424 1.728zM330.848 786.848q1.728-6.272-7.424-9.152-8.576-2.272-10.848 4t7.424 8.576q8.576 3.424 10.848-3.424zM366.848 789.728q0-7.424-9.728-6.272-9.152 0-9.152 6.272 0 7.424 9.728 6.272 9.152 0 9.152-6.272zM399.968 784q-1.152-6.272-10.272-5.152-9.152 1.728-8 8.576t10.272 4.576 8-8z"
                p-id="1124"
                fill="#ffffff"
              />
            </svg>
            <span>GitHub</span>
          </a>
          <a id="blog-link" href="javascript:;" @click="$router.push('/blog')">进入博客</a>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="app-viewport">
        <h2 class="section-title">关于我，关于博客</h2>
        <p class="section-subtitle">一段2021年开始用起来的自我介绍</p>
        <p class="about-me">
          90后双子座普通男青年！现于就读于一所普通大学的计算机网络技术专业，
          <br />思维欠发达，差点迷失于错综复杂的选择中，相信在前端行业能实现自己的价值
          <br />喜欢敲代码的感觉，相信编程是一门艺术
          <br />自诩为游弋在代码里的人生
        </p>
      </div>
    </div>
    <footers />
  </div>
</template>

<script>
import footers from '@/components/footers'

import { getCssURL } from 'assets/js/cssBgURL'
export default {
  name: 'Home',
  components: {
    footers
  },
  data () {
    return {
      isLoad: true
    }
  },
  methods: {
    getBgImgUrl () {
      const url = getCssURL(this.$refs.bgref)
      new Promise((resolve, reject) => {
        let image = new Image()
        image.onload = () => {
          resolve()
        }
        image.src = url
      }).then(() => {
        setTimeout(() => {
          this.isLoad = false
        }, 1500)
      }).catch((err) => {
      })
    }
  },
  mounted () {
    this.getBgImgUrl()
  },
  created () {
  }
}
</script>

<style scoped>
.top {
  position: relative;
  width: 100%;
  height: 400px;
  background: url(../assets/image/index2.jpg) no-repeat center;
  background-size: cover;
}
.top::after {
  display: block;
  content: ' ';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 0;
}
.loading::before {
  display: block;
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(250, 250, 250);
  z-index: 99;
}

.loadingfinsh::before {
  display: block;
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(250, 250, 250);
  z-index: 99;
  animation-name: fold-left-in;
  animation-duration: 1.3s;
  opacity: 0;
  z-index: 1;
}
@keyframes fold-left-in {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.link {
  display: flex;
  position: absolute;
  top: 200px;
  left: 0;
  right: 0;
  width: 600px;
  margin: auto;
  align-items: center;
  justify-content: center;
  z-index: 98;
}
.link > a {
  display: block;
  width: 250px;
  padding: 10px;
  text-align: center;
  color: #fff;
  border-radius: 40px;
  margin: 0 20px;
}
#github-link {
  background-image: linear-gradient(
    90deg,
    rgba(59, 106, 175, 0.5),
    rgba(15, 139, 211, 0.5)
  );
}
.link > a > span {
  padding-left: 10px;
  vertical-align: 9px;
  font-size: 16px;
}
.link > #blog-link {
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  padding: 0;
  border: 1px solid #eee;
}

.center {
  width: 100%;
  height: 200px;
  padding: 50px 0;
  background: #fff;
}
.app-viewport {
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1320px;
  width: 100%;
  text-align: center;
}
.section-title {
  padding: 10px 0;
  font-weight: normal;
}
.app-viewport {
  line-height: 30px;
}
</style>
