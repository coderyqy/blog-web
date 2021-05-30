import { request } from './request'
// 获取所有文章
export function getAllArticle () {
  return request({
    url: "/article",
    method: "get",
  })
}

// 获取单篇文章
export function getArticle (id) {
  return request({
    url: `/article/${id}/getArticle`,
    method: "get"
  })
}

// 根据标签名称获取文章
export function getArticleByLabelName (tag) {
  return request({
    url: `/article/label?tag=${tag}`,
    method: "get"
  })
}

