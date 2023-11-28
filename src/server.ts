import { app } from './app'
import { env } from './env'

app.get('/', (req, res) => {
  res.redirect(302, '/docs') // Redireciona para a rota '/docs'
})

app.listen(
  {
    port: env.PORT,
  },
  () => {
    console.log('Server running on port 8080')
  },
)
