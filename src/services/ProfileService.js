import apiUserService from '../utils/apiUserService'

const profileService = {
  getProfile: async (id) => {
    let res = await apiUserService.get(`/user/${id}`)
    return res;
  },
  putProfile: async (data) => {
    let res = await apiUserService.put(`/user/1`,data)
    return res
  }
}

export default profileService