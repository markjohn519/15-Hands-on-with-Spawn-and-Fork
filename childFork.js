import crypto from 'node:crypto'

process.on('message', (data) => {
  try {
    const { publicKey, fileContent } = JSON.parse(data)

    const encryptedMessage = crypto.publicEncrypt(publicKey, fileContent)

    process.send(encryptedMessage)
  } catch (error) {
    console.error(error.message)
  }
})
