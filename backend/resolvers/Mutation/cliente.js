const bcrypt = require('bcrypt-nodejs')
const db = require('../../config/db')
const { cliente: obterCliente } = require('../Query/cliente')

const mutations = {
    registrarCliente(_, { dados }) {
        console.log(dados)

        return mutations.novoCliente(_, {
            dados: {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
                endereco: dados.endereco,
            }
        })
    },
    async novoCliente(_, { dados }, ctx) {
        ctx && ctx.validarAdmin()
        // criptografar a senha
        const salt = bcrypt.genSaltSync()
        dados.senha = bcrypt.hashSync(dados.senha, salt)

        const [id] = await db('clientes')
            .insert(dados)

        return db('clientes')
            .where({ id }).first()

    },
    async excluirCliente(_, args, ctx) {
        ctx && ctx.validarAdmin()
        try {
            const cliente = await obterCliente(_, args)
            if (cliente) {
                const { id } = cliente

                await db('clientes')
                    .where({ id }).delete()
            }
            return cliente
        } catch (e) {
            throw new Error(e.sqlMessage)
        }

    },
    async alterarCliente(_, { filtro, dados }, ctx) {
        ctx && ctx.validarClienteFiltro(filtro)
        try {
            const cliente = await obterCliente(_, { filtro })
            if (cliente) {
                const { id } = cliente

                if (dados.senha) {
                    // criptografar a senha
                    const salt = bcrypt.genSaltSync()
                    dados.senha = bcrypt.hashSync(dados.senha, salt)
                }

                await db('clientes')
                    .where({ id })
                    .update(dados)
            }
            return !cliente ? null : { ...cliente, ...dados }
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = mutations