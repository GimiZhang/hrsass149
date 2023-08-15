import request from '@/utils/request'

export const getDepartmentListApi = () => {
  return request({
    url: '/company/department'
  })
}

/**
 * 删除部门
 * @param {*} id
 * @returns
 */
export const delDepartmentApi = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
/**
 * 添加部门数据
 * @param {*} data
 * @returns
 */
export const addDepartmentApi = (data) => {
  return request({
    url: `/company/department`,
    method: 'post',
    data
  })
}
