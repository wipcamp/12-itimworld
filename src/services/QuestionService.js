import apiUserService from '../utils/apiUserService'

const questionService = {
  getQuestion: async (majorId) => {
    let res = await apiUserService.get(`http://localhost:8080/question/major/${majorId}`)
    return res;
  },
}

export default questionService