import fs from 'node:fs'
import { spawn } from 'child_process'
import { createVerify } from 'node:crypto'

import * as dotenv from 'dotenv'

import generateKeys from './generateKeyPairSync.js'

const { SECRET } = dotenv.config().parsed
const { publicKey, privateKey } = generateKeys(SECRET)
const fileContent = fs.readFileSync('memoryMonitor.js', 'utf8')

const child = spawn('node', ['child.js'])

child.stdin.write(JSON.stringify({ publicKey, fileContent }))
child.stdin.end()

let encryptedFile = ''
child.stdout.on('data', (data) => {
  console.log(data.toString())
  encryptedFile += data
})

child.stdout.on('end', () => {
  console.log(encryptedFile)
  // Verify the encrypted file is actually the original file
  const verifier = createVerify('sha256')
  verifier.update(fileContent)
  const result = verifier.verify(publicKey, encryptedFile, 'hex')
  if (result) {
    console.log('The encrypted file is valid.')
  } else {
    console.error('The encrypted file is not valid.')
  }

  // Measure time and memory usage
  console.timeEnd('execution-time')
  console.log(`Memory usage: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`)
})

console.time('execution-time')
