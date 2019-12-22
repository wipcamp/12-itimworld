import apiUserService from '../utils/apiUserService'

const answerService = {
  getAnswer: async (userId,majorId) => {
    let res = await apiUserService.get(`http://localhost:8080/user/${userId}/major/${majorId}/answer`)
    return res;
  },
  postAnswer: async (userId,majorId,data) => {
    let res = await apiUserService.post(`http://localhost:8080/user/${userId}/major/${majorId}/answer`,data)
    return res;
  },
}


export default answerService