import apiUserService from '../utils/apiUserService'

const answerService = {
  getAnswer: async (userId,majorId) => {
    let res = await apiUserService.get(`user/${userId}/major/${majorId}/answer`)
    return res;
  },
  postAnswer: async (userId,majorId,data) => {
    let res = await apiUserService.post(`user/${userId}/major/${majorId}/answer`,data)
    return res;
  },
}


export default answerService