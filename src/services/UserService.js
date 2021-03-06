import apiUserService from '../utils/apiUserService'

const userService = {
  getUser: async (id) => {
    let res = await apiUserService.get(`/user/${id}`)
    return res;
  },
  putUser: async (id,data) => {
    let res = await apiUserService.put(`/user/${id}`,data)
    return res
  },
  postUser: async (data) => {
    let res = await apiUserService.post(`/user`, data)
    return res
  },
  getMe: async () => {
    let res = await apiUserService.get(`/me`)
    return res;
  },
  putMe: async (data) => {
    let res = await apiUserService.put(`/me`,data)
    return res
  },
  postStatusMe: async (data) => {
    let res = await apiUserService.post(`/me/status`, data)
    return res
  },
  postGeneralAnswer: async (id,data) => {
    let res = await apiUserService.post(`/user/${id}/general`,data)
    return res
  },
  postGeneralAnswerMe: async (data) => {
    let res = await apiUserService.post(`/me/general`,data)
    return res
  },
  postStatus: async (id,data) =>{
    let res = await apiUserService.post(`/user/${id}/status`,data)
    return res
  },
  uploadDocument: async (id,data,header = {}) => {
    let res = await apiUserService.post(`/user/${id}/uploadDocument`,data,header)
    return res
  },
  uploadDocumentMe: async (data,header = {}) => {
    let res = await apiUserService.post(`/me/uploadDocument`,data,header)
    return res
  },
  getDocument: async (id = {}) => {
    let res = await apiUserService.get(`/user/${id}/uploadDocument`)
    return res
  },
  getDocumentMe: async () => {
    let res = await apiUserService.get(`/me/uploadDocument`)
    return res
  }
}

export default userService