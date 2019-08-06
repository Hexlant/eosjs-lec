const { eos } = require('./config')


config = {
    actor: 'hexeosjungle',
    creator: 'hexeosjungle',
    name: 'hexeostest12',
    ownerkeys: 'EOS7Kcescne2vMspfPhGmViayfGJ2dE5cthcUL5FSfqh75YkAyADj',                
    activekeys: 'EOS68tLfhQV1z8hgjYVX3ueZ1rio9FMX444p6MebYLqjmmDwaooxF',
    rambyte: 300192,
    stakenet: '10.0000 EOS',
    stakecpu: '10.0000 EOS'
}

async function createAccount () {
    const result = await eos.transact({
        actions: [{
          account: 'eosio',
          name: 'newaccount',
          authorization: [{
            actor: config.actor,
            permission: 'active',
          }],
          data: {
            creator: config.creator,
            name: config.name,
            owner: {
              threshold: 1,
              keys: [{
                key: config.ownerkeys,
                weight: 1
              }],
              accounts: [],
              waits: []
            },
            active: {
              threshold: 1,
              keys: [{
                key: config.activekeys,
                weight: 1
              }],
              accounts: [],
              waits: []
            },
          },
        },
        {
          account: 'eosio',
          name: 'buyrambytes',
          authorization: [{
            actor: config.actor,
            permission: 'active',
          }],
          data: {
            payer: config.actor,
            receiver: config.name,
            bytes: 8192,
          },
        },
        {
          account: 'eosio',
          name: 'delegatebw',
          authorization: [{
            actor: config.actor,
            permission: 'active',
          }],
          data: {
            from: config.actor,
            receiver: config.name,
            stake_net_quantity: config.stakenet,
            stake_cpu_quantity: config.stakecpu,
            transfer: false,
          }
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      console.log('txID: ', result.transaction_id)
}


