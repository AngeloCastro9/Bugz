module.exports = app => {
    const { existsOrError } = app.api.validation

    const limit = 10

    const getProductsByRestaurant = async (req, res) => {
        const result = await app.db('products').where({ restaurantId: req.params.id }).count('id').first()
        const count = parseInt(result.count)

        app.db('products')
            .where({ restaurantId: req.params.id })
            .limit(limit)
            .then(products => res.json({ data: products, count, limit }))
            .catch(err => res.status(500).send(err))

    }

    return { getProductsByRestaurant }
}