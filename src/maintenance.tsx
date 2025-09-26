export default {
  fetch() {
    return new Response(`
<!DOCTYPE html>
<html>
<head>
    <title>Сайт временно недоступен</title>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial; text-align: center; padding: 50px; background: #f5f5f5; }
        .container { background: white; padding: 40px; border-radius: 10px; display: inline-block; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; margin-bottom: 20px; }
        p { color: #666; font-size: 16px; }
        .icon { font-size: 48px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">🔒</div>
        <h1>Сайт находится в разработке</h1>
        <p>Доступ временно ограничен.<br>Спасибо за понимание!</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <small style="color: #999;">ViralScript AI v4.0</small>
    </div>
</body>
</html>`, {
      headers: { 'Content-Type': 'text/html' },
      status: 503
    });
  }
}