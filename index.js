const app = require('express')()

const cors = require('cors');

app.use(cors())

app.get('/teste', (req, res) => {
    return res.send('testado');
})

app.listen(3333, () => {
    console.log('Backend executando...')
})