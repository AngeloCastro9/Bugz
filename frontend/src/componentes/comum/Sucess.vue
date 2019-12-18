<template>
    <div v-if="itens">
        <v-alert v-for="i in itens"
            :key="i.message" :value="true" type="sucess">
            {{ i.message }}
        </v-alert>
    </div>
</template>

<script>
export default {
    props: ['sucess'],
    computed: {
        itens() {
            if(itens.length > 0) {
                itens.push({
                    message: 'Usuário cadastrado com sucesso!'
                })
            }
            return itens
        }
    }
}
</script>

<style>

</style>
