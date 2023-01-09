import crypto from 'node:crypto'

process.stdin.resume()

let parentPublicKey
let parentFile

process.stdin.on('data', (data) => {
  try {
    const { publicKey, fileContent } = JSON.parse(data)
    parentPublicKey = publicKey
    parentFile = fileContent
  } catch (error) {
    console.error(error.message)
  }
})

process.stdin.on('end', () => {
  const buffer = Buffer.from(parentFile)
  const encrypted = crypto.publicEncrypt(parentPublicKey, buffer)

  console.log(parentFile)
  process.stdout.write(encrypted)
  process.stdout.end()
})
