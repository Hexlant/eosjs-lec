const { eos } = require('./setting')


config = {
    actor: 'hexeosjungle',
    data: {
        payer: 'hexeosjungle',
        receiver: 'hexeosjungle',
        bytes: 200,
    }
}

async function buyram () {
    const result = await eos.transact({
        actions: [{
            account: 'eosio',
            name: 'buyrambytes',
            authorization: [{
                actor: config.actor,
                permission: 'active', 
            }],
            data: config.data
        }],
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    })
    console.log('txID: ', result.transaction_id)
}
