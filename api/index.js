const config = require('./modules/config');
const coin = require('./modules/coin');
const express = require('express');
const pretty = require('express-prettify');
 
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
	coin.getCoin(req.params.id, res);
});

//Recupera a porta das variáveis de ambiente
const PORT = process.env.PORT || 3000; //Se a variável de ambiente não estiver definida, utiliza a porta 3000 por padrão.

app.listen(PORT, () => console.log("Listening on port ", PORT));

