import { app } from './app'
import { knex } from './database'
import { env } from './env'

app.get('/hello', async () => {
  const tables = await knex('sqlite_schema').select('*')

  return tables
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server running on port 8080')
  })
