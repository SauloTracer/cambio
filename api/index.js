const config = require('./modules/config');
const coin = require('./modules/coin');
const express = require('express');
const pretty = require('express-prettify');
const test = require('./modules/test')

//Recupera a porta das variáveis de ambiente
//Se a variável de ambiente não estiver definida, utiliza a porta 3000 por padrão.
const PORT = process.env.PORT || 3000;

const app = express();

app.use(pretty({ query: 'pretty' }));
app.use(express.json());

app.get('/', (req, res) => {
	res.send("Api para mediar a utilização da api de cotações do Banco Central do Brasil");
});

app.get('/api/coins', (req, res) => {
	//TODO: Verificar se está vazio
	coin.listCoins(res);
});

app.get('/api/coins/:id', (req, res) => {
	//TODO: Verificar se está vazio
	//TODO: Validar id
	//if valid(id) {
	coin.getCoin(req.params.id, res);
	//else {
	//  res.status(400).send('O valor informado deve ser uma string em caixa alta com 3 caracteres.');
	//}
});

app.get('/api/dummyTest', (req, res) => {
	test(res);	
});

app.listen(PORT, () => console.log("Listening on port ", PORT));

