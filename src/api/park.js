import request from '@/utils/request'

/**
 * 获取企业列表
 * @param {*} params {page,pageSize,name}
 * @returns
 */
export function getListAPI(params) {
  return request({
    url: '/park/enterprise',
    params
  })
}

/**
 * 获取行业列表
 * @returns
 */
export function getIndustryListAPI() {
  return request({
    url: '/park/industry'
  })
}

/**
 * 上传接口
 * @param {*} data
 * @returns
 */
export function uploadAPI(data) {
  return request({
    url: '/upload',
    method: 'POST',
    data
  })
}
