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
  console.log(parentPublicKey)
  console.log(parentFile)
  // Encrypt the file using the public key
  const buffer = Buffer.from(parentFile)
  // const encrypted = crypto.publicEncrypt(publicKey, buffer)

  // // Return the encrypted file to the parent
  // process.stdout.write(encrypted)
  process.stdout.end()
})
