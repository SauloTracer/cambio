const https = require('https');
const config = require('./config');

function getPrice (coin, day, res) {

	//TODO: Validar coin e day
	let endpoint = `${config.apiServer}CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${coin}'&@dataCotacao='${day}'&$top=10000&$format=json&$select=paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim`;

	https.get(endpoint, (resp) => {

		let data = '';
		resp.on('data', (chunk) => data += chunk);

		resp.on('end', () => {
			data = JSON.parse(data);
			let price = data.value[data.value.length-1];
		  	let result = {
		  		buy: price.cotacaoCompra,
		  		sell: price.cotacaoVenda,
		  		sellParity: price.paridadeVenda,
		  		day: price.dataHoraCotacao
		  	};
			res.send(result);
		});
		
		resp.on("error", (err) => {
			res.status(500).send("ERRO: Serviço indisponível.");
		});	
	});
}

module.exports = {
	getPrice
};