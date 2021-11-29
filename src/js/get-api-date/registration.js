const { default: axios } = require('axios')
export const getRegistrationDate = (url) => {

  const formRegistration = document.querySelector('.form-registration')

  formRegistration.addEventListener('submit', (el) => {
    el.preventDefault()
    document.querySelector('.message_register').innerHTML = '<div></div>'

    const formData = new FormData(formRegistration)

    const regStatus = document.createElement('div')
    formData.delete('password-repeat')
    axios.post(`${url}api/v1/users/`,
      formData).then(function (response) {
      regStatus.innerHTML = `
        <p>Регистрация прошла успешно</p>
        `
      document.querySelector('.message_register').append(regStatus)
      formRegistration.reset()
      setTimeout(() => {
        regStatus.remove()

      }, 3000)

    }).catch((error) => {

      const data = error.response.data

      let text_msg_err = `Ответ от сервера:`

      for (const key in data) {
        console.log(`${key} - ${data[key]}`)
        text_msg_err += `
          <p style="color: red">${key} - ${data[key]}</p>
        `
      }
      regStatus.innerHTML = text_msg_err
      document.querySelector('.message_register').append(regStatus)

    })

    // postData('http://127.0.0.1:8000/api/v1/users/', json).then((data) => {
    //

    // }).
    //   catch((data) => {console.log(data.message)})
  })
}
