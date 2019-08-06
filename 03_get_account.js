const { eos } = require('./setting')

async function get_account (accountName) {
    const result = await eos.rpc.get_account(accountName)
    console.log(result)
}


get_account('hexeosjungle');