import {
  post
} from '@/utils/request'

// 登录
export function loginByUserName (params) {
  return post(
    '/login',
    params
  )
}
