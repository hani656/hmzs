import request from '@/utils/request'

/**
 * 获取规则列表
 * @param {*} params
 * @returns
 */
export function getRuleListAPI(params) {
  return request({
    url: '/parking/rule/list',
    method: 'GET',
    params
  })
}

// 添加计费规则

export function addRuleAPI(data) {
  return request({
    url: '/parking/rule',
    method: 'POST',
    data
  })
}

// 回填编辑里的规则(查看详情计费规则)
export function getRuleDetailAPI(id) {
  return request({
    url: `/parking/rule/${id}`,
    method: 'GET'
  })
}

// 编辑计费规则

export function editRuleAPI(data) {
  return request({
    url: '/parking/rule',
    method: 'PUT',
    data
  })
}

// 删除计费规则

export function delRuleAPI(id) {
  return request({
    url: `/parking/rule/${id}`,
    method: 'DELETE'
  })
}
