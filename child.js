import crypto from 'node:crypto'

process.stdin.on('data', (data) => {
  try {
    const { publicKey, fileContent } = JSON.parse(data)

    const encryptedContent = crypto.publicEncrypt(publicKey, Buffer.from(fileContent, 'base64'))

    process.stdout.write(encryptedContent)
  } catch (error) {
    console.error(error.message)
  }
})

process.stdin.on('end', () => {
  process.stdout.end()
})
