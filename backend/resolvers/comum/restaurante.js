const jwt = require('jwt-simple')

module.exports = {
    async getUsuarioLogado(restaurante) {
        const agora = Math.floor(Date.now() / 1000)

        const restauranteInfo = {
            id: restaurante.id,
            nome: restaurante.nome,
            email: restaurante.email,
            endereco: restaurante.endereco,
            iat: agora,
            exp: agora + (3 * 24 * 60 * 60)
        }

        const token = jwt.encode(restauranteInfo,
            process.env.APP_AUTH_SECRET)
        
        return {
            ...restauranteInfo,
            token
        }
    }
}