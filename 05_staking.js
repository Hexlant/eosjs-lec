const { eos } = require('./setting')

config = {
    actor: 'hexeosjungle',
    data: {
        from: 'hexeosjungle',
        receiver: 'hexeosjungle',
        stakenet: '30.0000 EOS',
        stakecpu: '30.0000 EOS',
    }
}

async function stake () {
    const result = await eos.transact({
        actions: [{
            account: 'eosio',
            name: 'delegatebw',
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

