<template>
  <div id="detail">
    <header>
      <img id="header-bg" v-if="article.image" :src="`${path+article.image}`" alt="图片" />
      <div id="header-box">
        <div class="header-title">{{article.title}}</div>
        <div class="header-dec">{{article.condec}}</div>
      </div>
    </header>
    <div class="main">
      <h2>{{article.title}}</h2>
      <div class="time">
        <div class="time-tag">发布时间</div>
        <div class="create-time">
          <div>
            <span>今天</span>
            <br />
            {{article.createAt}}
          </div>
        </div>
      </div>
      <div class="main-box" id="main-box" ref="box">
        <div id="mainMd" v-html="compiledMarkdownHtml"></div>
      </div>
    </div>
    <div id="comment">
      <div class="c-box">
        <div class="area" ref="contentRef">
          <div class="userInfo">
            <div class="avatar" @click="setUserInfo">
              <!-- <img src="@/assets/image/avatar.png" alt="头像" /> -->
            </div>
            <div class="uname">{{uname ? uname : '燕过留名'}}</div>
          </div>
          <div v-show="isShow" class="comment-box">
            <textarea
              placeholder="到此一游咯~"
              class="content"
              v-model="commentCon"
              @blur="changeBlurHeight"
              @focus="changeFocusHeight"
            ></textarea>
            <transition name="fade">
              <button
                v-show="isShowButton"
                @click="isName"
                :style="!commentCon ? changeBgColor : ''"
              >发布</button>
            </transition>
          </div>
          <div v-show="!isShow" class="user-info">
            <p>
              <span class="c-title">报上名来</span>
              <span class="tips"></span>
            </p>
            <div class="inps">
              <div>
                <p>尊姓大名</p>
                <input type="text" @change="setUserLocal" v-model="uname" placeholder="昵称" />
              </div>
              <div>
                <p>邮箱</p>
                <input type="text" placeholder="邮箱" />
              </div>
            </div>
            <button @click="isShow = !isShow">确定</button>
          </div>
        </div>
      </div>

      <comment-item
        v-for="item in commentList"
        :key="item.id"
        :commentItem="item"
        @replyComment="replyCommentFun"
        typeInfo="comment"
      />
    </div>
    <footers />
  </div>
</template>

<script>
import store from '@/store/'

import footers from '@/components/footers'
import marked from 'marked'

import CommentItem from '@/components/CommentItem'

import { getArticle } from 'network/article'
import { comment, replyComment, getComment, getReplyName } from 'network/comment'

const rendererMD = new marked.Renderer()
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: true,
  smartLists: true,
  headerIds: true
})

export default {
  name: "BlogDetails",
  store, // vueX
  data () {
    return {
      articleId: this.$route.params.id,
      article: '',
      compiledMarkdownHtml: '',
      path: process.env.VUE_APP_URL + '/article/theme/',
      isShow: true,
      commentCon: '',
      uname: (this.$store.state.user ? this.$store.state.user.name : ''),
      commentList: [],
      isShowButton: false,
      changeBgColor: {
        backgroundColor: '#aaa'
      },
      replyNameCon: ''
    }
  },
  components: {
    footers,
    CommentItem
  },
  methods: {
    // 保存用户名
    setUserLocal () {
      this.$store.commit({
        type: 'setUser',
        user: {
          name: this.uname
        }
      })
    },
    async getName (commentId) {
      if (commentId) {
        const result = await getReplyName(commentId)
        return '@' + result.name
      }
    },
    setUserInfo () {
      this.isShow = !this.isShow
      if (!this.isShow) {
        this.$refs.contentRef.style.height = '160px'
      } else {
        this.$refs.contentRef.style.height = '114px'
      }
    },
    // 获取文章
    async getArticleFun () {
      const { result } = await getArticle(this.articleId)
      this.article = result[0]
      this.compiledMarkdown()
    },
    // 获取文章评论
    async getCommentList () {
      const result = await getComment(this.articleId)
      this.commentList = result
    },
    // 发布评论
    async releaseComment () {
      const result = await comment(this.articleId, this.uname, this.commentCon)
      // 刷新列表
      this.commentList = result
      this.isShowButton = false
      this.commentCon = ''
    },
    // 回复评论
    async replyCommentFun (commentId, name, content) {
      const result = await replyComment(this.articleId, name, content, commentId)
      this.commentList = result
    },

    // 是否有名字
    isName () {
      // 昵称和评论都有就发布
      if (this.commentCon && this.uname) {
        this.releaseComment()
        return
      }
      if (this.commentCon) {
        this.isShow = !this.isShow
      }
    },
    // 编译富文本
    compiledMarkdown () {
      this.compiledMarkdownHtml = marked(this.article.content, { sanitize: true })
    },
    // 获得焦点
    changeFocusHeight () {
      this.isShowButton = true
      this.$refs.contentRef.style.height = '160px'
    },
    // 失去焦点
    changeBlurHeight () {
      if (!this.commentCon) {
        this.isShowButton = false
        this.$refs.contentRef.style.height = '114px'
      }
      if (this.commentCon) {
        this.isShowButton = true
        this.$refs.contentRef.style.height = '160px'
      }
    }
  },
  created () {
    this.getArticleFun()
    this.getCommentList()
  }
}
</script>

