const bcrypt = require('bcrypt-nodejs')
const db = require('../../config/db')
const { restaurante: obterRestaurante } = require('../Query/restaurante')

const mutations = {
    registrarRestaurante(_, { dados }) {
        return mutations.novoRestaurante(_, {
            dados: {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
                endereco: dados.endereco,
            }
        })
    },
    async novoRestaurante(_, { dados }, ctx) {
        ctx && ctx.validarAdmin()

        // criptografar a senha
        const salt = bcrypt.genSaltSync()
        dados.senha = bcrypt.hashSync(dados.senha, salt)

        const [ id ] = await db('restaurantes')
            .insert(dados)

        return db('restaurantes')
            .where({ id }).first()

    },
    async excluirRestaurante(_, args, ctx) {
        ctx && ctx.validarAdmin()
        try {
            const restaurante = await obterRestaurante(_, args)
            if(restaurante) {
                const { id } = restaurante

                await db('restaurantes')
                    .where({ id }).delete()
            }
            return restaurante
        } catch(e) {
            throw new Error(e.sqlMessage)
        }

    },
    async alterarRestaurante(_, { filtro, dados }, ctx) {
        ctx && ctx.validarRestauranteFiltro(filtro)
        try {
            const restaurante = await obterRestaurante(_, { filtro })
            if(restaurante) {
                const { id } = restaurante

                if(dados.senha) {
                    // criptografar a senha
                    const salt = bcrypt.genSaltSync()
                    dados.senha = bcrypt.hashSync(dados.senha, salt)
                }

                await db('restaurantes')
                    .where({ id })
                    .update(dados)
            }
            return !restaurante ? null : { ...restaurante, ...dados }
        } catch(e) {
            throw new Error(e)
        }
    }
}

module.exports = mutations