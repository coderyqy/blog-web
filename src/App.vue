<template>
  <div id="app">
    <headers />
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="main-router-view" />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import headers from '@/components/headers'

export default {
  name: 'App',
  data () {
    return {
      transitionName: 'fold-left'
    }
  },
  components: {
    headers
  },
  watch: {
    // watch $route 决定使用哪种过渡
    '$route' (to, from) {
      //to、from是最基本的路由对象，分别表示从(from)某个页面跳转到(to)另一个页面,to.path（表示要跳转到的路由地址），from.path同理。
      const routerDeep = ['/', '/next1']
      //找到to.path和from.path在routerDeep数组中的下标
      const toDepth = routerDeep.indexOf(to.path)
      const fromDepth = routerDeep.indexOf(from.path)
      this.transitionName = toDepth > fromDepth ? 'fold-left' : 'fold-right'
    }
  },
  created () {
    window.console.log('虽不能至，心向往之。\r\n\r\n')
    window.console.log('%cfollow me %c https://github.com/coderyqy', 'color:red', 'color:green')
  }
}
</script>

<style>
@import 'assets/css/normalize.css';

.main-router-view {
  position: absolute;
}
/*   进 <---  */
.fold-left-enter-active {
  opacity: 0;
  transform: scale(1) translateY(220px);
  animation-name: fold-left-in;
  animation-delay: 0.8s;
  animation-duration: 0.8s;
}
.fold-left-leave-active {
  animation-name: fold-left-out;
  animation-duration: 1.3s;
}
@keyframes fold-left-in {
  0% {
    opacity: 0;
    transform: scale(1) translateY(220px);
    z-index: 99;
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0%);
    z-index: 99;
  }
}
@keyframes fold-left-out {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0px);
    z-index: 98;
  }
  60% {
    opacity: 1;
    transform: scale(0.88) translateY(30px);
  }
  70% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
    transform: scale(0.88) translateY(30px);
    z-index: 98;
  }
}
/*  进 --->  */
.fold-right-enter-active {
  opacity: 0;
  transform: scale(1) translateY(220px);
  animation-name: fold-left-in;
  animation-delay: 0.8s;
  animation-duration: 0.8s;
}
.fold-right-leave-active {
  animation-name: fold-left-out;
  animation-duration: 1.2s;
}
@keyframes fold-right-in {
  0% {
    opacity: 0;
    transform: scale(1) translateY(220px);
    z-index: 99;
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0%);
    z-index: 99;
  }
}
@keyframes fold-right-out {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0px);
    z-index: 98;
  }
  60% {
    opacity: 1;
    transform: scale(0.88) translateY(30px);
  }
  70% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
    transform: scale(0.88) translateY(30px);
    z-index: 98;
  }
}

#app {
  position: relative;
  width: 100%;
}
.main-router-view {
  width: 100%;
}
</style>
