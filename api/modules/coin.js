const config = require('./config');
const https = require('https');

//Lista todas as moedas conhecidas pelo serviço
function listCoins() {
	let method = 'Moedas?$top=100&$format=json'
	let endpoint = config.apiServer + method;

	return new Promise((resolve, reject) => {
		https.get(endpoint, (resp) => {
			let data = '';

			resp.on('data', (chunk) => data += chunk);

			// The whole response has been received. Print out the result.
			resp.on('end', () => {
				try {
					data = JSON.parse(data);
					resolve(
						data.value.map((coin) => {
							return {
								symbol: coin.simbolo, 
								name: coin.nomeFormatado, 
								type: coin.tipoMoeda
							}; 
						})
					);
				} catch(err) {
					reject('Erro ao recuperar a lista de moedas. Serviço não disponível.');
				}
			});
			
			resp.on("error", (err) => {
				reject(err);
			});	
		});
	});
}

function getCoin(id) {

	//TODO: Verificar se está vazio
	//TODO: Validar id
	//if valid(id) {
	//else {
	//  res.status(400).send('O valor informado deve ser uma string em caixa alta com 3 caracteres.');
	//}

	id = id.toUpperCase();
	let method = `Moedas?$top=100&$filter=simbolo%20eq%20'${id}'&$format=json`;
	let endpoint = config.apiServer + method;

	return new Promise((resolve, reject) => {
		https.get(endpoint, (resp) => {
			let data = '';
			resp.on('data', (chunk) => data += chunk);

			resp.on('end', () => {
				try{
					data = JSON.parse(data);
					
					//verifica se retornou algum elemento no array (se alguma moeda com esse id/simbolo foi encontrada)
					if (data.value.length > 0) {
						let coin = data.value[0];
						resolve({
							symbol: coin.simbolo, 
							name: coin.nomeFormatado, 
							type: coin.tipoMoeda
						});
					} else {
						reject({ status: 404, message: "Moeda não encontrada" })
					}
				} catch (err) {
					reject({ status: 500, message: "Erro ao buscar moeda." })
				}
			});
			
			resp.on("error", (err) => {
				reject({ status: 500, message: "ERRO: Serviço indisponível." })
			});	
		});
	});
	
}

module.exports = {
	listCoins,
	getCoin
};