import { appServer } from './server-utils'

before(async function() {
  this.timeout(5000)
  console.info('Initializing database migration.')
})

after(async () => {
  const shutdowns = [appServer.closeServer()]

  console.info('Start cleaning test resources.')

  for (const shutdown of shutdowns) {
    try {
      await shutdown
    } catch (e) {
      console.error('Error in graceful shutdown ', e)
    }
  }
})