<style scoped>
#detail {
  background-color: #fff;
}
header {
  position: relative;
  height: 300px;
  width: 100%;
  overflow: hidden;
}
#header-box {
  width: 90%;
  margin: auto;
  position: relative;
  top: 130px;
  color: #fff;
  z-index: 10;
}
.header-title {
  font-size: 28px;
}
.header-dec {
  width: 60%;
  font-size: 14px;
  margin-top: 20px;
}
#header-bg {
  width: 120%;
  height: 120%;
  position: absolute;
  top: -10px;
  left: -10px;
  filter: blur(10px);
  z-index: 0;
}
.main {
  width: 1200px;
  padding-top: 60px;
  padding-bottom: 50px;
  margin: auto;
  background-color: #fff;
}
.time {
  display: flex;
  width: 300px;
  border-radius: 4px;
  overflow: hidden;
  background: #edf0f2;
  margin-bottom: 50px;
}
.time > .time-tag {
  width: 88px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
  background-color: #2691d9;
}
.time .create-time > div {
  padding-top: 6px;
  font-size: 12px;
}
.time .create-time > div > span {
  font-weight: bold;
  font-size: 14px;
}
.main > h2 {
  padding: 16px 0;
}
.main-box {
  line-height: 30px;
}
.main-box p {
  font-size: 18px;
}
.main-box p > img {
  max-width: 100%;
}
.main-box >>> img {
  max-width: 100%;
  margin: 10px 0;
}

#comment {
  width: 100%;
  background: #5a6872;
  overflow: hidden;
  padding: 30px 0;
  padding-bottom: 100px;
}
.c-box {
  width: 90%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
}
.area {
  width: 100%;
  display: flex;
  padding-top: 10px;
  transition: all 0.3s;
  height: 114px;
  overflow: hidden;
}
.area > .userInfo {
  width: 80px;
  height: 80px;
  margin: 10px 20px;
  text-align: center;
}
.area > .userInfo > .avatar {
  width: 60px;
  height: 60px;
  margin: auto;
  border-radius: 4px;
  background: url('../assets/image/avatar.jpg');
  background-size: cover;
  overflow: hidden;
}
.area > .userInfo > .uname {
  margin-top: 4px;
}
.area > .comment-box {
  position: relative;
  flex: 1;
  padding: 20px;
  padding-top: 10px;
}

.comment-box:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 10px;
  top: 30px;
  width: 18px;
  height: 18px;
  border-left: 1px solid #cfcfcf;
  border-bottom: 1px solid #cfcfcf;
  background-color: #fff;
  border-radius: 2px;
  transform: rotate(45deg);
  z-index: 999;
}

.area > .comment-box > .content {
  position: relative;
  width: 98%;
  min-height: 60px;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  outline: none;
  line-height: 22px;
  padding: 12px;
  background-color: #fff;
}
.area > .comment-box > .content:before {
  content: ' ';
  display: block;
  position: absolute;
  left: -11px;
  top: 30px;
  width: 18px;
  height: 18px;
  border-left: 1px solid #cfcfcf;
  border-bottom: 1px solid #cfcfcf;
  background-color: #fff;
  border-radius: 2px;
  transform: rotate(45deg);
}
button {
  cursor: pointer;
  width: 80px;
  height: 40px;
  color: #fff;
  background-color: #029ffd;
  border: none;
  outline: none;
  border-radius: 4px;
  margin-top: 10px;
}

.user-info {
  flex: 1;
  color: #fff;
  background-color: #414548;
  margin: 10px;
}
.user-info > p {
  padding: 10px;
}
.user-info > p > .c-title {
  font-weight: bold;
  font-size: 14px;
}
.user-info > .inps {
  display: flex;
}
.user-info > .inps > div {
  flex: 1;
  font-size: 12px;
  margin-left: 10px;
}
.user-info > .inps > div > p {
  width: 90%;
}
.user-info > .inps > div > input {
  width: 90%;
  margin-top: 6px;
  height: 22px;
}
.user-info button {
  font-size: 12px;
  width: 40px;
  height: 30px;
  margin-left: 10px;
  margin-bottom: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>