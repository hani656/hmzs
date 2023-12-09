import request from '@/utils/request'

// 获取区域列表  /parking/area/list
// page pageSize

export function getAreaListAPI(params) {
  return request({
    url: '/parking/area/list',
    params
  })
}

// 获取计费规则下拉列表

export function getRuleSelectListAPI() {
  return request({
    url: '/parking/rule/dropList'
  })
}

// 添加区域
export function addAreaAPI(data) {
  return request({
    url: '/parking/area',
    method: 'post',
    data
  })
}

// 编辑区域
export function editAreaAPI(data) {
  return request({
    url: '/parking/area',
    method: 'put',
    data
  })
}

// 删除区域
export function deleteAreaAPI(id) {
  return request({
    url: `/parking/area/${id}`,
    method: 'delete'
  })
}
