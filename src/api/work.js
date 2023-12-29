import request from '@/utils/request'

/**
 * 获取园区信息
 * @returns
 */
export function getInfoAPI() {
  return request({
    url: '/home/workbench/info'
  })
}

// 首页-工作台-临期合同查询
export function getContractAPI(params) {
  return request({
    url: `/home/workbench/rentInfo?page=${params.page}&size=${params.pageSize}`,
    method: 'get'
  })
}
