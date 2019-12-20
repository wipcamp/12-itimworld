import apiUserService from '../utils/apiUserService'

const profileService = {
  getProfile: async (id) => {
    let res = await apiUserService.get(`/user/${id}`)
    return res;
  },
}

export default profileService