const http = require('http');
const assert = require('assert');

module.exports = (res) => {
	try{
		res.setHeader('Content-Type', 'text/html');

		//Testando listagem de moedas 200 ok
		http.get(`http://localhost:${PORT}/api/coins`, (resp) => {
			let data = '';
			resp.on('data', (chunk) => data += chunk);

			resp.on('end', () => {
				res.write('<strong>Testando /api/coins</strong><br/>');

				res.write('Testando HttpStatusCode... ');
				assert.strictEqual(resp.statusCode, 200);
				res.write('OK<br/>');

				res.write('Verificando se alguma moeda foi retornada...');
				assert(data.length > 0);
				res.write('OK<br/><br/>');

			});
		});

		//Testando getCoin EUR
		http.get(`http://localhost:${PORT}/api/coins/EUR`, (resp) => {
			let data = '';
			resp.on('data', (chunk) => data += chunk);

			resp.on('end', () => {
				res.write('<strong>Testando /api/coins/EUR</strong><br/>');

				res.write('Testando HttpStatusCode... ');
				assert.strictEqual(resp.statusCode, 200);
				res.write('OK<br/>');

				res.write('Verificando moeda retornada...');
				assert(JSON.parse(data).symbol == 'EUR');
				res.write('EUR ==> OK<br/><br/>');

			});
		});

		//Testando getCoin inexistente (SMM) (204 - NoContent)
		http.get(`http://localhost:${PORT}/api/coins/SMM`, (resp) => {
			let data = '';
			resp.on('data', (chunk) => data += chunk);

			// The whole response has been received. Print out the result.
			resp.on('end', () => {
				//Testando listagem de moedas 200 ok
				res.write('<strong>Testando /api/coins/SMM</strong><br/>');
				res.write('Testando HttpStatusCode... ');
				assert.strictEqual(resp.statusCode, 204);
				res.write('204 => OK<br/><br/>');
			});
		});

	} catch(err) {
		res.write(JSON.stringify(err.message));
	} finally {
		//res.end();
	}
}