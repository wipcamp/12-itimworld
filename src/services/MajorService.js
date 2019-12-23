import apiUserService from '../utils/apiUserService'

const majorService = {
  getAllMajors: async () => {
    let res = await apiUserService.get(`http://localhost:8080/majors`)
    return res;
  },
}

export default majorService