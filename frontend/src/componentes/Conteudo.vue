<template>
	<v-layout column>
		<v-flex>
			<UsuarioLogado />
		</v-flex>
		<v-flex>
			<v-tabs centered  dark icons-and-text>
				<v-tabs-slider color="white"></v-tabs-slider>

				<v-tab>
					Restaurante
					<v-icon>R</v-icon>
				</v-tab>

				<v-tab>
					Cliente
					<v-icon>C</v-icon>
				</v-tab>

				<v-tab-item>
					<RestauranteAbas /> 
				</v-tab-item>

				<v-tab-item>
					<clienteAbas />
				</v-tab-item>

				<v-tab-item>
					<clienteAbas />
				</v-tab-item>
			</v-tabs>
		</v-flex>
	</v-layout>
</template>

<script>
import RestauranteAbas from './autenticacao/Abas'
import UsuarioLogado from './autenticacao/UsuarioLogado'
import clienteAbas from './cliente/Abas'

export default {
	components: {
		RestauranteAbas,
		UsuarioLogado,
		clienteAbas,
	},
}
</script>

<style>

</style>
