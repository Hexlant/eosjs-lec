const { eos } = require('./setting')


async function get_block (blockNumOrId) {
    const result = await eos.rpc.get_block(blockNumOrId)
    console.log(result)
}

get_block(2)