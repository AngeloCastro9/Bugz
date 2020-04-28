const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
app.get('/teste', (req, res) =>{
    return res.send('Funcionando');
})

app.listen('3333');