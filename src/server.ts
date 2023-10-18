import { app } from './app'
import { knex } from './database'

app.get('/hello', async () => {
  const tables = await knex('sqlite_schema').select('*')

  return tables
})

app
  .listen({
    port: 8080,
  })
  .then(() => {
    console.log('Server running on port 8080')
  })
