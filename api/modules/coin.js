const config = require('./config');
const https = require('https');

//Lista todas as moedas conhecidas pelo serviço
function listCoins(res) {
	let method = 'Moedas?$top=100&$format=json'
	let endpoint = config.apiServer + method;

	https.get(endpoint, (resp) => {
		let data = '';

		resp.on('data', (chunk) => data += chunk);

		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			data = JSON.parse(data);
			res.send(
				data.value.map((coin) => {
					return {
						symbol: coin.simbolo, 
						name: coin.nomeFormatado, 
						type: coin.tipoMoeda
					}; 
				})
			);
		});
		
		resp.on("error", (err) => {
			res.status(500).send("ERRO: Serviço indisponível.");
		});	
	});
}

function getCoin(id, res) {

	//TODO: Verificar se está vazio
	//TODO: Validar id
	//if valid(id) {
	//else {
	//  res.status(400).send('O valor informado deve ser uma string em caixa alta com 3 caracteres.');
	//}

	id = id.toUpperCase();
	let method = `Moedas?$top=100&$filter=simbolo%20eq%20'${id}'&$format=json`;
	let endpoint = config.apiServer + method;

	https.get(endpoint, (resp) => {
		let data = '';
		resp.on('data', (chunk) => data += chunk);

		resp.on('end', () => {
			data = JSON.parse(data);
			
			//verifica se retornou algum elemento no array (se alguma moeda com esse id/simbolo foi encontrada)
			if (data.value.length > 0) {
				let coin = data.value[0];
				res.send({
						symbol: coin.simbolo, 
						name: coin.nomeFormatado, 
						type: coin.tipoMoeda
					});
			} else {
				res.status(204).send("Moeda não encontrada");
			}
		});
		
		resp.on("error", (err) => {
			res.send("ERRO: Serviço indisponível.");
		});	
	});
}

module.exports = {
	listCoins,
	getCoin
};