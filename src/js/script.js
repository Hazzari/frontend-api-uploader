import { getRegistrationDate } from './get-api-date/registration'
import { getToken } from './get-api-date/get-token'
import { uploadFile } from './get-api-date/upload-file'
import { config } from './config'

const url = config.URL_API

window.addEventListener('DOMContentLoaded', () => {

  getRegistrationDate(url)
  getToken(url)
  uploadFile(url)

})


