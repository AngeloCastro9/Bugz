const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError, notInteger } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const restaurant = { ...req.body }
        if(req.params.id) restaurant.id = req.params.id

        try {
            existsOrError(restaurant.name, 'Nome não informado')
            existsOrError(restaurant.email, 'E-mail não informado')
            existsOrError(restaurant.street, 'Rua não informado')
            existsOrError(restaurant.number, 'Número não informado')
            notInteger(restaurant.number, "Númmero inválido")
            existsOrError(restaurant.neighborhood, 'Bairro não informado')
            existsOrError(restaurant.description, 'Descrição não informada')
            existsOrError(restaurant.password, 'Senha não informada')
            existsOrError(restaurant.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(restaurant.password, restaurant.confirmPassword,'Senhas não conferem')
            existsOrError(restaurant.cnpj, 'CNPJ não informados')
            notInteger(restaurant.cpf, "CNPJ inválido")

            const restaurantFromDB = await app.db('restaurants')
                .where({ email: restaurant.email }).first()

            if(!restaurant.id) {
                notExistsOrError(restaurantFromDB, 'Restaurante já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }


        restaurant.password = encryptPassword(restaurant.password)
        delete restaurant.confirmPassword

        if(restaurant.id) {
            app.db('restaurants')
                .update(restaurant)
                .where({ id: restaurant.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('restaurants')
                .insert(restaurant)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const limit = 10
    const get = async (req, res) => {

        const result = await app.db('restaurants').count('id').first()
        const count = parseInt(result.count)

        app.db('restaurants')
            .select('id', 'name', 'description')
            .limit(limit)
            .then(restaurants => res.json({ data: restaurants, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getVeganRestaurants = async (req, res) => {
        const result = await app.db('restaurants').where({ vegan: true }).count('id').first()
        const count = parseInt(result.count)

        app.db('restaurants')
            .select('id', 'name', 'description', 'street', 'number', 'neighborhood', 'cnpj')
            .where({ vegan: true })
            .limit(limit)
            .then(restaurants => res.json({ data: restaurants, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getVeganRestaurants }
}