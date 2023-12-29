import request from '@/utils/request'

// 获取告警记录列表
export function getWarningListAPI(params) {
  return request({
    url: '/pole/warning/list',
    params
  })
}

// 查看告警详情
export function getWarningDetailAPI(id) {
  return request({
    url: `/pole/warning/${id}`,
    method: 'GET'
  })
}

// 删除告警记录
export function deleteWarningAPI(id) {
  return request({
    url: `/pole/warning/${id}`,
    method: 'DELETE'
  })
}

