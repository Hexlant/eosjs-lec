const { JsonRpc } = require('eosjs')
const fetch = require('node-fetch');

const rpc = new JsonRpc('http://jungle2.cryptolions.io:80', { fetch });

async function get_info () {
    const result = await rpc.get_info();
    console.log(result)
}

get_info()

