const Query = require('./Query')
const Mutation = require('./Mutation')

module.exports = {
    Query,
    Mutation,
    RestauranteOrCliente: {
        __resolveType(obj, context, info){
            if(obj.name){
            return 'Restaurante';
            }

            if(obj.title){
            return 'Cliente';
            }

            return null;
        },
    }
}