import path from 'path'
import express from 'express'

const app = express()
const PORT = 8080

// static path where files such as images and js will be served from
app.use('/static', express.static(path.join(process.cwd(), 'dist/client')))

// =================== WARNING ===================
// ATTENTION this will expose ALL server files
// =================== WARNING ===================
app.use('/server', express.static(path.join(process.cwd(), 'dist/server')))

app.all('*', async (req, res, next) => (await import('./serverRender')).default(req, res, next))

app.listen(PORT, () => {
  console.info(`[${new Date().toISOString()}]`, `App2 is running: 🌎 http://localhost:${PORT}`)
})

export default app
