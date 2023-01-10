import fs from 'node:fs'
import { fork } from 'child_process'

import { privateDecrypt } from 'node:crypto'

import * as dotenv from 'dotenv'

import generateKeys from './generateKeyPairSync.js'

const { SECRET } = dotenv.config().parsed
const { publicKey, privateKey } = generateKeys(SECRET)
const fileContent = fs.readFileSync('text.txt', 'utf8')

const child = fork('childFork.js')

child.send(JSON.stringify({ publicKey, fileContent }))

child.on('message', (encryptedMessage) => {
  const buffMessage = Buffer.from(encryptedMessage)

  const decryptedData = privateDecrypt(
    { key: privateKey, passphrase: SECRET },
    buffMessage,
  )

  if (decryptedData.toString() === fileContent) {
    console.log(`The encrypted file content '${decryptedData.toString()}' is correct.`)
  } else {
    console.log(`The encrypted file content '${decryptedData.toString()}' is not correct.`)
  }

  console.timeEnd('execution-time')
  console.log(`Memory usage: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`)

  child.kill()
})

console.time('execution-time')
