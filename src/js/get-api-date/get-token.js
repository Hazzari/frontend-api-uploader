const { default: axios } = require('axios')
export const getToken = (url) => {

  const toastToken = document.querySelector('#toast_token')
  const toastModal = new bootstrap.Toast(toastToken)

  const formGetToken = document.querySelector('.form-get-token')

  formGetToken.addEventListener('submit', (el) => {
    el.preventDefault()
    toastModal.hide()
    document.querySelector('#toast-body-token').innerHTML = '<div></div>'

    let formData = new FormData(formGetToken)

    const tokenStatus = document.createElement('div')
    axios.post(`${ url }api/v1/token/both/`,
      formData).then((response) => {

      tokenStatus.innerText = `${ response.data.access }`

      document.querySelector('#toast-body-token').append(tokenStatus)

      toastModal.show()

      const getUploadForm = document.querySelector('.form-upload_file')

      getUploadForm['token'].value = response.data.access

    }).catch((error) => {
      const data = error.response.data

      let text_msg_err = `Ответ от сервера:`

      for (const key in data) {
        text_msg_err += `
          <p style="color: red">${ key } - ${ data[key] }</p>
        `
      }
      tokenStatus.innerHTML = text_msg_err
      document.querySelector('.message_token').append(tokenStatus)

    })
  })
}
