const https = require('https');
const config = require('./config');

function getPrice (coin, day) {

	//TODO: Validar coin e day
	let endpoint = `${config.apiServer}CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${coin}'&@dataCotacao='${day}'&$top=10000&$format=json&$select=paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim`;

	return new Promise ((resolve, reject) => {
		https.get(endpoint, (resp) => {

			let data = '';
			resp.on('data', (chunk) => data += chunk);

			resp.on('end', () => {
				try {
					data = JSON.parse(data);
					let len = data.value.length;

					if(len < 1) reject({status: 404, message: "Cotação não encontrada pra esse conjundo Moeda + Data."});

					let price = data.value[len-1];
				  	resolve({
				  		buy: price.cotacaoCompra,
				  		sell: price.cotacaoVenda,
				  		sellParity: price.paridadeVenda,
				  		day: price.dataHoraCotacao
				  	});
				} catch (e) {
					reject({status: 500, message: "Erro ao buscar cotação no BCB", error: e});
				}
			});
			
			resp.on("error", (err) => {
				reject({status: 500, message: "Erro ao buscar cotação no BCB", error: err});
			});	
		});
	});
}

module.exports = {
	getPrice
};