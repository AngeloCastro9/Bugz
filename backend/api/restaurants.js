module.exports = app => {
    const { existsOrError } = app.api.validation

    const limit = 10 // usado para paginação
    const get = async (req, res) => {

        const result = await app.db('restaurants').count('id').first()
        const count = parseInt(result.count)

        app.db('retaurants')
            .select('id', 'name', 'description')
            .limit(limit)
            .then(restaurants => res.json({ data: restaurants, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getVeganRestaurants = (req, res) => {
        app.db('restaurants')
            .where({ vegan: true })
            .then(restaurants => res.json({ data: restaurants }))
            .catch(err => res.status(500).send(err))
    }

    return { get, getVeganRestaurants }
}