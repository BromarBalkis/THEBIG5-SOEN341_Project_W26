const express = require('express')
const { encryptPassword, decryptPassword } = require('./auth/auth')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', express.json(), (req, res) => {
  const password = req.body.password
  const result = decryptPassword(password)
  if (!result){
    res.status(401).send("Incorrect Password or Email")
  } else{
    res.send('Logging in...')
  }
})

app.post('/register', express.json(), (req, res) => {
  const password = req.body.password

  encryptPassword(password)
  res.send('Register Mode')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})