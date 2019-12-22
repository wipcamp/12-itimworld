import apiUserService from '../utils/apiUserService'

const profileService = {
  getProfile: async (id) => {
    let res = await apiUserService.get(`http://localhost:7999/user/${id}`)
    return res;
  },
  putProfile: async (data) => {
    let res = await apiUserService.put(`/user/1`,data)
    return res
  }
}

export default profileService