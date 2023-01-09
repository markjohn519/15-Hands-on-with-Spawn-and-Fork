import { publicEncrypt, constants } from 'crypto'

import * as dotenv from 'dotenv'

const { SECRET } = dotenv.config().parsed
const parentPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7q4675XIRAhRkRecdFEg
BE2Xk4vF2ZJeppLsF6L8mp4oQvXOOFEkNIzLskb77UgyD2gCIaY1Q/x0/uwbr87k
YDvJiyvRZzCYUCla864zQGxDuO07PvQdcu6Ffl3jNVSsCEFitwklSYaSOInda8Q5
FAMvyitlYlrd6/tu72k2msuBzOSUtVkCMjKg3/a9sym6PGO2kJHjmVwGLXPHGpzR
88XgncGTlURtv48st0QqK7hxxJwIVHjZy9rUbS5rFqvVcFGxM/sjoWmrCRbugSDh
cSowP/iJE3CZxraldYORuIn2fMQzqFCTlfZB9AtNDdODq8RkdKaHth+01o/Uebjl
7wIDAQAB
-----END PUBLIC KEY-----`
const parentFile = 'test'

const encryptedMessage = publicEncrypt(
  { key: parentPublicKey, padding: constants.RSA_PKCS1_OAEP_PADDING },
  parentFile,
)

console.log(encryptedMessage.toString('base64'))

// process.stdin.on('end', () => {
//   console.log('No more data')
// })
