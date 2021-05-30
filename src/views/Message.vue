<template>
  <div id="detail">
    <div id="comment" :class="{loading: isLoad, loadingfinsh: !isLoad}" ref="bgref">
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
              placeholder="留言~"
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
    </div>
    <div>
      <comment-item
        v-for="item in commentList"
        :key="item.id"
        :commentItem="item"
        @replyComment="replyMessageFun"
        typeInfo="message"
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

import { message, replyMessage, getMessage } from 'network/message'
import { getCssURL } from 'assets/js/cssBgURL'

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
      isLoad: true,
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
      }
    }
  },
  components: {
    footers,
    CommentItem
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
    },
    // 保存用户名
    setUserLocal () {
      this.$store.commit({
        type: 'setUser',
        user: {
          name: this.uname
        }
      })
    },
    setUserInfo () {
      this.isShow = !this.isShow
      if (!this.isShow) {
        this.$refs.contentRef.style.height = '160px'
      } else {
        this.$refs.contentRef.style.height = '114px'
      }
    },
    // 获取文章评论
    async getMessageList () {
      const result = await getMessage()
      if (result) {
        this.commentList = result
      }
    },
    // 发布留言
    async releaseMessage () {
      const result = await message(this.uname, this.commentCon)
      // 刷新列表
      this.commentList = result
      this.isShowButton = false
      this.commentCon = ''
    },
    // 回复留言
    async replyMessageFun (commentId, name, content) {
      const result = await replyMessage(name, content, commentId)
      this.commentList = result
    },

    // 是否有名字
    isName () {
      // 昵称和评论都有就发布
      if (this.commentCon && this.uname) {
        this.releaseMessage()
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
  mounted () {
    this.getBgImgUrl()
  },
  created () {
    this.getMessageList()
  }
}
</script>

<style scoped>
.loading::before {
  display: block;
  content: '';
  width: 100%;
  height: 500px;
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
  height: 500px;
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(250, 250, 250);
  z-index: 99;
  animation-name: fold-left-in;
  animation-duration: 1.3s;
  opacity: 0;
  z-index: -1;
}
@keyframes fold-left-in {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

#detail {
  background-color: #fff;
}

#comment {
  width: 100%;
  height: 500px;
  background: #5a6872;
  overflow: hidden;
  background: url(../assets/image/message.jpg) no-repeat center;
  background-size: cover;
  overflow: hidden;
}
.c-box {
  width: 70%;
  margin: auto;
  margin-top: 200px;
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