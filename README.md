# cambio

> Conversor de moedas consumindo o serviço do Banco Central do Brasil.

## Especificações

Construa um serviço de conversão de moedas. Este serviço deve obter os dados de cotação do site do Banco Central do Brasil. Deve ser possível realizar uma chamada a um método da API do serviço com parâmetros de data da cotação (ex: 10/09/2019), moeda de origem (ex: EUR), moeda final (ex: USD) e valor desejado (ex: 150). O resultado desta chamada é o valor
convertido para a moeda fim.

## Status

Incompleto. Embora o prazo em tempo corrido tenha sido adequado, meu tempo disponível para o desenvolvimento do projeto se viu prejudicado por fatores externos de cunho pessoal.  
>* Montei uma api simples node/express para mediar a comunicação com a api do BCB.  
>* Dividi a mesma em alguns módulos para melhor organizar o código e isolar as responsabilidades de cada entidade.  
>* Montei um método de teste de caixa preta bem básico para testar as saídas de cada endpoint da entidade "Coin".  
  
A idéia era montar a interface utilizando o vue criando um componente para a combo de moedas, utilizando o vue-datepicker pra manipulação das datas, etc, mas não cheguei nem a tocar na view. Vou tentar subir pro github um projeto no qual o vue.js foi utilizado para a montagem.  

A api também incluiria toda a validação necessária para os parâmetros de entrada e saídas com erros personalizados.  

Documentação api BCB: https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/documentacao  

#convert(date, origin, target, value)  

Moedas tipo A: Paridade (dólar): Quantidade da moeda por uma unidade de dólar americano (USD);  
Cotação (unidade monetária corrente): Quantidade de moeda corrente por uma unidade da moeda  

Moedas tipo B: Paridade (dólar): Quantidade de dólar americano (USD) por uma unidade da moeda;  
Cotação (unidade monetária corrente): Quantidade de moeda corrente por uma unidade da moeda  

Cotação de Compra CADBRL = Cotação USDBRL de Compra ÷ Paridade USDCAD de Venda  
Cotação de Venda CADBRL = Cotação USDBRL de Venda ÷ Paridade USDCAD de Compra  

## Endpoints

>- http://localhost:3000/api/coins Lista as moedas disponíveis no serviço de cotação do BCB  
>- http://localhost:3000/api/coins/XXX Recupera as informações de uma moeda específica utilizando o código de 3 letras Ex.: 'EUR'
>- http://localhost:3000/api/price/:coin/:day Recupera a última cotação disponível da moeda informada no dia informado, se existir.  
>- http://localhost:3000/api/dummyTest Ensaio de teste  

## Build Setup
  
Garanta que possui Node.js, Vue e vue-cli instalados.  

Rodar a API (Por default ela escuta a porta 3000.)
``` bash
# ./cambio/api
node index.js
```

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

``` bash
npm install -g vue-cli
npm install vuejs-datepicker --save
npm install express -g
npm install express-pretty -g
npm install nodemon -g

vue init webpack-simple cambio
cd cambio
npm install
npm audit fix //npm audit fix --force
npm run

node ./api/index.js
```
