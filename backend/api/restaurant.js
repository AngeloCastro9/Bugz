module.exports = app => {

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

    return { get, getVeganRestaurants }
}