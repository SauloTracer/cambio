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
				data.value.map((x) => {
					return {
						symbol: x.simbolo, 
						name: x.nomeFormatado, 
						type: x.tipoMoeda
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

	id = id.toUpperCase();
	let method = `Moedas?$top=100&$filter=simbolo%20eq%20'${id}'&$format=json`;
	let endpoint = config.apiServer + method;

	https.get(endpoint, (resp) => {
		let data = '';

		resp.on('data', (chunk) => data += chunk);

		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			data = JSON.parse(data);
			
			//verificar se retornou algum elemento no array (se alguma moeda com esse id/simbolo foi encontrada)
			if (data.value.length > 0) {
				let x = data.value[0];
				res.send({
						symbol: x.simbolo, 
						name: x.nomeFormatado, 
						type: x.tipoMoeda
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