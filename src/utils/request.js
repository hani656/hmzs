import axios from 'axios'
// 1. 通用配置
// 2. 定制化的配置

// 通用配置

// 1. axios实例化 axios.create()  基地址配置baseURL + 超时时间timeout(100ms)
// 拓展一下:create方法可以调用多次 每次执行都会生成一个独一无二的实例
// export default const a = axios.create({baseURL:'a.com'})
// export default const b =  axios.create({baseURL:'b.com'})

// 2. 请求拦截器  请求头中添加token数据 接口鉴权 统一配置
// 客户端发送请求 - 请求拦截器(针对请求参数做处理) - 后端
// 拓展一下: 可以添加多个请求拦截器
// 客户端请求 -> 拦截器一(处理参数) -> 拦截器二 -> 后端

// 3. 响应拦截器  数据剥离res.data / 401错误处理 / 前端自定义错误处理？如果后端不管接口成功还是失败统一返回200
// 后端 -> 响应拦截器 -> 客户端
// 成功回调 200 - 300
// 失败回调 不在这个之间

const service = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/v1',
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
