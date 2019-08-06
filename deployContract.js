const fs = require(`fs`)
const path = require(`path`)
const { Serialize } = require(`eosjs`)
const { eos } = require(`./config`)


// 컨트랙트 폴더 내에서 .wasm file과 .abi file을 반환
function getDeployableFilesFromDir(dir) {
  const dirCont = fs.readdirSync(dir)
  const wasmFileName = dirCont.find(filePath => filePath.match(/.*\.(wasm)$/gi))
  const abiFileName = dirCont.find(filePath => filePath.match(/.*\.(abi)$/gi))
  if (!wasmFileName) throw new Error(`Cannot find a ".wasm file" in ${dir}`)
  if (!abiFileName) throw new Error(`Cannot find an ".abi file" in ${dir}`)
  return {
    wasmPath: path.join(dir, wasmFileName),
    abiPath: path.join(dir, abiFileName),
  }
}

// 컨트랙트 배포
async function deployContract({ account, contractDir }) {
  const { wasmPath, abiPath } = getDeployableFilesFromDir(contractDir)

  const wasm = fs.readFileSync(wasmPath).toString(`hex`)

  const buffer = new Serialize.SerialBuffer({
    textEncoder: eos.textEncoder,
    textDecoder: eos.textDecoder,
  })

  let abi = JSON.parse(fs.readFileSync(abiPath, `utf8`))
  const abiDefinition = eos.abiTypes.get(`abi_def`)
  abi = abiDefinition.fields.reduce(
    (acc, { name: fieldName }) =>
      Object.assign(acc, { [fieldName]: acc[fieldName] || [] }),
    abi
  )
  abiDefinition.serialize(buffer, abi)

  const result = await eos.transact(
    {
      actions: [
        {
          account: 'eosio',
          name: 'setcode',
          authorization: [
            {
              actor: account,
              permission: 'active',
            },
          ],
          data: {
            account: account,
            vmtype: 0,
            vmversion: 0,
            code: wasm,
          },
        },
        {
          account: 'eosio',
          name: 'setabi',
          authorization: [
            {
              actor: account,
              permission: 'active',
            },
          ],
          data: {
            account: account,
            abi: Buffer.from(buffer.asUint8Array()).toString(`hex`),
          },
        },
      ],
    },
    {     // default value ->  blocksBehind = 3   and  exprieSends = 30 
      blocksBehind: 3,       // 검증에 필요한 블록 개수
      expireSeconds: 30,     // timeout             
    }
  )
}

deployContract({ account: `hexeosjungle`, contractDir: `./contracts` })