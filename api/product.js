module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    // const limit = 10

    const save = async (req, res) => {
        const product = { ...req.body }
        if(req.params.id) product.id = req.params.id

        try {
            existsOrError(product.name, 'Nome não informado')
            existsOrError(product.description, 'Descrição não informada')
            existsOrError(product.price, 'Preço não informado')
            existsOrError(product.restaurantId, 'Restaurante inválido')
            existsOrError(product.urlimage, 'Imagem não carregada')

        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(product.id) {
            app.db('products')
                .update(product)
                .where({ id: product.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('products')
                .insert(product)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('products')
            .whereNull('deletedAt')
            .then(products => res.json(products))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('products')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(product => res.json(product))
            .catch(err => res.status(500).send(err))
    }

    const getProductsByRestaurant = async (req, res) => {
        const result = await app.db('products').where({ restaurantId: req.params.id }).count('id').first()
        const count = parseInt(result.count)

        app.db('products')
            .where({ restaurantId: req.params.id })
            .whereNull('deletedAt')
            // .limit(limit)
            // .then(products => res.json({ data: products, count, limit }))
            .then(products => res.json({ data: products, count }))
            .catch(err => res.status(500).send(err))

    }

    const remove = async (req, res) => {
        try {
            const rowsUpdated = await app.db('products')
                .update({deletedAt: new Date()})
                .where({id: req.params.id})
            existsOrError(rowsUpdated, 'Produto não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, getProductsByRestaurant, remove }
}