const path = require('path')
const express = require('express')
const app = express()
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
app.use('/src', express.static(__dirname + '/src'))
app.use(express.static(__dirname + '/src'))
app.use(express.static(__dirname + '/src/assets'))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/src/index.html`)
})
console.log(`${__dirname}/src/index.html`)
app.listen(8080, () => {
  console.log('Application listening on port 8080!')
})
