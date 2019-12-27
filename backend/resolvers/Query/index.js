const restaurante = require('./restaurante')
const cliente = require('./cliente')

 module.exports = {
    ...restaurante,
    ...cliente,
 }