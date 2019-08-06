const { eos } = require('./setting')

config = {
    actor: 'hexeosjungle',
    data: {
      from: 'hexeosjungle',
      to: 'junglehexeos',
      quantity: '1.0000 EOS',
      memo: 'send'
    }
}

async function transfer () {
    const result = await eos.transact({
        actions: [{
            account: 'eosio.token',
            name: 'transfer',
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
    console.log(result)
}


transfer()