const { eos } = require('./setting')

config = {
    actor: 'hexeosjungle',
    data: {
        from: 'hexeosjungle',
        receiver: 'hexeosjungle',
        unstakenet: '1.0000 EOS',
        unstakecpu: '1.0000 EOS'
    }
}

async function unstake () {
    const result = await eos.transact({
        actions: [{
            account: 'eosio',
            name: 'undelegatebw',
            authorization: [{
                actor: config.actor,
                permission: 'active',
            }],
            data: config.data
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    })
    console.log('txID: ', result.transaction_id)
}
