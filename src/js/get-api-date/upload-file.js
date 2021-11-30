const { default: axios } = require('axios')
export const uploadFile = (url) => {

  const formPostFile = document.forms.namedItem('file_upload')
  const message = document.querySelector('#message_upload')

  formPostFile.addEventListener('submit', (el) => {
    el.preventDefault()

    message.innerHTML = '<div></div>'
    let formData = new FormData(formPostFile)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${formData.get('token')}`,
      },
    }

    formData.delete('token')
    axios.post(`${url}api/v1/upload/`, formData, config).then((response) => {

      message.innerHTML = `
      <p>Файлы успешно загружены</p>
      `

    }).catch((error) => {
      if (error.response) {
        if (error.response.status == 415) {
          message.innerHTML = `<p>Файлы не прошли валидацию:<br> ${error.response.data}</p> `
        }
      } else if (error.request) {
        message.innerHTML = `<p>Ошибка запроса:<br> ${error.request}</p> `
      } else {
        // Something happened in setting up the request that triggered an Error
        message.innerHTML = `<p>Неизвестная ошибка :<br> ${error.message}</p> `
      }
    })
  })
}
