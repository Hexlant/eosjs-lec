const { eos } = require('./setting')


config = {
    target: 'tutorialcall',          
    function: 'hi',                
    from: 'hexeosjungle',             
    data: {                          
        user: 'hexlant',         
    }
}

async function invoke() {
    const result = await eos.transact({
        actions: [{
            account: config.target,
            name: config.function,
            authorization: [{
                actor: config.from,
                permission: 'active', 
            }],
            data: config.data
        }],
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    })
    console.log(JSON.stringify(result, null, 2))
}

invoke()