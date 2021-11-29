const {default: axios} = require('axios')
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
        Authorization: `Bearer ${ formData.get('token') }`,
      },
    }
    formData.delete('token')

    axios.post(`${ url }api/v1/upload/`, formData, config).then((response) => {

      message.innerHTML = `
      <p>Файлы успешно загружены</p>
      `

    }).catch(function (error) {
      if (error.response.status === 500) {
        message.innerHTML = ` <p>Что то с token, попробуйте запросить новый</p> `
      } else if (error.response.status === 415) {
        let msg = ''
        let msgEl = document.createElement('ul')
        for (const errorElement of error.response.data) {
          msg += `<li>${ errorElement }</li>`
        }
        msgEl.innerHTML = msg

        message.append(msgEl)
        // message.innerHTML = msgEl

      } else if (error.request) {
        message.innerHTML = ` <p>Запрос неверен: ${ error.response.status } ${ error.response.headers }</p> `
      } else {
        message.innerHTML = ` <p>Ошибка: ${ error.message }</p> `
      }
    })
  })
}
