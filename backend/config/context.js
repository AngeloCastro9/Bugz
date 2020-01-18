const jwt = require('jwt-simple')

module.exports = async ({ req }) => {
    // Em desenvolvimento
    // await require('./simularUsuarioLogado')(req)

    const auth = req.headers.authorization
    const token = auth && auth.substring(7)

    let restaurante = null
    let admin = false
    
    if(token) {
        try {
            let conteudoToken = jwt.decode(token,
                process.env.APP_AUTH_SECRET)
            if(new Date(conteudoToken.exp * 1000) > new Date()) {
                restaurante = conteudoToken
            }
        } catch(e) {
            // token inválido
        }
    }

    const err = new Error('Acesso negado!')
    
    return {
        restaurante,
        admin,
        validarrestaurante() {
            if(!restaurante) throw err
        },
        validarAdmin() {
            if(!admin) throw err
        },
        validarRestauranteFiltro(filtro) {
            if(admin) return

            if(!restaurante) throw err
            if(!filtro) throw err

            const { id, email } = filtro
            if(!id && !email) throw err
            if(id && id !== restaurante.id) throw err
            if(email && email !== restaurante.email) throw err
        }
    }
}