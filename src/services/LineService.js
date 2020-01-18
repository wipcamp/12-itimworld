import api from '../utils/apiLineService'
// import Cookies from './CookieService'

const lineService = {
  lineLogin: async (code, nonce) => {
    let res = await api.get(`/auth?code=${code}&nonce=${nonce}`)
    return res;
  },
  getGenerateCode: async () => {
    let res = await api.get(`/getGenerateCode`)
    return res;
  }
}

export default lineService