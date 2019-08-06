const { eos } = require('./config')

// 트랜잭션 예시 1
const transfer_transaction = ({
    actions: [{
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
          actor: 'hexeosjungle',
          permission: 'active',
        }],
        data: {
          from: 'hexeosjungle',
          to: 'junglehexeos',
          quantity: '1.0000 EOS',
          memo: 'send',
        },
      },],
    })


// 트랜잭션 예시 2    
const buy_ram_transaction = ({
    actions: [{
        account: 'eosio',
        name: 'buyrambytes',
        authorization: [{
            actor: 'hextesttoken',
            permission: 'active', 
        }],
        data: {
            payer: 'hextesttoken',
            receiver: 'hextesttoken',
            bytes: 8192
        },
    }]
})


// 트랜잭션 시 필요한 키    
async function requiredkeys (ex_transaction) {
    const transaction = ex_transaction;
    const availableKeys = await eos.signatureProvider.getAvailableKeys();
    console.log('AvailableKeys: ', availableKeys);
    
    const requiredKeys = await eos.authorityProvider.getRequiredKeys({
        transaction,
        availableKeys,
    })
    console.log('requiredKeys :', requiredKeys)
    

};



