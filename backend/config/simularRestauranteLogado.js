const db = require('./db')
const { getRestauranteLogado } = require('../resolvers/comum/restaurante')

const sql = `
    select
        u.*
    from
        restaurantes u,
        restaurantes_perfis up,
        perfis p
    where
        up.restaurante_id = u.id and
        up.perfil_id = p.id and
        u.ativo = 1 and
        p.nome = :nomePerfil
    limit 1
`

const getRestaurante = async nomePerfil => {
    const res = await db.raw(sql, { nomePerfil })
    return res ? res[0][0] : null
}

module.exports = async req => {
    const restaurante = await getRestaurante('admin')
    if(restaurante) {
        const { token } = await getRestauranteLogado(usuario)
        req.headers = {
            authorization: `Bearer ${token}`
        }
    }
}