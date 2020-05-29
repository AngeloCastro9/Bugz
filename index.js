const express = require('express');
const app = express()

const consign = require('consign');
const db = require('./config/db');
const cors = require('cors');

app.db = db

app.use(cors())

app.use(express.static('./uploadedFiles'));

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.get('/teste', (req, res) => {
    return res.send('testado');
})

app.listen(process.env.PORT || 3001, () => {
    console.log('Backend executando...')
})