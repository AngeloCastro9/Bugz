const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    
    app.post('/signupRestaurant', app.api.restaurant.save)
    app.post('/signinRestaurant', app.api.authRestaurant.signin)
    
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.category.get))
        .post(admin(app.api.category.save))

    // Cuidado com ordem! Tem que vir antes de /categories/:id
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))

    app.route('/restaurants')
        .post(app.api.user.save)
        .get(app.api.restaurant.get)

    app.route('/veganRestaurants')
        .get(app.api.restaurant.getVeganRestaurants)

    app.route('/products')
        .post(app.api.product.save)
        .get(app.api.product.get)

    app.route('/products/:id')
        .put(app.api.product.save)
        .get(app.api.product.getById)
        .delete(app.api.product.remove)

    app.route('/getProductsByRestaurant/:id')
        .get(app.api.product.getProductsByRestaurant)

    app.route('/uploadFile')
        .post(app.api.uploadImage.uploadFile)
}