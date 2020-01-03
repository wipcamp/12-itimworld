import apiUserService from '../utils/apiUserService'

const majorService = {
  getAllMajors: async () => {
    let res = await apiUserService.get(`majors`)
    return res;
  },
  getMajorFromMajorId: async (majorId) => {
    let res = await apiUserService.get(`major/${majorId}`)
    return res;
  },
}

export default majorService