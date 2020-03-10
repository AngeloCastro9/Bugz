module.exports = app => {
    const { existsOrError } = app.api.validation

    const limit = 10 // usado para paginação

    const getProductByRestaurant = async (req, res) => {
        console.log(req.params.id)
    }

    return { getProductByRestaurant }
}