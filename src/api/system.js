import request from '@/utils/request'

/**
 * 获取角色列表
 * @param { page, pageSize} params
 * @returns
 */
export function getRoleListAPI(params) {
  return request({
    url: '/park/sys/role',
    params
  })
}

/**
 * 获取tree权限列表
 * @returns
 */
export function getTreeListAPI() {
  return request({
    url: '/park/sys/permision/all/tree'
  })
}

/**
 * 获取当前角色权限点列表
 * @returns
 */
export function getRoleDetailAPI(roleId) {
  return request({
    url: `/park/sys/role/${roleId}`
  })
}
/**
 * 获取角色成员列表
 * @returns
 */
export function getRoleUserAPI(roleId) {
  return request({
    url: `/park/sys/roleUser/${roleId}`
  })
}

/**
 * 创建角色
 * @param {*} data
 * @returns
 */
export function addRoleAPI(data) {
  return request({
    url: `/park/sys/role`,
    method: 'POST',
    data
  })
}

/**
 * 更改角色
 * @returns
 */
export function updateRoleAPI(data) {
  return request({
    url: `/park/sys/role`,
    method: 'PUT',
    data
  })
}

/**
 * 删除角色
 * @param {*} id
 * @returns
 */
export function delRoleAPI(id) {
  return request({
    url: `/park/sys/role/${id}`,
    method: 'DELETE'
  })
}
