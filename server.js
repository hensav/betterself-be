require('dotenv').config()
const port = process.env.PORT || 3000
const app = require('./app')

;(() => {
  try {
    const serverConnection = app.listen(port, () => console.log(`\nServer started\n`))
    process.on('SIGINT', () => { serverConnection.close() &&
    console.log('\nServer was shut down') })
  } catch (error) { console.log(`\nServer encountered ${error}\n`) }
})()
