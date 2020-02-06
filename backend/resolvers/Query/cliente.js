const db = require('../../config/db')
const bcrypt = require('bcrypt-nodejs')
const { getClienteLogado } = require('../comum/clientes')

module.exports = {
    async loginCliente(_, { dados }) {
        const cliente = await db('clientes')
            .where({ email: dados.email })
            .first()

        if (!cliente) {
            console.log("ihu")
            throw new Error('Cliente/Senha inválido')
        }

        const saoIguais = bcrypt.compareSync(dados.senha,
            cliente.senha)

        if (!saoIguais) {
            throw new Error('Cliente/Senha inválido')
        }

        return getClienteLogado(cliente)
    },
    clientes(parent, args, ctx) {
        ctx && ctx.validarAdmin()
        return db('clientes')
    },
    cliente(_, { filtro }, ctx) {
        ctx && ctx.validarClienteFiltro(filtro)

        if (!filtro) return null
        const { id, email } = filtro
        if (id) {
            return db('cliente')
                .where({ id })
                .first()
        } else if (email) {
            return db('cliente')
                .where({ email })
                .first()
        } else {
            return null
        }
    },
}