import request from '@/utils/request'

/**
 *  获取所有角色列表
 * @param {*} page  当前页
 * @param {*} pagesize  页数
 * @returns
 */
export const getRoleListApi = (page, pagesize) => {
  return request({
    url: '/sys/role',
    params: {
      page,
      pagesize
    }
  })
}

/**
 * 删除角色
 * @param {*} id
 * @returns
 */
export const delRolApi = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

/**
 * 添加角色
 * @param {*} form
 * @returns
 */
export const addRolApi = (form) => {
  return request({
    url: `/sys/role`,
    method: 'post',
    data: form
  })
}

/**
 * 根据id获取角色详情
 * @param {*} id
 * @returns
 */
export const getRolDetailApi = (id) => {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * 编辑角色信息
 * @param {*} id
 * @returns
 */
export const editRolApi = (form) => {
  return request({
    url: `/sys/role/${form.id}`,
    method: 'put',
    data: form
  })
}

