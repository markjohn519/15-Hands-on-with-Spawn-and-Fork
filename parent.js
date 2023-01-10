import fs from 'node:fs'
import { spawn } from 'child_process'
import { privateDecrypt } from 'node:crypto'

import * as dotenv from 'dotenv'

import generateKeys from './generateKeyPairSync.js'

const { SECRET } = dotenv.config().parsed
const { publicKey, privateKey } = generateKeys(SECRET)
const fileContent = fs.readFileSync('text.txt', 'utf8')

const child = spawn('node', ['child.js'])

child.stdin.write(JSON.stringify({ publicKey, fileContent }))
child.stdin.end()

let encryptedFile
child.stdout.on('data', (data) => {
  encryptedFile = data
})

child.stdout.on('end', () => {
  const decryptedData = privateDecrypt(
    { key: privateKey, passphrase: SECRET },
    encryptedFile,
  )
  if (decryptedData.toString('base64') === fileContent) {
    console.log(`The encrypted file content '${decryptedData.toString('base64')}' is correct.`)
  } else {
    console.error('The encrypted file content is not correct.')
  }

  console.timeEnd('execution-time')
  console.log(`Memory usage: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`)
})

console.time('execution-time')
