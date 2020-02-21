import apiUserService from '../utils/apiUserService'

const answerService = {
  postAnswer: async (userId,majorId,data) => {
    let res = await apiUserService.post(`answer?userId=${userId}&majorId=${majorId}`,data)
    return res;
  },
  postAnswerMe: async (majorId,data) => {
    let res = await apiUserService.post(`/me/answer?majorId=${majorId}`,data)
    return res;
  }
}


export default answerService