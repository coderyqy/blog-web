<template>
  <div id="blog">
    <div class="img" :class="{loading: isLoad, loadingfinsh: !isLoad}" ref="bgref">
      <img @load="loadingImg" src="@/assets/image/bg.jpg" alt />
    </div>
    <div class="label-box" :style="changelabelStyle">
      <div class="item">
        <button class="label" @click="blogList = blogAllData">全部</button>
        <button
          v-for="(label,index) in labelList"
          :key="index"
          class="label"
          @click="getArticleByLabelName(label.name)"
        >{{label.name}}</button>
      </div>
    </div>
    <div class="main">
      <Stick v-if="blogList" :list="blogList" @onScrollEnd="loadMore">
        <template slot-scope="scope">
          <div class="card">
            <div
              class="con-box"
              @click="$router.push(`/blogdetails/${scope.data.id}`)"
              :title="scope.data.title"
            >
              <img v-if="scope.data.image" :src="path+scope.data.image" />
              <div class="dec">
                <h2>{{scope.data.title}}</h2>
                <p>{{scope.data.condec}}</p>
              </div>
            </div>
            <div v-if="scope.data.labels" class="item-tag">
              <span>tags</span>
              <a
                href="javascript:;"
                v-for="(label, i) in scope.data.labels"
                :key="i"
                @click="getArticleByLabelName(label.name)"
              >{{label.name}}</a>
            </div>
          </div>
        </template>
      </Stick>
    </div>
    <div>
      <router-view />
    </div>
    <footers />
  </div>
</template>

<script>
import footers from '@/components/footers'
// 瀑布流插件
import Stick from "vue-stick"
// 方法
import { getAllArticle, getArticleByLabelName } from "network/article"
import { getAllLabel } from "network/label"

export default {
  name: 'Blog',
  data () {
    return {
      isLoad: true,
      path: process.env.VUE_APP_URL + '/article/theme/',
      blogList: '',
      col: 3,
      labelList: [],
      blogAllData: [],
      changelabelStyle: {
        position: 'static'
      }
    }
  },
  components: {
    footers,
    Stick: Stick.component

  },
  methods: {
    loadingImg () {
      setTimeout(() => {
        this.isLoad = false
      }, 1500)
    },
    async setAllData () {

    },
    // 获取所有的文章
    async getAllBlog () {
      const { result } = await getAllArticle()
      // console.log(result[0])
      this.blogList = result[0]
      this.blogAllData = result[0]
    },
    // 获取所有的标签
    async getAllLabels () {
      const result = await getAllLabel()
      this.labelList = result
    },
    // 获取标签文章
    async getArticleByLabelName (name) {
      this.$router.push({ path: '/blog', query: { tag: name } })
      if (this.$route.query.tag) {
        const result = await getArticleByLabelName(this.$route.query.tag)
        this.blogList = result
      }
    },
    handleScroll () {
      let top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset)
      if (top > 240) {
        this.changelabelStyle.position = "fixed"
        this.changelabelStyle.top = '56px',
          this.changelabelStyle.boxShadow = "0 0 2px rgba(0,0,0,.063), 0 0 10px rgba(0,0,0,.125)"
      } else {
        this.changelabelStyle.position = "static"
      }
    },
    loadMore () {
      // console.log("----loadMore----------")
    }
  },
  watch: {
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  created () {
    this.getAllBlog()
    this.getAllLabels()
  }
}
</script>

<style scoped>
#blog {
  background-color: #dee3e7;
}
.img {
  width: 100%;
  height: 300px;
  overflow: hidden;
}
.img img {
  width: 100%;
  margin-top: -200px;
}
.main {
  width: 90%;
  margin: auto;
  margin-top: 20px;
  padding-bottom: 100px;
}
.blog-item {
  width: 200px;
  background: #fff;
}
.card {
  background: #fff;
}
.card img {
  width: 100%;
}
.card .dec {
  padding: 10px;
}
.card .dec h2 {
  text-align: center;
  font-weight: normal;
  padding: 10px 0;
  font-size: 16px;
}
.card .dec p {
  text-indent: 26px;
  font-size: 14px;
  color: rgb(136, 136, 136);
  line-height: 20px;
  padding: 10px 0;
}

.label-box {
  position: static;
  top: 0;
  width: 100%;
  height: 36px;
  line-height: 36px;
  padding: 10px 0;
  background-color: #fff;
  z-index: 99;
  transition: all 0.3s;
}
.label-box .item {
  width: 90%;
  margin: auto;
}
.label {
  cursor: pointer;
  padding: 2px 16px;
  border: 1px solid rgb(211, 211, 211);
  border-radius: 4px;
  margin: 0 10px;
  color: #000;
  font-size: 12px;
  background-color: #fff;
}
.item-tag {
  padding: 14px 10px;
  border-top: 1px solid #e7ebef;
  font-size: 12px;
  background: #f9fafb;
}
.item-tag a,
.item-tag span {
  color: #73828c;
  padding: 0px 4px;
  margin: 0 6px;
  text-decoration: none;
}
.item-tag a:hover {
  text-decoration: underline;
}

.con-box {
  cursor: pointer;
}

.item buttom {
  background: #fff;
}

.loading::before {
  display: block;
  content: '';
  width: 100%;
  height: 300px;
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
  height: 300px;
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
</style>
