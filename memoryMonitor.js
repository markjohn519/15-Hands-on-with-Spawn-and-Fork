function createFactoryArray(arraySize) {
  const array = new Array(arraySize)
  for (let i = 0; i < arraySize; i += 1) {
    array[i] = i
  }
  return array
}

const startTime = Date.now()

const data = []

setInterval(() => {
  const arraySize = Math.floor(Math.random() * 100) + 1
  const array = createFactoryArray(arraySize)
  const elapsed = Math.floor((Date.now() - startTime) / 1000)
  const heapUsed = process.memoryUsage().heapUsed / 1024

  data.push({ elapsed, array })

  console.log(`${elapsed},${arraySize},${Math.floor(heapUsed)}kb`)
}, 1000)

process.on('SIGHUP', () => {
  process.exit()
})
