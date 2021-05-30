import { request } from './request'

export function comment (articleId, name, content) {
  return request({
    url: `/comment/${articleId}`,
    method: "post",
    data: {
      name,
      content
    }
  })
}
// 回复评论
export function replyComment (articleId, name, content, commentId) {
  return request({
    url: `/comment/reply/${articleId}`,
    method: "post",
    data: {
      name,
      content,
      commentId
    }
  })
}
// 获取所有评论
export function getComment (articleId) {
  return request({
    url: `/comment/${articleId}`,
    method: "get"
  })
}
// 获取被评论者的名字
export function getReplyName (commentId) {
  return request({
    url: `/comment/replyname/${commentId}`,
    method: "get"
  })
}
