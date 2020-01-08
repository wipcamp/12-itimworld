import apiUserService from '../utils/apiUserService'

const userService = {
  getUser: async (id) => {
    let res = await apiUserService.get(`/user/${id}`)
    return res;
  },
  putUser: async (data) => {
    let res = await apiUserService.put(`/user/120001`,data)
    return res
  }
}

export default userService