const express = require('express');
const pretty = require('express-prettify');

const config = require('./modules/config');
const coin = require('./modules/coin');
const price = require('./modules/price');
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
	coin.listCoins()
	.then(coins => res.send(coins))
	.catch(err => res.status(500).send(err));
});

app.get('/api/coins/:id', (req, res) => {
	coin.getCoin(req.params.id)
	.then(coin => res.send(coin))
	.catch(err => res.status(err.status).send(err.message));
});

app.get('/api/price/:coin/:day', (req, res) => {
	price.getPrice(req.params.coin, req.params.day, res);
});

app.get('/api/dummyTest', (req, res) => {
	test(res);	
});

app.listen(PORT, () => console.log("Listening on port ", PORT));

