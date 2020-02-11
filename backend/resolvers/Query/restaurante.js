const db = require('../../config/db')
const bcrypt = require('bcrypt-nodejs')
const { getRestauranteLogado } = require('../comum/restaurante')

module.exports = {
    async loginRest(_, { dados }) {
        const restaurante = await db('restaurantes')
            .where({ email: dados.email })
            .first()

        if(!restaurante) {
            throw new Error('Restaurante/Senha inválido')
        }
        console.log(dados.senha + "____" + restaurante.senha)
        const saoIguais = bcrypt.compareSync(dados.senha,
            restaurante.senha)

        if(!saoIguais) {
            throw new Error('Restaurante/Senha inválido')
        }

        return getRestauranteLogado(restaurante)
    },
    restaurantes(parent, args, ctx) {
        ctx && ctx.validarAdmin()
        return db('restaurantes')
    },
    restaurante(_, { filtro }, ctx) {
        ctx && ctx.validarRestauranteFiltro(filtro)
        
        if(!filtro) return null
        const { id, email } = filtro
        if(id) {
            return db('restaurantes')
                .where({ id })
                .first()
        } else if(email) {
            return db('restaurantes')
                .where({ email })
                .first()
        } else {
            return null
        }
    },
}