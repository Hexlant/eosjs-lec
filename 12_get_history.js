const { eos } = require('./config');

async function get_history_action (account, pos, offset) {
    const result = await eos.rpc.history_get_actions(account, pos, offset);
    console.log(result);
}

// hyperion node로 히스토리 불러오기
const request = require('request');

let options = {
    url: "https://junglehistory.cryptolions.io/v2/history/get_actions",
    qs: {
        account: "junglehexeos"
    }
}

async function get_history () {
    request(options, (error, response, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log((result));
        }
    });
}

get_history()