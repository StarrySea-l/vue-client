// 引入axios
import axios from 'axios'
import {
  Message
} from 'element-ui'
import qs from 'qs'
const service = axios.create({
  // baseURL会自动地加载到接口地址上
  baseURL: window.BACKEND_SERVER_URL,
  // 指定请求超时的毫秒数，请求花费的时间超过timeout，请求则会被中断
  timeout: 1000,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: true, // default,
  // headers是即将被发送的自定义请求头
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data, headers) {
    return qs.stringify(data)
  }]
})

service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (!window.localStorage.getItem('token')) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      //   config.headers['X-Token'] = getToken()
    }
    console.log('config------------')
    console.log(config)
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default service

export function post (url, params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: params
    }).then((response) => {
      if (response.headers['content-type'] === 'text/html') {
        Message({
          message: '由于长时间没有操作，会话已超时',
          type: 'error',
          duration: 5 * 1000
        })
        setTimeout(function () {
          window.close()
        }, 2000)
        return
      }
      //  var data = response.body
      if (response.status === 200) {
        console.log(response)
        resolve(response.data)
      } else {
        console.log('error post')
      }
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}
