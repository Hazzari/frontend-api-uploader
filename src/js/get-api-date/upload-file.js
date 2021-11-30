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

      message.innerHTML = `<p>Файлы успешно загружены</p>`

      formPostFile.reset()
      setTimeout(() => {
        message.remove()
      }, 3000)

    }).catch((error) => {
      if (error.response) {
        message.innerHTML = `<p>Файлы не прошли валидацию:<br> ${error.response?.data}</p>`
      } else if (error.request) {
        message.innerHTML = `<p>Ошибка запроса:</p> `
      } else {
        message.innerHTML = `<p>Неизвестная ошибка :<br> ${error.message}</p> `
      }
    })
  })
}
