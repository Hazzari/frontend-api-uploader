import { getRegistrationDate } from './get-api-date/registration'
import { getToken } from './get-api-date/get-token'
import { uploadFile } from './get-api-date/upload-file'

const URL_API = 'http://18.221.147.170/'
// const URL_API = 'http://127.0.0.1:8000/'

window.addEventListener('DOMContentLoaded', () => {

  getRegistrationDate(URL_API)
  getToken(URL_API)
  uploadFile(URL_API)


})


