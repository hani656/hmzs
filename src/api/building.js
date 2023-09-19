import request from '@/utils/request'

/**
 * 获取楼宇列表
 * @param {*} id
 * @returns
 */
export function getBuildingListAPI(params) {
  return request({
    url: '/park/building',
    params
  })
}

/**
 * 获取楼宇列表
 * @param {*} id
 * @returns
 */
export function getBuildingRentListAPI() {
  return request({
    url: '/park/rent/building'
  })
}

