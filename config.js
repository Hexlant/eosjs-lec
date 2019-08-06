const { Api, JsonRpc } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')
const fetch = require('node-fetch');
const { TextDecoder, TextEncoder } = require('util');
const privateKeys = [
    '5JpF2V1WfoMrR6M7RFzM3Cbp5MTKtLk8CcCQncXRw9UnqiUkxye',   // hexeosjungle 'Active'
    ];

const signatureProvider = new JsSignatureProvider(privateKeys);
const rpc = new JsonRpc('http://jungle2.cryptolions.io:80', { fetch });
const eos = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder, textEncoder: new TextEncoder() });

module.exports = {
    eos,
}
