import { Hono } from 'hono'

const app = new Hono()

// Простейший тест
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>ViralScript AI v4.0 - TEST</title>
</head>
<body>
    <h1>🧪 МИНИМАЛЬНЫЙ ТЕСТ</h1>
    <p>Если вы видите эту страницу - основа Hono работает</p>
    <p>Время: ${new Date().toLocaleString('ru-RU')}</p>
</body>
</html>`)
})

// Тест API
app.get('/api/test', (c) => {
  return c.json({ 
    status: 'OK', 
    message: 'API работает',
    timestamp: Date.now()
  })
})

export default app