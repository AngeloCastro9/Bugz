module.exports = app => {
    const { existsOrError } = app.api.validation

    const limit = 10 // usado para paginação
    const get = async (req, res) => {

        const result = await app.db('users').where({ is_restaurant: true }).count('id').first()
        const count = parseInt(result.count)

        app.db('users')
            .select('id', 'name', 'description')
            .where({ is_restaurant: true })
            .limit(limit)
            .then(restaurants => res.json({ data: restaurants, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getVeganRestaurants = async (req, res) => {
        const result = await app.db('users').where({ is_restaurant: true, vegan: true }).count('id').first()
        const count = parseInt(result.count)

        app.db('users')
            .select('id', 'name', 'description')
            .where({ is_restaurant: true, vegan: true })
            .limit(limit)
            .then(restaurants => res.json({ data: restaurants, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    return { get, getVeganRestaurants }
}