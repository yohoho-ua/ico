# avra-vue-front

> AvraToken DEMO

## Environment Setup

### install MetaMask

``` bash
#install compile/migrate framework for solidity contracts
npm install -g truffle

#install test-rpc framework (ethereum geth simulator)
npm install -g ganache-cli

#run test environment with default setup
ganache-cli -d
```
### Switch MetaMask to local test network http://127.0.0.1:8545

### Create 2-3 accounts in MetaMask

## App setup
``` bash

# install dependencies
npm install

#compile contracts
truffle compile

#deploy contracts
truffle migrate

# serve with hot reload at localhost:808x
npm run dev
```
### Don't use first acount to buy tokens, it is set as beneficiary

### Buy tokens or send Ether directly to crowdsale account
### Send tokens between accounts

## Other

``` bash
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```


