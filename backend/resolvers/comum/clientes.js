const jwt = require('jwt-simple')

module.exports = {
    async getClienteLogado(cliente) {
        const agora = Math.floor(Date.now() / 1000)

        const clienteInfo = {
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            senha: cliente.senha,
            endereco: cliente.endereco,
            iat: agora,
            exp: agora + (3 * 24 * 60 * 60)
        }

        const token = jwt.encode(clienteInfo,
            process.env.APP_AUTH_SECRET)
        
        return {
            ...clienteInfo,
            token
        }
    }
}