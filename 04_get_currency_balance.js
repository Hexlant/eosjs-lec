const { eos } = require('./setting')



async function get_currency_balance (code, account, symbol) {
    const result = await eos.rpc.get_currency_balance(code, account, symbol)
    console.log(result)
}


async function get_currency_stat (code, symbol) {
    const result = await eos.rpc.get_currency_stats(code, symbol)
    console.log(result);
}

get_currency_balance('eosio.token', 'hexeosjungle', 'EOS');