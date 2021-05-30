<template>
  <div class="comment-item">
    <div class="comment">
      <div class="c-box">
        <div class="area">
          <div class="userInfo">
            <div class="avatar">
              <!-- <img src="@/assets/image/avatar.png" alt="头像" /> -->
            </div>
            <!-- <div class="uname">{{uname ? uname : '燕过留名'}}</div> -->
          </div>
          <div class="white-area">
            <div class="comment-info">
              <div class="info">
                <span class="comment-user">{{item.commentuser.name}}</span>
                <span class="comment-time">
                  评论于
                  <small>{{item.createAt}}</small>
                </span>
                <a href="javascript:;" @click="isReply = !isReply">回复</a>
              </div>
              <div class="comment-con">
                <span class="replyname">{{replyNameCon}}</span>
                {{item.content}}
              </div>
            </div>
            <div v-if="isReply" class="reply" ref="replyRef">
              <div class="userInfo">
                <div class="avatar">
                  <!-- <img src="@/assets/image/avatar.png" alt="头像" /> -->
                </div>
                <div class="uname">{{uname ? uname : '燕过留名'}}</div>
              </div>
              <div v-show="isShow" class="comment-box">
                <textarea
                  class="content"
                  v-model="commentCon"
                  @blur="changeBlurHeight"
                  @focus="changeFocusHeight"
                ></textarea>
                <button @click="isName" :style="!commentCon ? changeBgColor : ''">发布</button>
              </div>
              <div v-show="!isShow" class="user-info">
                <p>
                  <span class="c-title">报上名来</span>
                  <span class="tips"></span>
                </p>
                <div class="inps">
                  <div>
                    <p>尊姓大名</p>
                    <input type="text" v-model="uname" placeholder="昵称" />
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
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/'

import { getReplyName } from 'network/comment'
import { getMessageReplyName } from 'network/message'

export default {
  name: "CommentItem",
  store,
  data () {
    return {
      isShow: true,
      commentCon: '',
      // uname: (this.$store.state.user ? this.$store.state.user.name : ''),
      isShowButton: false,
      isReply: false,
      changeBgColor: {
        backgroundColor: '#aaa'
      },
      item: this.commentItem,
      replyNameCon: ''
    }
  },
  props: {
    commentItem: Object,
    typeInfo: String
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
    setUserInfo () {
      this.isShow = !this.isShow
      if (!this.isShow) {
        this.$refs.contentRef.style.height = '160px'
      } else {
        this.$refs.contentRef.style.height = '114px'
      }
    },
    async getName () {
      if (this.item.commentId) {
        if (this.typeInfo == 'comment') {
          const result = await getReplyName(this.item.commentId)
          if (result) {
            this.replyNameCon = '@' + (result.name ? result.name : '')
          }
        }
        if (this.typeInfo == 'message') {
          const result = await getMessageReplyName(this.item.commentId)
          if (result) {
            this.replyNameCon = '@' + (result.name ? result.name : '')
          }
        }
      }
    },
    // 是否有名字
    isName () {
      // 昵称和评论都有就发布
      if (this.commentCon && this.uname) {
        this.$emit('replyComment', this.item.id, this.uname, this.commentCon)
        // 挂起输入框
        this.$refs.replyRef.style.height = '110px'
        this.commentCon = ''
        this.isReply = false
        return
      }
      if (this.commentCon) {
        this.isShow = !this.isShow
      }
    },
    // 获得焦点
    changeFocusHeight () {
      this.isShowButton = true
      this.$refs.replyRef.style.height = '160px'
    },
    // 失去焦点
    changeBlurHeight () {
      if (!this.commentCon) {
        this.isShowButton = false
        this.$refs.replyRef.style.height = '110px'
      }
      if (this.commentCon) {
        this.isShowButton = true
        this.$refs.replyRef.style.height = '160px'
      }
    }
  },
  computed: {
    uname () {
      return (this.$store.state.user ? this.$store.state.user.name : '')
    }
  },
  watch: {
    commentItem () {
      this.commentItem = this.commentItem
    }
  },
  created () {
    this.getName()
  }
}
</script>

<style scoped>
.comment {
  width: 100%;
  background: #5a6872;
  overflow: hidden;
}
.white-area {
  position: relative;
  flex: 1;
  background-color: #fff;
  min-height: 100px;
}
.white-area:before {
  content: ' ';
  display: block;
  position: absolute;
  left: -9px;
  top: 30px;
  width: 18px;
  height: 18px;
  background-color: #fff;
  border-radius: 2px;
  transform: rotate(45deg);
}
.comment-info {
  font-size: 14px;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
}
.comment-user {
  color: #395261;
  font-weight: bold;
}
.comment-time {
  color: #aaa;
}
.comment-con {
  margin-top: 30px;
  margin-bottom: 20px;
}
.info {
  position: relative;
}
.info a {
  position: absolute;
  right: 20px;
  text-decoration: none;
  color: rgb(80, 80, 80);
}
.c-box {
  width: 90%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
.reply {
  margin-top: 20px;
  display: flex;
  padding-top: 10px;
  background-color: #f1f3f4;
  overflow: hidden;
  height: 110px;
  transition: all 0.3s;
}
.area {
  width: 100%;
  display: flex;
}
.userInfo {
  width: 80px;
  height: 80px;
  margin: 10px 20px;
  text-align: center;
}
.userInfo > .avatar {
  width: 40px;
  height: 40px;
  margin: auto;
  border-radius: 4px;
  background: url('../assets/image/avatar.jpg');
  background-size: cover;
  overflow: hidden;
}
.userInfo > .uname {
  margin-top: 4px;
  font-size: 12px;
}
.comment-box {
  position: relative;
  flex: 1;
  padding: 20px;
  padding-top: 10px;
  padding-left: 0;
}
.comment-box:before {
  content: '';
  display: block;
  position: absolute;
  left: -10px;
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

.comment-box > .content {
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
.comment-box > .content:before {
  content: '';
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
.replyname {
  font-weight: bold;
}
</style>