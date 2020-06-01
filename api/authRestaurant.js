require('dotenv').config();
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const restaurant = await app.db('restaurants')
            .where({ email: req.body.email })
            .first()

        if (!restaurant) return res.status(400).send('Usuário não encontrado!')

        const isMatch = bcrypt.compareSync(req.body.password, restaurant.password)
        if (!isMatch) return res.status(401).send('Email/Senha inválidos!')

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: restaurant.id,
            name: restaurant.name,
            email: restaurant.email,
            description: restaurant.description,
            urlimage: restaurant.urlimage,
            street: restaurant.street,
            number: restaurant.number,
            cnpj: restaurant.cnpj,
            vegan: restaurant.vegan,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, process.env.secret)
        })
    }

    const validateToken = async (req, res) => {
        const restaurantData = req.body || null
        try {
            if(restaurantData) {
                const token = jwt.decode(restaurantData.token, process.env.secret)
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            // problema com o token
        }

        res.send(false)
    }

    return { signin, validateToken }
}