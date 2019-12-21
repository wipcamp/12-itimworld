import apiUserService from '../utils/apiUserService'

const profileService = {
  getProfile: async (id) => {
    let res = await apiUserService.get(`http://localhost:7999/user/${id}`)
    return res;
  },
}

export default profileService