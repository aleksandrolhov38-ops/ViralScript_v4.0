import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Секретный путь для доступа к полному приложению
const SECRET_PATH = '/dev-access-2024'

// Все статические файлы (для секретного доступа)
app.use('/static/*', serveStatic({ root: './public' }))

// Секретный доступ - показываем полное приложение
app.get(SECRET_PATH, (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ViralScript AI v4.0 🚀 LIVE</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .tab-content { display: none; }
        .tab-content.active { display: block; }
        .notification { position: fixed; top: 20px; right: 20px; padding: 15px 20px; border-radius: 8px; z-index: 1000; }
        .notification.success { background: #10b981; color: white; }
        .notification.error { background: #ef4444; color: white; }
        .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: none; align-items: center; justify-content: center; z-index: 1000; }
        .modal.active { display: flex; }
        .video-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        .video-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s; }
        .video-card:hover { transform: translateY(-4px); }
        .tag { display: inline-block; padding: 4px 8px; background: #e5e7eb; border-radius: 12px; font-size: 12px; margin: 2px; }
    </style>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <!-- Приватный индикатор -->
        <div class="bg-red-600 text-white text-center py-2 text-sm">
            🔒 ПРИВАТНЫЙ РЕЖИМ - Доступ через секретный URL
        </div>
        
        <!-- Заголовок -->
        <div class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-6 py-4">
                <h1 class="text-3xl font-bold text-gray-800">
                    <i class="fas fa-video mr-3 text-red-600"></i>
                    ViralScript AI v4.0
                    <span class="text-green-600 text-lg ml-2">🚀 LIVE</span>
                </h1>
            </div>
        </div>

        <!-- Навигация -->
        <nav class="bg-white border-b">
            <div class="max-w-7xl mx-auto px-6">
                <div class="flex space-x-8">
                    <button onclick="switchTab('dashboard')" class="tab-btn px-4 py-4 text-sm font-medium border-b-2 border-red-600 text-red-600" data-tab="dashboard">
                        <i class="fas fa-tachometer-alt mr-2"></i>Дашборд
                    </button>
                    <button onclick="switchTab('channels')" class="tab-btn px-4 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700" data-tab="channels">
                        <i class="fas fa-tv mr-2"></i>Мои каналы
                    </button>
                    <button onclick="switchTab('videos')" class="tab-btn px-4 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700" data-tab="videos">
                        <i class="fas fa-play-circle mr-2"></i>Наши видео
                    </button>
                    <button onclick="switchTab('authors')" class="tab-btn px-4 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700" data-tab="authors">
                        <i class="fas fa-users mr-2"></i>Управление авторами
                    </button>
                    <button onclick="switchTab('rubrics')" class="tab-btn px-4 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700" data-tab="rubrics">
                        <i class="fas fa-tags mr-2"></i>Управление рубриками
                    </button>
                </div>
            </div>
        </nav>

        <!-- Контент -->
        <main class="max-w-7xl mx-auto px-6 py-8">
            <!-- Дашборд -->
            <div id="dashboard" class="tab-content active">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-lg shadow">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <i class="fas fa-tv text-2xl text-blue-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Всего каналов</p>
                                <p class="text-2xl font-semibold text-gray-900" id="total-channels">0</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <i class="fas fa-play-circle text-2xl text-green-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Всего видео</p>
                                <p class="text-2xl font-semibold text-gray-900" id="total-videos">0</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <i class="fas fa-users text-2xl text-purple-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Всего авторов</p>
                                <p class="text-2xl font-semibold text-gray-900" id="total-authors">0</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <i class="fas fa-tags text-2xl text-orange-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Всего рубрик</p>
                                <p class="text-2xl font-semibold text-gray-900" id="total-rubrics">0</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-xl font-semibold mb-4">Добро пожаловать в ViralScript AI!</h2>
                    <p class="text-gray-600">Система инициализируется... Модули загружаются...</p>
                    <div class="mt-4 text-sm text-green-600" id="init-status">Модули инициализируются...</div>
                </div>
            </div>

            <!-- Остальные табы (каналы, видео, авторы, рубрики) -->
            <div id="channels" class="tab-content">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">Мои каналы</h2>
                    <button onclick="openAddChannelModal()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                        <i class="fas fa-plus mr-2"></i>Добавить канал
                    </button>
                </div>
                <div id="channels-list" class="bg-white rounded-lg shadow p-6">
                    <p class="text-gray-500">Нет добавленных каналов. Добавьте свои каналы для начала работы.</p>
                </div>
            </div>

            <div id="videos" class="tab-content">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Наши видео</h2>
                <div id="videos-grid" class="video-grid">
                    <div class="bg-white rounded-lg shadow p-6">
                        <p class="text-gray-500">Видео появятся здесь после добавления каналов.</p>
                    </div>
                </div>
            </div>

            <div id="authors" class="tab-content">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">Управление авторами</h2>
                    <button onclick="openAddAuthorModal()" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                        <i class="fas fa-user-plus mr-2"></i>Добавить автора
                    </button>
                </div>
                <div id="authors-list" class="bg-white rounded-lg shadow p-6">
                    <p class="text-gray-500">Добавьте первого автора для начала работы.</p>
                </div>
            </div>

            <div id="rubrics" class="tab-content">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">Управление рубриками</h2>
                    <button onclick="openAddRubricModal()" class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg">
                        <i class="fas fa-tag mr-2"></i>Добавить рубрику
                    </button>
                </div>
                <div id="rubrics-list" class="bg-white rounded-lg shadow p-6">
                    <p class="text-gray-500">Добавьте первую рубрику для начала работы.</p>
                </div>
            </div>
        </main>
    </div>

    <!-- Модалки и уведомления -->
    <div id="notification" class="notification"></div>
    
    <script>
        // Базовая навигация
        function switchTab(tabName) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('border-red-600', 'text-red-600');
                btn.classList.add('border-transparent', 'text-gray-500');
            });
            
            document.getElementById(tabName).classList.add('active');
            document.querySelector(\`[data-tab="\${tabName}"]\`).classList.add('border-red-600', 'text-red-600');
            document.querySelector(\`[data-tab="\${tabName}"]\`).classList.remove('border-transparent', 'text-gray-500');
        }

        // Заглушки для модальных окон
        function openAddChannelModal() { showNotification('Функция добавления каналов в разработке', 'error'); }
        function openAddAuthorModal() { showNotification('Функция добавления авторов в разработке', 'error'); }
        function openAddRubricModal() { showNotification('Функция добавления рубрик в разработке', 'error'); }

        // Уведомления
        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = \`notification \${type}\`;
            notification.style.display = 'block';
            setTimeout(() => notification.style.display = 'none', 3000);
        }

        // Инициализация
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                document.getElementById('init-status').textContent = '✅ Все модули успешно загружены!';
                showNotification('🔒 Приватный режим активен! Доступ через секретный URL.', 'success');
            }, 2000);
        });
    </script>
</body>
</html>`)
})

// Все остальные запросы - показываем maintenance
app.all('*', (c) => {
  return c.html(\`
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
</html>\`, 503)
})

export default app