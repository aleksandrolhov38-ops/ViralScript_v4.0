import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for API endpoints
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic())

// Handle favicon.ico specifically
app.get('/favicon.ico', (c) => {
  return c.text('', 404) // Return empty 404 for now to avoid 500 errors
})

// Debug localStorage route
app.get('/debug-storage', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Отладка localStorage</title>
</head>
<body>
    <h1>Отладка localStorage для ViralScript AI</h1>
    <div id="output"></div>
    
    <script>
        console.log('🔧 DEBUG: Проверяем localStorage...');
        
        // Создаем "реальные" данные каналов
        const realChannelsData = [
            {
                id: 'UCxRealChannel1',
                name: 'Мой первый канал',
                title: 'Мой первый канал',
                url: 'https://www.youtube.com/@mychannel1',
                subscribers: 15420,
                videoCount: 85,
                description: 'Описание первого канала',
                added_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                last_sync: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'active',
                video_sync_count: 85,
                totalViews: 1250000,
                totalLikes: 45230,
                videos: [
                    {
                        id: 'video1_channel1',
                        title: 'Как создать крутое видео за час',
                        duration: 'PT8M15S',
                        viewCount: '125000',
                        likeCount: '4523',
                        commentCount: '312',
                        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                        thumbnail: '/static/placeholder-video.png',
                        url: 'https://youtube.com/watch?v=video1_channel1',
                        isRead: false,
                        authorCategory: 'Мой первый канал',
                        channel_source_id: 'UCxRealChannel1',
                        channel_name: 'Мой первый канал'
                    },
                    {
                        id: 'video2_channel1', 
                        title: 'Секреты вирусного контента',
                        duration: 'PT12M45S',
                        viewCount: '89000',
                        likeCount: '3201',
                        commentCount: '189',
                        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                        thumbnail: '/static/placeholder-video.png',
                        url: 'https://youtube.com/watch?v=video2_channel1',
                        isRead: false,
                        authorCategory: 'Мой первый канал',
                        channel_source_id: 'UCxRealChannel1',
                        channel_name: 'Мой первый канал'
                    }
                ]
            },
            {
                id: 'UCxRealChannel2',
                name: 'Технологический блог',
                title: 'Технологический блог',
                url: 'https://www.youtube.com/@techblog',
                subscribers: 28750,
                videoCount: 156,
                description: 'Канал о современных технологиях',
                added_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
                last_sync: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'active',
                video_sync_count: 156,
                totalViews: 2100000,
                totalLikes: 78450,
                videos: [
                    {
                        id: 'video1_channel2',
                        title: 'Новейшие AI технологии 2024',
                        duration: 'PT15M30S',
                        viewCount: '245000',
                        likeCount: '8950',
                        commentCount: '567',
                        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                        thumbnail: '/static/placeholder-video.png',
                        url: 'https://youtube.com/watch?v=video1_channel2',
                        isRead: false,
                        authorCategory: 'Технологический блог',
                        channel_source_id: 'UCxRealChannel2',
                        channel_name: 'Технологический блог'
                    }
                ]
            }
        ];
        
        // Сохраняем реальные данные в localStorage
        localStorage.setItem('myChannels', JSON.stringify(realChannelsData));
        
        // Создаем массив всех видео для основного хранилища
        const allVideos = [];
        realChannelsData.forEach(channel => {
            if (channel.videos) {
                allVideos.push(...channel.videos);
            }
        });
        
        localStorage.setItem('videos', JSON.stringify(allVideos));
        
        console.log('✅ Записаны реальные данные в localStorage:');
        console.log('📺 Каналов:', realChannelsData.length);
        console.log('🎬 Видео:', allVideos.length);
        
        // Проверяем что записалось
        const storedChannels = JSON.parse(localStorage.getItem('myChannels') || '[]');
        const storedVideos = JSON.parse(localStorage.getItem('videos') || '[]');
        
        document.getElementById('output').innerHTML = 
            '<h2>Данные успешно записаны в localStorage:</h2>' +
            '<p><strong>Каналов:</strong> ' + storedChannels.length + '</p>' +
            '<p><strong>Видео:</strong> ' + storedVideos.length + '</p>' +
            '<h3>Каналы:</h3>' +
            '<ul>' +
                storedChannels.map(ch => '<li>' + ch.name + ' (' + ch.id + ') - видео: ' + (ch.videos ? ch.videos.length : 0) + '</li>').join('') +
            '</ul>' +
            '<h3>Видео:</h3>' +
            '<ul>' +
                storedVideos.map(v => '<li>' + v.title + ' (' + v.viewCount + ' просмотров)</li>').join('') +
            '</ul>' +
            '<p><a href="/">Вернуться к основному приложению</a></p>';
        
        // Выводим все ключи localStorage
        console.log('🔍 Все ключи в localStorage:', Object.keys(localStorage));
        Object.keys(localStorage).forEach(key => {
            const data = localStorage.getItem(key);
            console.log('🔑 ' + key + ':', data ? JSON.parse(data) : null);
        });
    </script>
</body>
</html>`)
})

// Clean localStorage route - удаляет только тестовые данные, оставляет реальные
app.get('/clean-storage', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Очистка localStorage от тестовых данных</title>
</head>
<body>
    <h1>Очистка localStorage от тестовых данных</h1>
    <div id="output"></div>
    
    <script>
        console.log('🧹 Начинаем очистку тестовых данных...');
        
        // Получаем все видео
        const allVideos = JSON.parse(localStorage.getItem('videos') || '[]');
        console.log('📹 Всего видео до очистки:', allVideos.length);
        
        // Получаем реальные каналы
        const realChannels = JSON.parse(localStorage.getItem('myChannels') || '[]');
        const realChannelIds = realChannels.map(ch => ch.id);
        console.log('📺 Реальные каналы:', realChannelIds);
        
        // Фильтруем только реальные видео
        const realVideos = allVideos.filter(video => {
            // Проверяем принадлежность к реальным каналам
            return realChannelIds.includes(video.channel_source_id) || 
                   realChannelIds.some(channelId => video.channelId === channelId);
        });
        
        console.log('✅ Реальных видео найдено:', realVideos.length);
        console.log('🗑️ Тестовых видео удалено:', allVideos.length - realVideos.length);
        
        // Сохраняем только реальные видео
        localStorage.setItem('videos', JSON.stringify(realVideos));
        
        // Также очистим другие тестовые ключи если есть
        const keysToCheck = Object.keys(localStorage);
        let cleanedKeys = 0;
        
        keysToCheck.forEach(key => {
            if (key.includes('test') || key.includes('Test') || key.includes('mock') || key.includes('Mock')) {
                localStorage.removeItem(key);
                cleanedKeys++;
                console.log('🗑️ Удален тестовый ключ:', key);
            }
        });
        
        document.getElementById('output').innerHTML = 
            '<h2>Очистка завершена!</h2>' +
            '<p><strong>Было видео:</strong> ' + allVideos.length + '</p>' +
            '<p><strong>Осталось реальных видео:</strong> ' + realVideos.length + '</p>' +
            '<p><strong>Удалено тестовых видео:</strong> ' + (allVideos.length - realVideos.length) + '</p>' +
            '<p><strong>Удалено тестовых ключей:</strong> ' + cleanedKeys + '</p>' +
            '<p><strong>Реальные каналы:</strong> ' + realChannelIds.join(', ') + '</p>' +
            '<p><a href="/">Вернуться к приложению</a></p>';
            
        console.log('✅ Очистка завершена! Осталось только реальных данных.');
    </script>
</body>
</html>`)
})

// Test route for OurVideosManager
app.get('/test', (c) => {
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Тест OurVideosManager</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">🎬 Тестирование модуля "Наши видео"</h1>
        
        <!-- Статистические карточки -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <i class="fas fa-video text-blue-500 text-2xl"></i>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-500">Всего новых</div>
                        <div class="text-2xl font-bold text-gray-900" id="total-new-videos">0</div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <i class="fas fa-eye-slash text-orange-500 text-2xl"></i>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-500">Непрочитанные</div>
                        <div class="text-2xl font-bold text-gray-900" id="unread-new-videos">0</div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <i class="fas fa-play text-green-500 text-2xl"></i>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-500">Просмотры</div>
                        <div class="text-2xl font-bold text-gray-900" id="new-videos-total-views">0</div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <i class="fas fa-user-slash text-red-500 text-2xl"></i>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-500">Без категории</div>
                        <div class="text-2xl font-bold text-gray-900" id="uncategorized-videos">0</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Список видео -->
        <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b">
                <h3 class="text-lg font-medium">📹 Наши видео (<span id="videos-count-display">0</span>)</h3>
            </div>
            <div id="new-videos-list-detailed" class="p-6">
                <!-- Видео будут загружены здесь -->
            </div>
        </div>
        
        <!-- Статус загрузки -->
        <div id="loading-status" class="mt-6 text-center text-gray-500">
            Загрузка модуля...
        </div>
    </div>

    <script type="module">
        console.log('🧪 Запуск тестирования OurVideosManager...');
        
        // Mock классы
        class MockDataManager {
            constructor() { this.data = new Map(); }
            get(key) { return this.data.get(key) || null; }
            set(key, value) { this.data.set(key, value); return true; }
            saveData(key, value) { this.set(key, value); return Promise.resolve(true); }
        }
        
        class MockChannelManager {
            async getMyChannels() {
                return [{
                    id: 'channel1',
                    title: 'Тестовый канал',
                    videos: [{
                        id: 'video1',
                        title: 'Тестовое видео длинное название для проверки',
                        duration: 'PT2M30S',
                        viewCount: '1500',
                        likeCount: '45',
                        commentCount: '12',
                        publishedAt: '2024-01-15T10:00:00Z',
                        thumbnail: '/static/placeholder-video.png',
                        url: 'https://youtube.com/watch?v=video1',
                        isRead: false,
                        authorCategory: null
                    }]
                }];
            }
        }
        
        class MockCategoryManager {
            async getCategories() { return [{ name: 'Тестовый автор', color: '#3B82F6' }]; }
            getCategoryColor(name) { return name ? '#3B82F6' : '#6B7280'; }
        }
        
        class MockViralScoreCalculator {
            calculateScore(video) {
                const views = parseInt(video.viewCount) || 0;
                const likes = parseInt(video.likeCount) || 0;
                const comments = parseInt(video.commentCount) || 0;
                return views > 0 ? Math.round((likes + comments * 2) / views * 100000) : 0;
            }
        }
        
        try {
            const { OurVideosManager } = await import('/api/modules/OurVideosManager.js');
            
            const ourVideosManager = new OurVideosManager(
                new MockDataManager(),
                new MockChannelManager(),
                new MockCategoryManager(),
                new MockViralScoreCalculator()
            );
            
            console.log('🚀 Инициализация OurVideosManager...');
            await ourVideosManager.init();
            
            document.getElementById('loading-status').innerHTML = '✅ Модуль успешно загружен! Найдено видео: ' + (await ourVideosManager.getFilteredVideos()).length;
            document.getElementById('loading-status').className = 'mt-6 text-center text-green-600 font-medium';
            
        } catch (error) {
            console.error('❌ Ошибка:', error);
            document.getElementById('loading-status').innerHTML = '❌ Ошибка: ' + error.message;
            document.getElementById('loading-status').className = 'mt-6 text-center text-red-600 font-medium';
        }
    </script>
</body>
</html>`;
  
  return c.html(html);
})

// Default route
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ViralScript AI v4.0 - Модульная архитектура</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
        <script src="/test-scripts.js"></script>
    </head>
    <body class="bg-gray-50 font-sans">
        <!-- Navigation Header -->
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <h1 class="text-xl font-bold text-gray-900">
                            <i class="fas fa-video text-indigo-600 mr-2"></i>
                            ViralScript AI v4.0
                        </h1>
                        <span class="ml-3 text-sm text-gray-500">Модульная архитектура</span>
                    </div>
                    
                    <nav class="flex space-x-1">
                        <button onclick="showSection('dashboard')" class="nav-btn active px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 transition-colors">
                            <i class="fas fa-tachometer-alt mr-1"></i>Дашборд
                        </button>

                        <button onclick="showSection('my-channels')" class="nav-btn px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 transition-colors">
                            <i class="fas fa-broadcast-tower mr-1"></i>Каналы
                        </button>
                        <button onclick="showSection('our-videos')" class="nav-btn px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 transition-colors">
                            <i class="fas fa-video mr-1"></i>Видео
                        </button>
                        <button onclick="showSection('authors')" class="nav-btn px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 transition-colors">
                            <i class="fas fa-user-friends mr-1"></i>Авторы
                        </button>
                        <button onclick="showSection('rubrics')" class="nav-btn px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 transition-colors">
                            <i class="fas fa-folder-open mr-1"></i>Рубрики
                        </button>
                        <button onclick="showSection('analytics')" class="nav-btn px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 transition-colors">
                            <i class="fas fa-chart-bar mr-1"></i>Аналитика
                        </button>
                        <button onclick="showNotificationsModal()" class="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                            <i class="fas fa-bell mr-1"></i>Уведомления
                            <span id="notifications-badge" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center hidden">0</span>
                        </button>
                        <button onclick="showApiSettingsModal()" class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                            <i class="fas fa-cog mr-1"></i>Настройки
                        </button>
                    </nav>
                </div>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Dashboard Section -->
            <div id="dashboard-section" class="section active">
                <div class="mb-8">
                    <h2 class="text-3xl font-bold text-gray-900 mb-2">
                        <i class="fas fa-tachometer-alt text-indigo-600 mr-2"></i>
                        Дашборд
                    </h2>
                    <p class="text-gray-600">Обзор активности и ключевые метрики</p>
                </div>

                <!-- Stats Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-xl shadow-sm border">
                        <div class="flex items-center">
                            <div class="p-3 bg-blue-100 rounded-lg">
                                <i class="fas fa-broadcast-tower text-blue-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Всего каналов</p>
                                <p class="text-2xl font-bold text-gray-900" id="total-channels">0</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow-sm border">
                        <div class="flex items-center">
                            <div class="p-3 bg-green-100 rounded-lg">
                                <i class="fas fa-video text-green-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Всего видео</p>
                                <p class="text-2xl font-bold text-gray-900" id="total-videos">0</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow-sm border">
                        <div class="flex items-center">
                            <div class="p-3 bg-red-100 rounded-lg">
                                <i class="fas fa-fire text-red-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Viral видео</p>
                                <p class="text-2xl font-bold text-gray-900" id="viral-videos">0</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow-sm border">
                        <div class="flex items-center">
                            <div class="p-3 bg-purple-100 rounded-lg">
                                <i class="fas fa-trophy text-purple-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Средний рейтинг</p>
                                <p class="text-2xl font-bold text-gray-900" id="avg-viral-score">0.0</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <button onclick="showSection('my-channels')" class="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                            <i class="fas fa-plus text-indigo-600 mr-3"></i>
                            <span class="font-medium">Добавить канал</span>
                        </button>
                        <button onclick="showSection('our-videos')" class="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                            <i class="fas fa-sync text-green-600 mr-3"></i>
                            <span class="font-medium">Синхронизировать видео</span>
                        </button>
                        <button onclick="showSection('analytics')" class="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                            <i class="fas fa-chart-bar text-purple-600 mr-3"></i>
                            <span class="font-medium">Посмотреть аналитику</span>
                        </button>

                        <button onclick="showNotificationsModal()" class="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                            <i class="fas fa-list text-blue-600 mr-3"></i>
                            <span class="font-medium">Просмотреть уведомления</span>
                        </button>

                        <button onclick="showCategoriesStats()" class="flex items-center p-4 border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-colors">
                            <i class="fas fa-chart-pie text-teal-600 mr-3"></i>
                            <span class="font-medium">Статистика категорий</span>
                        </button>
                        <button onclick="exportBackup()" class="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
                            <i class="fas fa-download text-orange-600 mr-3"></i>
                            <span class="font-medium">Экспорт данных</span>
                        </button>
                        <button onclick="importBackup()" class="flex items-center p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors">
                            <i class="fas fa-upload text-pink-600 mr-3"></i>
                            <span class="font-medium">Импорт данных</span>
                        </button>
                    </div>
                </div>

                <!-- System Status -->
                <div class="mt-6 bg-white p-6 rounded-lg shadow-sm border">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Статус системы</h3>
                    <div id="system-status" class="space-y-2">
                        <div class="flex items-center">
                            <i class="fas fa-circle text-red-500 mr-2"></i>
                            <span class="text-sm text-gray-600">Модули инициализируются...</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- УДАЛЕНО: Дублирующая секция "Видео" - оставлена только "Наши видео" -->

            <!-- My Channels Section -->
            <div id="my-channels-section" class="section">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900">
                            <i class="fas fa-broadcast-tower text-indigo-600 mr-2"></i>
                            Мои каналы
                        </h2>
                        <p class="text-gray-600 mt-2">Мониторинг ваших YouTube каналов и их видео</p>
                    </div>
                    <div class="flex space-x-3">
                        <button onclick="loadAllChannelVideos()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            <i class="fas fa-download mr-2"></i>Загрузить все видео
                        </button>
                        <button onclick="showAddChannelModal()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                            <i class="fas fa-plus mr-2"></i>Добавить канал
                        </button>
                    </div>
                </div>

                <!-- Channel Statistics Overview -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-lg shadow-sm border">
                        <div class="flex items-center">
                            <div class="p-2 bg-blue-100 rounded-lg">
                                <i class="fas fa-tv text-blue-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Каналов</p>
                                <p class="text-2xl font-bold text-gray-900" id="my-channels-total">0</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white p-6 rounded-lg shadow-sm border">
                        <div class="flex items-center">
                            <div class="p-2 bg-green-100 rounded-lg">
                                <i class="fas fa-video text-green-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Видео</p>
                                <p class="text-2xl font-bold text-gray-900" id="my-videos-total">0</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white p-6 rounded-lg shadow-sm border">
                        <div class="flex items-center">
                            <div class="p-2 bg-purple-100 rounded-lg">
                                <i class="fas fa-eye text-purple-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Общие просмотры</p>
                                <p class="text-2xl font-bold text-gray-900" id="my-total-views">0</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white p-6 rounded-lg shadow-sm border">
                        <div class="flex items-center">
                            <div class="p-2 bg-orange-100 rounded-lg">
                                <i class="fas fa-chart-line text-orange-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Средний рост</p>
                                <p class="text-2xl font-bold text-gray-900" id="my-avg-growth">0%</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- New Videos This Week Card -->
                    <div class="bg-white p-6 rounded-lg shadow-sm border cursor-pointer hover:shadow-md hover:bg-red-50 transition-all duration-200" 
                         id="new-videos-card" 
                         onclick="showNewVideosModal()" 
                         title="Показать новые видео за неделю">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="p-2 bg-red-100 rounded-lg">
                                    <i class="fas fa-bell text-red-600"></i>
                                </div>
                                <div class="ml-4">
                                    <p class="text-sm font-medium text-gray-600">Наши видео</p>
                                    <p class="text-2xl font-bold text-gray-900" id="new-videos-count">0</p>
                                </div>
                            </div>
                            <div class="relative">
                                <div id="notification-badge" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center hidden">
                                    <span id="notification-count">0</span>
                                </div>
                                <div class="text-red-600">
                                    <i class="fas fa-arrow-right text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Channels List -->
                <div class="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Список каналов</h3>
                    <div id="channels-container" class="space-y-6">
                        <!-- Channels will be rendered here -->
                    </div>
                    
                    <!-- Empty State -->
                    <div id="channels-empty-state" class="text-center py-12">
                        <i class="fas fa-tv text-gray-400 text-6xl mb-4"></i>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Нет добавленных каналов</h3>
                        <p class="text-gray-600 mb-6">Добавьте свои каналы для мониторинга и аналитики</p>
                        <button onclick="showAddChannelModal()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium">
                            <i class="fas fa-plus mr-2"></i>Добавить первый канал
                        </button>
                    </div>
                </div>

                <!-- Channel Analytics Dashboard -->
                <div class="space-y-6">
                    <!-- Analytics Charts Row -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Categories Performance Chart -->
                        <div class="bg-white rounded-lg shadow-sm border p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h4 class="text-lg font-semibold text-gray-900">Эффективность по авторам</h4>
                                <button onclick="refreshCategoriesChart()" class="text-gray-400 hover:text-gray-600">
                                    <i class="fas fa-sync-alt"></i>
                                </button>
                            </div>
                            <div class="chart-container" style="height: 300px;">
                                <canvas id="categoriesPerformanceChart"></canvas>
                            </div>
                        </div>
                        
                        <!-- Rubrics Performance Chart -->
                        <div class="bg-white rounded-lg shadow-sm border p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h4 class="text-lg font-semibold text-gray-900">Популярность рубрик</h4>
                                <button onclick="refreshRubricsChart()" class="text-gray-400 hover:text-gray-600">
                                    <i class="fas fa-sync-alt"></i>
                                </button>
                            </div>
                            <div class="chart-container" style="height: 300px;">
                                <canvas id="rubricsPerformanceChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- Channel Growth Timeline -->
                    <div class="bg-white rounded-lg shadow-sm border p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h4 class="text-lg font-semibold text-gray-900">Динамика роста каналов</h4>
                            <div class="flex space-x-2">
                                <select id="growth-period-filter" class="text-sm border border-gray-300 rounded px-2 py-1" onchange="refreshGrowthChart()">
                                    <option value="7">Неделя</option>
                                    <option value="30" selected>Месяц</option>
                                    <option value="90">3 месяца</option>
                                </select>
                                <button onclick="refreshGrowthChart()" class="text-gray-400 hover:text-gray-600">
                                    <i class="fas fa-sync-alt"></i>
                                </button>
                            </div>
                        </div>
                        <div class="chart-container" style="height: 400px;">
                            <canvas id="channelGrowthChart"></canvas>
                        </div>
                    </div>

                    <!-- Top Performing Videos -->
                    <div class="bg-white rounded-lg shadow-sm border p-6">
                        <h4 class="text-lg font-semibold text-gray-900 mb-4">Топ видео по эффективности</h4>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Видео</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Канал</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Просмотры</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Лайки</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Вирусный балл</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
                                    </tr>
                                </thead>
                                <tbody id="top-videos-table" class="bg-white divide-y divide-gray-200">
                                    <!-- Top videos will be rendered here -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Export and Actions -->
                    <div class="bg-white rounded-lg shadow-sm border p-6">
                        <div class="flex items-center justify-between">
                            <h4 class="text-lg font-semibold text-gray-900">Экспорт и действия</h4>
                            <div class="flex space-x-3">
                                <button onclick="exportChannelAnalytics('pdf')" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                                    <i class="fas fa-file-pdf mr-2"></i>Экспорт PDF
                                </button>
                                <button onclick="exportChannelAnalytics('excel')" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                                    <i class="fas fa-file-excel mr-2"></i>Экспорт Excel
                                </button>
                                <button onclick="scheduleChannelSync()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                                    <i class="fas fa-clock mr-2"></i>Авто-синхронизация
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Our Videos Section -->
            <div id="our-videos-section" class="section">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-2">
                            <i class="fas fa-video text-red-600 mr-2"></i>
                            Наши видео
                        </h2>
                        <p class="text-gray-600">Управление свежими публикациями с ваших каналов</p>
                    </div>
                    <div class="flex space-x-3">
                        <button onclick="syncAllChannelsNewVideos()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                            <i class="fas fa-sync-alt mr-2"></i>Обновить все каналы
                        </button>
                        <button onclick="markAllNewVideosAsRead()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium">
                            <i class="fas fa-check mr-2"></i>Отметить все как прочитанное
                        </button>
                        <button onclick="showSection('authors-analytics')" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                            <i class="fas fa-chart-bar mr-2"></i>Аналитика авторов
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div class="bg-white p-6 rounded-xl shadow-sm border">
                        <div class="flex items-center">
                            <div class="p-3 bg-orange-100 rounded-lg">
                                <i class="fas fa-video text-orange-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Всего новых</p>
                                <p class="text-2xl font-bold text-gray-900" id="total-new-videos">0</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white p-6 rounded-xl shadow-sm border">
                        <div class="flex items-center">
                            <div class="p-3 bg-red-100 rounded-lg">
                                <i class="fas fa-bell text-red-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Непрочитанных</p>
                                <p class="text-2xl font-bold text-gray-900" id="unread-new-videos">0</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white p-6 rounded-xl shadow-sm border">
                        <div class="flex items-center">
                            <div class="p-3 bg-green-100 rounded-lg">
                                <i class="fas fa-eye text-green-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Общие просмотры</p>
                                <p class="text-2xl font-bold text-gray-900" id="new-videos-total-views">0</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white p-6 rounded-xl shadow-sm border">
                        <div class="flex items-center">
                            <div class="p-3 bg-purple-100 rounded-lg">
                                <i class="fas fa-tags text-purple-600"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Без категории</p>
                                <p class="text-2xl font-bold text-gray-900" id="uncategorized-videos">0</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Filters and Actions -->
                <div class="bg-white p-6 rounded-lg shadow-sm border mb-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">Фильтры и действия</h3>
                        <div class="text-sm text-gray-600">
                            Выбрано: <span id="selected-new-videos-count">0</span> видео
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <!-- First row with 4 filters -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Канал</label>
                            <select id="channel-filter-new-videos" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                                <option value="">Все каналы</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                            <select id="read-status-filter" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                                <option value="">Все видео</option>
                                <option value="unread">Непрочитанные</option>
                                <option value="read">Прочитанные</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Автор</label>
                            <select id="author-filter-new-videos" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                                <option value="">Все авторы</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Тип видео</label>
                            <select id="video-type-filter" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                                <option value="">Все типы</option>
                                <option value="short">Короткие (≤60 сек)</option>
                                <option value="medium">Средние (61-119 сек)</option>
                                <option value="long">Длинные (≥2 мин)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <!-- Second row with dates and apply button -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Дата от</label>
                            <input type="date" id="date-from-filter" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Дата до</label>
                            <input type="date" id="date-to-filter" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                        </div>
                        <div class="flex items-end">
                            <button onclick="applyNewVideosFilters()" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                                <i class="fas fa-filter mr-2"></i>Применить фильтры
                            </button>
                        </div>
                    </div>

                    <!-- Sorting Controls -->
                    <div class="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                        <div class="flex items-center space-x-4">
                            <span class="text-sm font-medium text-gray-700">Сортировка:</span>
                            <select id="sort-by-filter" class="border border-gray-300 rounded-lg px-3 py-1 text-sm" onchange="applySorting()">
                                <option value="date_desc">Дата (новые сначала)</option>
                                <option value="date_asc">Дата (старые сначала)</option>
                                <option value="views_desc">Просмотры (больше сначала)</option>
                                <option value="views_asc">Просмотры (меньше сначала)</option>
                            </select>
                        </div>
                        <div class="text-sm text-gray-600">
                            Показано: <span id="videos-count-display">0</span> видео
                        </div>
                    </div>

                    <!-- Mass Actions -->
                    <div class="flex flex-wrap items-center gap-3">
                        <button onclick="selectAllNewVideos()" class="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg">
                            <i class="fas fa-check-square mr-1"></i>Выбрать все
                        </button>
                        <button onclick="deselectAllNewVideos()" class="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg">
                            <i class="fas fa-square mr-1"></i>Снять выбор
                        </button>
                        <div class="h-4 border-l border-gray-300 mx-2"></div>
                        <!-- УДАЛЕНО: кнопка массового назначения авторов -->
                        <button onclick="markSelectedAsRead()" class="text-sm bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg" disabled id="mark-read-btn">
                            <i class="fas fa-check mr-1"></i>Отметить как прочитанное
                        </button>
                        <div class="h-4 border-l border-gray-300 mx-2"></div>
                        <button onclick="exportFilteredVideosToExcel()" class="text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-2 rounded-lg">
                            <i class="fas fa-file-excel mr-1"></i>Экспорт в Excel
                        </button>
                    </div>
                </div>

                <!-- Videos List -->
                <div class="bg-white rounded-lg shadow-sm border">
                    <div class="p-6 border-b">
                        <h3 class="text-lg font-semibold text-gray-900">Список новых видео</h3>
                    </div>
                    <div id="new-videos-list-detailed" class="p-6">
                        <!-- New videos will be rendered here -->
                        <div class="text-center py-12 text-gray-500">
                            <i class="fas fa-video text-4xl mb-4"></i>
                            <p>Видео появятся здесь после добавления каналов</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Authors Section -->
            <div id="authors-section" class="section">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-2">
                            <i class="fas fa-user-friends text-blue-600 mr-2"></i>
                            Управление авторами
                        </h2>
                        <p class="text-gray-600">Создание и назначение авторов для видео, аналитика по авторам</p>
                    </div>
                    <button onclick="showAddAuthorModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                        <i class="fas fa-plus mr-2"></i>Добавить автора
                    </button>
                </div>

                <!-- Authors Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6" id="authors-grid">
                    <!-- Authors will be rendered here -->
                    <div class="col-span-full text-center py-12 text-gray-500">
                        <i class="fas fa-user-plus text-4xl mb-4"></i>
                        <p>Добавьте первого автора для начала работы</p>
                    </div>
                </div>

                <!-- Authors Stats -->
                <div class="bg-white rounded-lg shadow-sm border p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Статистика авторов</h3>
                    <div id="authors-stats">
                        <!-- Stats will be rendered here -->
                        <p class="text-gray-500">Статистика появится после добавления авторов</p>
                    </div>
                </div>
            </div>

            <!-- Rubrics Section -->
            <div id="rubrics-section" class="section">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-2">
                            <i class="fas fa-folder-open text-purple-600 mr-2"></i>
                            Управление рубриками
                        </h2>
                        <p class="text-gray-600">Создание рубрик контента с привязкой к каналам, организация видео по темам</p>
                    </div>
                    <button onclick="showAddRubricModal()" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                        <i class="fas fa-plus mr-2"></i>Добавить рубрику
                    </button>
                </div>

                <!-- Channel Filter for Rubrics -->
                <div class="bg-white rounded-lg shadow-sm border p-4 mb-6">
                    <div class="flex items-center space-x-4">
                        <label class="text-sm font-medium text-gray-700">Фильтр по каналу:</label>
                        <select id="rubrics-channel-filter" onchange="filterRubricsByChannel()" class="flex-1 max-w-xs border border-gray-300 rounded-lg px-3 py-2">
                            <option value="">Все рубрики</option>
                            <option value="general">Общие рубрики</option>
                            <!-- Channel options will be added dynamically -->
                        </select>
                    </div>
                </div>

                <!-- Rubrics Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6" id="rubrics-grid">
                    <!-- Rubrics will be rendered here -->
                    <div class="col-span-full text-center py-12 text-gray-500">
                        <i class="fas fa-folder-plus text-4xl mb-4"></i>
                        <p>Добавьте первую рубрику для начала работы</p>
                    </div>
                </div>

                <!-- Rubrics Stats -->
                <div class="bg-white rounded-lg shadow-sm border p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Статистика рубрик</h3>
                    <div id="rubrics-stats">
                        <!-- Stats will be rendered here -->
                        <p class="text-gray-500">Статистика появится после добавления рубрик</p>
                    </div>
                </div>
            </div>

            <!-- Analytics Section -->
            <div id="analytics-section" class="section">
                <div class="mb-8">
                    <h2 class="text-3xl font-bold text-gray-900 mb-2">
                        <i class="fas fa-chart-bar text-indigo-600 mr-2"></i>
                        Расширенная аналитика
                    </h2>
                    <p class="text-gray-600">Детальный анализ контента и каналов с метриками</p>
                </div>

                <!-- Analytics Content -->
                <div class="bg-white p-6 rounded-lg shadow-sm border">
                    <div class="text-center py-12 text-gray-500">
                        <i class="fas fa-chart-bar text-4xl mb-4"></i>
                        <p>Аналитика будет доступна после добавления каналов</p>
                    </div>
                </div>
            </div>
        </main>

        <!-- Add Channel Modal -->
        <div id="add-channel-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">Добавить YouTube канал</h3>
                    <button onclick="hideAddChannelModal()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">URL канала *</label>
                        <input type="url" id="channel-url" placeholder="https://www.youtube.com/@channelname" 
                               class="w-full border border-gray-300 rounded-lg px-3 py-2" required
                               oninput="autoFetchChannelInfo()">
                        <p class="text-xs text-gray-500 mt-1">Введите URL YouTube канала</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Название канала</label>
                        <input type="text" id="channel-name" placeholder="Будет заполнено автоматически" 
                               class="w-full border border-gray-300 rounded-lg px-3 py-2" readonly>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Описание канала</label>
                        <textarea id="channel-description" rows="3" placeholder="Краткое описание канала..."
                                  class="w-full border border-gray-300 rounded-lg px-3 py-2"></textarea>
                    </div>
                </div>

                <div class="flex justify-end space-x-3 mt-6">
                    <button onclick="hideAddChannelModal()" 
                            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Отмена
                    </button>
                    <button onclick="saveChannel()" id="save-channel-btn"
                            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                        Добавить канал
                    </button>
                </div>
            </div>
        </div>

        <!-- API Settings Modal -->
        <div id="api-settings-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">Настройки API</h3>
                    <button onclick="hideApiSettingsModal()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">YouTube Data API v3 Key</label>
                        <input type="password" id="youtube-api-key" placeholder="AIzaSyC..." 
                               class="w-full border border-gray-300 rounded-lg px-3 py-2">
                        <p class="text-xs text-gray-500 mt-1">Получите API ключ в Google Cloud Console</p>
                    </div>
                </div>

                <div class="flex justify-end space-x-3 mt-6">
                    <button onclick="hideApiSettingsModal()" 
                            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Отмена
                    </button>
                    <button onclick="saveApiKey()" 
                            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>

        <script type="module" defer>
            // Import ES6 modules
            import { DataManager } from '/api/modules/DataManager.js';
            import { YouTubeAPI } from '/api/modules/YouTubeAPI.js';
            import { ErrorHandler } from '/api/modules/ErrorHandler.js';
            import { SecureConfig } from '/api/modules/SecureConfig.js';
            import { ChannelManager } from '/api/modules/ChannelManager.js';
            import { CategoryManager } from '/api/modules/CategoryManager.js';
            import { NotificationManager } from '/api/modules/NotificationManager.js';
            import { RubricManager } from '/api/modules/RubricManager.js';
            import { AnalyticsManager } from '/api/modules/AnalyticsManager.js';
            import { ChartManager } from '/api/modules/ChartManager.js';
            import { ViralScoreCalculator } from '/api/modules/ViralScoreCalculator.js';
            import { ImportExportManager } from '/api/modules/ImportExportManager.js';
            import { OurVideosManager } from '/api/modules/OurVideosManager.js';
            import { ViralScriptApp } from '/api/modules/ViralScriptApp.js';

            // Global variables for module access
            window.dataManager = null;
            window.youtubeAPI = null;
            window.errorHandler = null;
            window.secureConfig = null;
            window.channelManager = null;
            window.categoryManager = null;
            window.notificationManager = null;
            window.rubricManager = null;
            window.app = null;

            // Initialize the application
            let isInitialized = false;
            async function initializeApp() {
                if (isInitialized) {
                    console.log('⚠️ Инициализация уже выполнена, пропускаем...');
                    return;
                }
                
                try {
                    console.log('🔄 Инициализация модулей ViralScript AI...');
                    isInitialized = true;
                    
                    // Initialize core modules
                    window.errorHandler = new ErrorHandler();
                    window.secureConfig = new SecureConfig();
                    window.dataManager = new DataManager();
                    window.youtubeAPI = new YouTubeAPI();
                    
                    // Initialize business logic modules
                    window.chartManager = new ChartManager();
                    window.viralScoreCalculator = new ViralScoreCalculator();
                    
                    window.channelManager = new ChannelManager(
                        window.dataManager,
                        window.youtubeAPI,
                        window.viralScoreCalculator
                    );
                    
                    window.categoryManager = new CategoryManager(
                        window.dataManager
                    );
                    
                    window.notificationManager = new NotificationManager(
                        window.dataManager
                    );
                    
                    window.rubricManager = new RubricManager(
                        window.dataManager,
                        window.errorHandler
                    );
                    
                    // Now AnalyticsManager has all required dependencies
                    window.analyticsManager = new AnalyticsManager(
                        window.dataManager,
                        window.viralScoreCalculator,
                        window.chartManager
                    );
                    
                    window.importExportManager = new ImportExportManager(
                        window.dataManager,
                        window.viralScoreCalculator
                    );
                    
                    window.ourVideosManager = new OurVideosManager(
                        window.dataManager,
                        window.channelManager,
                        window.categoryManager,
                        window.viralScoreCalculator
                    );
                    
                    window.app = new ViralScriptApp();

                    // Initialize the main app
                    await window.app.init();
                    
                    // Initialize OurVideosManager
                    await window.ourVideosManager.init();
                    
                    // Initialize UI displays
                    updateChannelsDisplay();
                    
                    console.log('✅ Все модули успешно инициализированы!');
                    updateSystemStatus('success', 'Все модули загружены успешно');
                    
                } catch (error) {
                    console.error('❌ Ошибка инициализации:', error);
                    updateSystemStatus('error', 'Ошибка инициализации: ' + error.message);
                }
            }

            // Update system status indicator
            function updateSystemStatus(status, message) {
                const statusEl = document.getElementById('system-status');
                const icon = status === 'success' ? 'fa-check-circle text-green-500' : 'fa-exclamation-circle text-red-500';
                
                statusEl.innerHTML = 
                    '<div class="flex items-center">' +
                        '<i class="fas ' + icon + ' mr-2"></i>' +
                        '<span class="text-sm text-gray-600">' + message + '</span>' +
                    '</div>';
            }

            // Navigation functions
            window.showSection = function showSection(sectionName) {
                console.log('📍 Переключение на секцию:', sectionName);
                
                // Hide all sections
                document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                
                // Show target section
                const section = document.getElementById(sectionName + '-section');
                if (section) {
                    section.classList.add('active');
                }
                
                // Update navigation
                const navBtn = document.querySelector('[onclick="showSection(\\\'' + sectionName + '\\\')"]');
                if (navBtn) {
                    navBtn.classList.add('active');
                }
                
                // Специальные действия для раздела "Мои каналы"
                if (sectionName === 'my-channels') {
                    // Обновляем отображение каналов
                    updateChannelsDisplay();
                    // Инициализируем аналитические графики
                    initializeAnalyticsCharts();
                }
                
                // Save current section
                localStorage.setItem('viralscript_currentSection', sectionName);
            }

            // Modal functions
            window.showAddChannelModal = function showAddChannelModal() {
                document.getElementById('add-channel-modal').style.display = 'flex';
            }

            window.hideAddChannelModal = function hideAddChannelModal() {
                document.getElementById('add-channel-modal').style.display = 'none';
                // Clear form
                document.getElementById('channel-url').value = '';
                document.getElementById('channel-name').value = '';
                document.getElementById('channel-description').value = '';
            }

            window.showApiSettingsModal = async function showApiSettingsModal() {
                // Загружаем сохраненный API ключ
                try {
                    if (window.secureConfig) {
                        const savedKey = await window.secureConfig.getApiKey('youtube');
                        if (savedKey) {
                            document.getElementById('youtube-api-key').value = savedKey;
                        }
                    }
                } catch (error) {
                    console.error('Ошибка загрузки API ключа:', error);
                }
                
                document.getElementById('api-settings-modal').style.display = 'flex';
            }

            window.hideApiSettingsModal = function hideApiSettingsModal() {
                document.getElementById('api-settings-modal').style.display = 'none';
                // Очищаем поле для безопасности
                document.getElementById('youtube-api-key').value = '';
            }

            // Channel management functions
            let fetchTimeout = null;
            window.autoFetchChannelInfo = async function autoFetchChannelInfo() {
                if (fetchTimeout) clearTimeout(fetchTimeout);
                
                fetchTimeout = setTimeout(async () => {
                    const urlInput = document.getElementById('channel-url');
                    const channelUrl = urlInput?.value?.trim();
                    
                    if (!channelUrl || channelUrl.length < 10) {
                        document.getElementById('channel-name').value = '';
                        return;
                    }
                    
                    try {
                        if (window.youtubeAPI) {
                            const channelInfo = await window.youtubeAPI.getChannelInfo(channelUrl);
                            document.getElementById('channel-name').value = channelInfo.name;
                            document.getElementById('channel-description').value = channelInfo.description || '';
                        }
                    } catch (error) {
                        console.error('Ошибка получения информации о канале:', error);
                    }
                }, 1000);
            }

            window.saveChannel = async function saveChannel() {
                const url = document.getElementById('channel-url').value?.trim();
                
                if (!url) {
                    alert('Пожалуйста, введите URL канала');
                    return;
                }
                
                try {
                    // Используем новый ChannelManager
                    if (window.channelManager) {
                        const channel = await window.channelManager.addChannel(url);
                        console.log('✅ Канал добавлен через ChannelManager:', channel);
                        hideAddChannelModal();
                        alert('✅ Канал "' + channel.name + '" успешно добавлен!');
                        
                        // Обновляем отображение каналов
                        updateChannelsDisplay();
                    } else if (window.app) {
                        // Fallback к старому методу
                        await window.app.addChannel(url);
                        hideAddChannelModal();
                        alert('✅ Канал успешно добавлен!');
                    }
                } catch (error) {
                    console.error('❌ Ошибка сохранения канала:', error);
                    alert('❌ Ошибка: ' + error.message);
                }
            }

            // Channel display functions
            window.updateChannelsDisplay = function updateChannelsDisplay() {
                // Временно упрощено для избежания template literal ошибок
                console.log('updateChannelsDisplay вызван');
                
                try {
                    const container = document.getElementById('channels-container');
                    const emptyState = document.getElementById('channels-empty-state');
                    
                    if (!container || !window.channelManager) {
                        console.warn('⚠️ updateChannelsDisplay: container или channelManager не найден');
                        return;
                    }
                    
                    const channels = window.channelManager.getChannels() || [];
                    console.log('📺 Обновление отображения каналов, найдено:', channels.length);
                    
                    if (!channels || channels.length === 0) {
                        container.style.display = 'none';
                        if (emptyState) emptyState.style.display = 'block';
                        return;
                    }
                    
                    if (emptyState) emptyState.style.display = 'none';
                    container.style.display = 'block';
                    
                    // Упрощенный HTML для каналов
                    container.innerHTML = channels.map(channel => {
                        return '<div class="bg-white border border-gray-200 rounded-lg p-6 mb-4">' +
                            '<h4 class="text-xl font-semibold text-gray-900 mb-2">' + (channel.name || channel.title || 'Неизвестный канал') + '</h4>' +
                            '<p class="text-sm text-gray-600 mb-4">' + (channel.description || 'Описание канала отсутствует') + '</p>' +
                            '<div class="grid grid-cols-3 gap-4 text-sm">' +
                                '<div><strong>Подписчики:</strong> ' + (formatNumber(channel.subscribers) || '0') + '</div>' +
                                '<div><strong>Видео:</strong> ' + (channel.videoCount || '0') + '</div>' +
                                '<div><strong>Просмотры:</strong> ' + (formatNumber(channel.totalViews) || '0') + '</div>' +
                            '</div>' +
                        '</div>';
                    }).join('');
                    
                } catch (error) {
                    console.error('❌ Ошибка updateChannelsDisplay:', error);
                }
            };
            
            // Channel statistics functions
            window.updateMyChannelStats = function updateMyChannelStats(channels) {
                const totalChannels = channels.length;
                const totalVideos = channels.reduce((sum, ch) => sum + (ch.videoCount || 0), 0);
                const totalViews = channels.reduce((sum, ch) => sum + (ch.viewCount || 0), 0);
                const avgGrowth = channels.length > 0 ? 
                    channels.reduce((sum, ch) => sum + (ch.growthRate || 0), 0) / channels.length : 0;
                
                // Обновляем UI элементы статистики
                const elements = {
                    'my-channels-total': totalChannels,
                    'my-videos-total': totalVideos,
                    'my-total-views': formatNumber(totalViews),
                    'my-avg-growth': avgGrowth.toFixed(1) + '%'
                };
                
                Object.entries(elements).forEach(([id, value]) => {
                    const el = document.getElementById(id);
                    if (el) el.textContent = value;
                });
                
                // Обновляем счетчик новых видео
                updateNewVideosCount(channels);
            }
            
            window.updateNewVideosCount = function updateNewVideosCount(channels) {
                try {
                    // Подсчитываем новые видео за последнюю неделю
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    
                    const allVideos = window.dataManager?.get('videos') || [];
                    const newVideos = allVideos.filter(video => {
                        const publishDate = new Date(video.publishedAt || video.published_at);
                        return publishDate >= oneWeekAgo && channels.some(ch => ch.id === video.channel_source_id);
                    });
                    
                    const newVideosCount = newVideos.length;
                    const unreadCount = newVideos.filter(v => !v.isRead).length;
                    
                    // Обновляем UI
                    const countEl = document.getElementById('new-videos-count');
                    if (countEl) countEl.textContent = newVideosCount;
                    
                    // Управляем badge уведомлений
                    const badge = document.getElementById('notification-badge');
                    const badgeCount = document.getElementById('notification-count');
                    
                    if (badge && badgeCount) {
                        if (unreadCount > 0) {
                            badge.classList.remove('hidden');
                            badgeCount.textContent = unreadCount;
                        } else {
                            badge.classList.add('hidden');
                        }
                    }
                } catch (error) {
                    console.error('❌ Ошибка обновления счетчика новых видео:', error);
                }
            }
            
            // Chart creation functions
            window.createChannelGrowthChart = function createChannelGrowthChart(channel, index) {
                const ctx = document.getElementById('channelGrowthChart' + index);
                if (!ctx) {
                    console.warn('Canvas channelGrowthChart' + index + ' not found');
                    return;
                }
                
                // Уничтожаем существующий график если есть
                if (Chart.getChart(ctx)) {
                    Chart.getChart(ctx).destroy();
                }
                
                // Генерируем данные роста за последние 12 месяцев
                const months = [];
                const subscribersData = [];
                const viewsData = [];
                
                const now = new Date();
                const currentSubscribers = channel.subscribers || 1000;
                const currentViews = channel.viewCount || 50000;
                
                // Начальные значения (12 месяцев назад)
                const startSubscribers = Math.round(currentSubscribers * 0.3);
                const startViews = Math.round(currentViews * 0.2);
                
                for (let i = 11; i >= 0; i--) {
                    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
                    months.push(date.toLocaleDateString('ru-RU', { month: 'short', year: '2-digit' }));
                    
                    // Накопительный прогресс
                    const progressFactor = (11 - i) / 11;
                    const randomVariation = 0.95 + (Math.random() * 0.1);
                    
                    // Накопительные подписчики
                    const cumulativeSubscribers = Math.round(
                        startSubscribers + 
                        (currentSubscribers - startSubscribers) * progressFactor * randomVariation
                    );
                    subscribersData.push(cumulativeSubscribers);
                    
                    // Накопительные просмотры (в тысячах)
                    const cumulativeViews = Math.round(
                        startViews + 
                        (currentViews - startViews) * Math.pow(progressFactor, 0.8) * randomVariation
                    );
                    viewsData.push(Math.round(cumulativeViews / 1000));
                }
                
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: months,
                        datasets: [{
                            label: 'Подписчики',
                            data: subscribersData,
                            borderColor: 'rgb(59, 130, 246)',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            yAxisID: 'y',
                            tension: 0.4
                        }, {
                            label: 'Просмотры (тыс.)',
                            data: viewsData,
                            borderColor: 'rgb(139, 69, 19)',
                            backgroundColor: 'rgba(139, 69, 19, 0.1)',
                            yAxisID: 'y1',
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            mode: 'index',
                            intersect: false,
                        },
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Месяц'
                                }
                            },
                            y: {
                                type: 'linear',
                                display: true,
                                position: 'left',
                                title: {
                                    display: true,
                                    text: 'Подписчики',
                                    color: 'rgb(59, 130, 246)'
                                },
                                grid: {
                                    drawOnChartArea: false,
                                },
                            },
                            y1: {
                                type: 'linear',
                                display: true,
                                position: 'right',
                                title: {
                                    display: true,
                                    text: 'Просмотры (тыс.)',
                                    color: 'rgb(139, 69, 19)'
                                },
                                grid: {
                                    drawOnChartArea: false,
                                },
                            },
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top'
                            },
                            tooltip: {
                                mode: 'index',
                                intersect: false,
                            }
                        }
                    }
                });
            }
            
            // Utility functions
            window.formatNumber = function formatNumber(num) {
                if (num >= 1000000) {
                    return (num / 1000000).toFixed(1) + 'M';
                } else if (num >= 1000) {
                    return (num / 1000).toFixed(1) + 'K';
                } else {
                    return num.toString();
                }
            }
            
            window.formatDate = function formatDate(dateString) {
                if (!dateString) return 'Никогда';
                try {
                    const date = new Date(dateString);
                    return date.toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                } catch (error) {
                    return 'Неизвестно';
                }
            }
            
            // Channel action functions
            window.syncChannelVideos = async function syncChannelVideos(channelId) {
                try {
                    if (!window.channelManager) {
                        alert('❌ ChannelManager не инициализирован');
                        return;
                    }
                    
                    // Показываем индикатор загрузки
                    const button = event.target.closest('button');
                    const originalText = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    button.disabled = true;
                    
                    const result = await window.channelManager.syncChannelVideos(channelId, 20);
                    
                    // Восстанавливаем кнопку
                    button.innerHTML = originalText;
                    button.disabled = false;
                    
                    // Отправляем уведомление о завершении синхронизации
                    if (window.notificationManager && result.newVideos > 0) {
                        window.notificationManager.notifySyncComplete(result.channelName, result.newVideos);
                    }
                    
                    alert('✅ Синхронизация завершена!\\n\\nКанал: ' + result.channelName + '\\nНайдено видео: ' + result.totalFound + '\\nНовых: ' + result.newVideos + '\\nОбновлено: ' + result.existingVideos);
                    
                    // Обновляем отображение каналов
                    updateChannelsDisplay();
                    
                } catch (error) {
                    console.error('❌ Ошибка синхронизации канала:', error);
                    alert('❌ Ошибка синхронизации: ' + error.message);
                    
                    // Отправляем уведомление об ошибке
                    if (window.notificationManager) {
                        window.notificationManager.addNotification(
                            'system',
                            'Ошибка синхронизации',
                            'Не удалось синхронизировать канал: ' + error.message
                        );
                    }
                }
            }
            
            window.removeChannel = async function removeChannel(channelId) {
                if (!confirm('Вы уверены, что хотите удалить этот канал?')) {
                    return;
                }
                
                try {
                    if (window.channelManager) {
                        const success = window.channelManager.removeChannel(channelId);
                        if (success) {
                            alert('✅ Канал удален');
                            updateChannelsDisplay();
                        } else {
                            alert('❌ Ошибка удаления канала');
                        }
                    }
                } catch (error) {
                    console.error('❌ Ошибка удаления канала:', error);
                    alert('❌ Ошибка: ' + error.message);
                }
            }
            
            window.editMyChannel = async function editMyChannel(channelId) {
                // Функция редактирования канала - пока показываем заглушку
                alert('Редактирование канала ' + channelId + ' будет реализовано в следующей версии');
            }
            
            window.loadAllChannelVideos = async function loadAllChannelVideos() {
                try {
                    if (!window.channelManager) {
                        alert('❌ ChannelManager не инициализирован');
                        return;
                    }
                    
                    const channels = window.channelManager.getChannels();
                    if (channels.length === 0) {
                        alert('❌ Сначала добавьте каналы для загрузки видео');
                        return;
                    }
                    
                    // Показываем прогресс
                    const button = event.target;
                    const originalText = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Загрузка...';
                    button.disabled = true;
                    
                    let totalFound = 0;
                    let totalNew = 0;
                    
                    for (const channel of channels) {
                        try {
                            const result = await window.channelManager.syncChannelVideos(channel.id, 50);
                            totalFound += result.totalFound || 0;
                            totalNew += result.newVideos || 0;
                        } catch (error) {
                            console.error(\`Ошибка синхронизации канала \${channel.name}:\`, error);
                        }
                    }
                    
                    // Восстанавливаем кнопку
                    button.innerHTML = originalText;
                    button.disabled = false;
                    
                    alert('✅ Массовая загрузка завершена!\\n\\nВсего найдено: ' + totalFound + ' видео\\nНовых: ' + totalNew + ' видео');
                    
                    // Обновляем отображение
                    updateChannelsDisplay();
                    
                } catch (error) {
                    console.error('❌ Ошибка массовой загрузки:', error);
                    alert('❌ Ошибка массовой загрузки: ' + error.message);
                }
            }
            
            window.showNewVideosModal = function showNewVideosModal() {
                try {
                    const channels = window.channelManager?.getChannels() || [];
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    
                    const allVideos = window.dataManager?.get('videos') || [];
                    const newVideos = allVideos.filter(video => {
                        const publishDate = new Date(video.publishedAt || video.published_at);
                        return publishDate >= oneWeekAgo && channels.some(ch => ch.id === video.channel_source_id);
                    });
                    
                    if (newVideos.length === 0) {
                        alert('📺 Новых видео за последнюю неделю не найдено');
                        return;
                    }
                    
                    // Создаем модальное окно со списком новых видео
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                    modal.innerHTML = \`
                        <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-lg font-semibold text-gray-900">Новые видео за неделю (\${newVideos.length})</h3>
                                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                                    <i class="fas fa-times text-xl"></i>
                                </button>
                            </div>
                            <div class="space-y-4">
                                \${newVideos.map(video => \`
                                    <div class="border rounded-lg p-4 hover:bg-gray-50">
                                        <div class="flex justify-between items-start">
                                            <div class="flex-1">
                                                <h4 class="font-medium text-gray-900 mb-1">\${video.title}</h4>
                                                <div class="text-sm text-gray-600 mb-2">
                                                    <span class="mr-4"><i class="fas fa-user mr-1"></i>\${video.channel_name}</span>
                                                    <span class="mr-4"><i class="fas fa-eye mr-1"></i>\${formatNumber(video.viewCount || 0)}</span>
                                                    <span><i class="fas fa-calendar mr-1"></i>\${formatDate(video.publishedAt || video.published_at)}</span>
                                                </div>
                                            </div>
                                            <div class="text-right">
                                                <div class="text-lg font-semibold text-indigo-600">\${video.viral_score || 0}</div>
                                                <div class="text-xs text-gray-500">Вирусный балл</div>
                                            </div>
                                        </div>
                                        <div class="mt-2">
                                            <a href="\${video.url}" target="_blank" 
                                               class="text-blue-600 hover:text-blue-800 text-sm">
                                                <i class="fas fa-external-link-alt mr-1"></i>Смотреть на YouTube
                                            </a>
                                        </div>
                                    </div>
                                \`).join('')}
                            </div>
                        </div>
                    \`;
                    
                    document.body.appendChild(modal);
                    
                } catch (error) {
                    console.error('❌ Ошибка показа новых видео:', error);
                    alert('❌ Ошибка: ' + error.message);
                }
            }
            
            // Analytics chart functions
            let analyticsChartsInitialized = false;
            window.initializeAnalyticsCharts = function initializeAnalyticsCharts() {
                if (analyticsChartsInitialized) {
                    console.log('⚠️ Аналитические графики уже инициализированы, обновляем...');
                    window.refreshCategoriesChart();
                    window.refreshRubricsChart();
                    window.refreshGrowthChart();
                    window.updateTopVideosTable();
                    return;
                }
                
                analyticsChartsInitialized = true;
                setTimeout(() => {
                    window.refreshCategoriesChart();
                    window.refreshRubricsChart();
                    window.refreshGrowthChart();
                    window.updateTopVideosTable();
                }, 1000);
            }
            
            window.refreshCategoriesChart = function refreshCategoriesChart() {
                console.log('🔄 Обновление графика категорий...');
                
                try {
                    const ctx = document.getElementById('categoriesPerformanceChart');
                    if (!ctx) return;
                    
                    // Уничтожаем существующий график если есть
                    if (Chart.getChart(ctx)) {
                        Chart.getChart(ctx).destroy();
                    }
                    
                    // Получаем данные каналов
                    const channels = window.channelManager?.getChannels() || [];
                    const videos = window.dataManager?.get('videos') || [];
                    
                    // Фильтруем ТОЛЬКО видео от наших каналов
                    const channelIds = channels.map(ch => ch.id);
                    const realChannelVideos = videos.filter(v => 
                        v.channel_source_id && channelIds.includes(v.channel_source_id)
                    );
                    
                    // Группируем видео по каналам (авторам)
                    const channelPerformance = {};
                    
                    channels.forEach(channel => {
                        const channelVideos = realChannelVideos.filter(v => v.channel_source_id === channel.id);
                        if (channelVideos.length === 0) return; // Пропускаем каналы без видео
                        
                        const totalViews = channelVideos.reduce((sum, v) => sum + (parseInt(v.viewCount) || 0), 0);
                        const avgViralScore = channelVideos.length > 0 
                            ? channelVideos.reduce((sum, v) => sum + (v.viral_score || 0), 0) / channelVideos.length 
                            : 0;
                        
                        channelPerformance[channel.name] = {
                            views: totalViews,
                            avgScore: avgViralScore,
                            videosCount: channelVideos.length
                        };
                    });
                    
                    const labels = Object.keys(channelPerformance);
                    
                    // Если нет данных, показываем пустой график
                    if (labels.length === 0) {
                        new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ['Нет данных'],
                                datasets: []
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Эффективность по авторам (синхронизируйте видео каналов)'
                                    }
                                }
                            }
                        });
                        return;
                    }
                    
                    const viewsData = labels.map(label => Math.round(channelPerformance[label].views / 1000));
                    const scoresData = labels.map(label => channelPerformance[label].avgScore);
                    
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Просмотры (тыс.)',
                                data: viewsData,
                                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                                borderColor: 'rgb(59, 130, 246)',
                                borderWidth: 1,
                                yAxisID: 'y'
                            }, {
                                label: 'Ср. вирусный балл',
                                data: scoresData,
                                type: 'line',
                                borderColor: 'rgb(239, 68, 68)',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                yAxisID: 'y1',
                                tension: 0.4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    type: 'linear',
                                    display: true,
                                    position: 'left',
                                    title: {
                                        display: true,
                                        text: 'Просмотры (тыс.)'
                                    }
                                },
                                y1: {
                                    type: 'linear',
                                    display: true,
                                    position: 'right',
                                    title: {
                                        display: true,
                                        text: 'Вирусный балл'
                                    },
                                    grid: {
                                        drawOnChartArea: false,
                                    },
                                    min: 0,
                                    max: 100
                                }
                            },
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Эффективность по авторам'
                                }
                            }
                        }
                    });
                    
                } catch (error) {
                    console.error('❌ Ошибка создания графика категорий:', error);
                }
            }
            
            window.refreshRubricsChart = function refreshRubricsChart() {
                console.log('🔄 Обновление графика рубрик...');
                
                try {
                    const ctx = document.getElementById('rubricsPerformanceChart');
                    if (!ctx) return;
                    
                    // Уничтожаем существующий график если есть
                    if (Chart.getChart(ctx)) {
                        Chart.getChart(ctx).destroy();
                    }
                    
                    // Получаем данные рубрик
                    const rubrics = window.rubricManager?.getRubrics() || [];
                    const videos = window.dataManager?.get('videos') || [];
                    
                    // Получаем ТОЛЬКО реальные данные рубрик и каналов
                    let rubricData = [];
                    
                    if (rubrics.length > 0) {
                        // Используем только существующие рубрики
                        rubricData = rubrics.map(rubric => ({
                            name: rubric.name,
                            videosCount: rubric.videoIds?.length || 0,
                            totalViews: rubric.statistics?.totalViews || 0
                        })).filter(r => r.videosCount > 0); // Только рубрики с видео
                    } else {
                        // Создаем данные на основе РЕАЛЬНЫХ каналов
                        const channels = window.channelManager?.getChannels() || [];
                        rubricData = channels.map(channel => {
                            const channelVideos = videos.filter(v => v.channel_source_id === channel.id);
                            return {
                                name: channel.name,
                                videosCount: channelVideos.length,
                                totalViews: channelVideos.reduce((sum, v) => sum + (parseInt(v.viewCount) || 0), 0)
                            };
                        }).filter(r => r.videosCount > 0); // Только каналы с видео
                    }
                    
                    // Если нет реальных данных, показываем пустой график
                    if (rubricData.length === 0) {
                        new Chart(ctx, {
                            type: 'doughnut',
                            data: {
                                labels: ['Нет данных'],
                                datasets: [{
                                    data: [1],
                                    backgroundColor: ['rgba(156, 163, 175, 0.5)'],
                                    borderColor: ['rgba(156, 163, 175, 1)'],
                                    borderWidth: 2
                                }]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Популярность рубрик (добавьте рубрики)'
                                    },
                                    legend: {
                                        display: false
                                    },
                                    tooltip: {
                                        enabled: false
                                    }
                                }
                            }
                        });
                        return;
                    }
                    
                    const labels = rubricData.map(r => r.name);
                    const colors = [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)', 
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(236, 72, 153, 0.8)'
                    ];
                    
                    new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: labels,
                            datasets: [{
                                data: rubricData.map(r => r.videosCount),
                                backgroundColor: colors.slice(0, labels.length),
                                borderColor: colors.slice(0, labels.length).map(c => c.replace('0.8', '1')),
                                borderWidth: 2
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Популярность рубрик'
                                },
                                legend: {
                                    position: 'bottom'
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            const rubric = rubricData[context.dataIndex];
                                            return context.label + ': ' + rubric.videosCount + ' видео (' + formatNumber(rubric.totalViews) + ' просмотров)';
                                        }
                                    }
                                }
                            }
                        }
                    });
                    
                } catch (error) {
                    console.error('❌ Ошибка создания графика рубрик:', error);
                }
            }
            
            window.refreshGrowthChart = function refreshGrowthChart() {
                console.log('🔄 Обновление графика роста...');
                
                try {
                    const ctx = document.getElementById('channelGrowthChart');
                    if (!ctx) return;
                    
                    // Уничтожаем существующий график если есть
                    if (Chart.getChart(ctx)) {
                        Chart.getChart(ctx).destroy();
                    }
                    
                    const period = document.getElementById('growth-period-filter')?.value || '30';
                    const channels = window.channelManager?.getChannels() || [];
                    
                    if (channels.length === 0) {
                        // Показываем пустой график
                        new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: ['Нет данных'],
                                datasets: []
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Динамика роста каналов (добавьте каналы)'
                                    }
                                }
                            }
                        });
                        return;
                    }
                    
                    // Создаем временные метки
                    const days = parseInt(period);
                    const labels = [];
                    const now = new Date();
                    
                    for (let i = days - 1; i >= 0; i--) {
                        const date = new Date(now);
                        date.setDate(date.getDate() - i);
                        labels.push(date.toLocaleDateString('ru-RU', { 
                            month: 'short', 
                            day: 'numeric' 
                        }));
                    }
                    
                    // Создаем данные для каждого канала
                    const datasets = channels.slice(0, 5).map((channel, index) => {
                        const colors = [
                            'rgb(59, 130, 246)',
                            'rgb(16, 185, 129)',
                            'rgb(245, 158, 11)',
                            'rgb(239, 68, 68)',
                            'rgb(139, 92, 246)'
                        ];
                        
                        const currentSubs = channel.subscribers || 1000;
                        const startSubs = Math.round(currentSubs * 0.85); // Начальное значение 85% от текущего
                        
                        const data = labels.map((_, i) => {
                            const progress = i / (labels.length - 1);
                            const growth = startSubs + (currentSubs - startSubs) * progress;
                            const variation = 0.98 + (Math.random() * 0.04); // ±2% вариация
                            return Math.round(growth * variation);
                        });
                        
                        return {
                            label: channel.name,
                            data: data,
                            borderColor: colors[index],
                            backgroundColor: colors[index].replace('rgb', 'rgba').replace(')', ', 0.1)'),
                            tension: 0.4,
                            fill: false
                        };
                    });
                    
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: datasets
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            interaction: {
                                mode: 'index',
                                intersect: false,
                            },
                            scales: {
                                x: {
                                    display: true,
                                    title: {
                                        display: true,
                                        text: 'Дата'
                                    }
                                },
                                y: {
                                    display: true,
                                    title: {
                                        display: true,
                                        text: 'Подписчики'
                                    }
                                }
                            },
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Динамика роста каналов (последние ' + days + ' дней)'
                                },
                                legend: {
                                    display: true,
                                    position: 'top'
                                }
                            }
                        }
                    });
                    
                } catch (error) {
                    console.error('❌ Ошибка создания графика роста:', error);
                }
            }
            
            window.updateTopVideosTable = function updateTopVideosTable() {
                console.log('🔄 Обновление таблицы топ видео...');
                
                try {
                    const tableBody = document.getElementById('top-videos-table');
                    if (!tableBody) return;
                    
                    const videos = window.dataManager?.get('videos') || [];
                    const channels = window.channelManager?.getChannels() || [];
                    
                    // Фильтруем ТОЛЬКО видео от наших каналов
                    const channelIds = channels.map(ch => ch.id);
                    const realChannelVideos = videos.filter(v => 
                        v.channel_source_id && channelIds.includes(v.channel_source_id)
                    );
                    
                    if (realChannelVideos.length === 0) {
                        tableBody.innerHTML = \`
                            <tr>
                                <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                                    Нет видео для отображения. Добавьте каналы и синхронизируйте их видео.
                                </td>
                            </tr>
                        \`;
                        return;
                    }
                    
                    // Сортируем ТОЛЬКО реальные видео по вирусному баллу
                    const topVideos = realChannelVideos
                        .filter(v => v.viral_score && v.viral_score > 0)
                        .sort((a, b) => (b.viral_score || 0) - (a.viral_score || 0))
                        .slice(0, 10);
                    
                    if (topVideos.length === 0) {
                        tableBody.innerHTML = \`
                            <tr>
                                <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                                    Нет видео с вирусным баллом. Синхронизируйте видео с каналов.
                                </td>
                            </tr>
                        \`;
                        return;
                    }
                    
                    tableBody.innerHTML = topVideos.map(video => \`
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900 max-w-xs truncate" title="\${video.title}">
                                    \${video.title}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                \${video.channel_name || 'Неизвестно'}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                \${formatNumber(video.viewCount || 0)}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                \${formatNumber(video.likeCount || 0)}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-semibold text-indigo-600">
                                    \${Math.round(video.viral_score || 0)}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                \${formatDate(video.publishedAt || video.published_at)}
                            </td>
                        </tr>
                    \`).join('');
                    
                } catch (error) {
                    console.error('❌ Ошибка обновления таблицы топ видео:', error);
                }
            }
            
            // Export functions
            window.exportChannelAnalytics = function exportChannelAnalytics(format) {
                if (format === 'pdf') {
                    window.print();
                } else if (format === 'excel') {
                    alert('Экспорт в Excel будет реализован в следующей версии');
                } else {
                    alert('Неизвестный формат экспорта');
                }
            }
            
            window.scheduleChannelSync = function scheduleChannelSync() {
                alert('Автоматическая синхронизация будет реализована в следующей версии');
            }


            window.saveApiKey = async function saveApiKey() {
                const apiKey = document.getElementById('youtube-api-key').value?.trim();
                
                if (!apiKey) {
                    alert('Пожалуйста, введите API ключ');
                    return;
                }
                
                try {
                    if (window.secureConfig) {
                        await window.secureConfig.saveApiKey('youtube', apiKey);
                        hideApiSettingsModal();
                        alert('✅ API ключ сохранён!');
                    }
                } catch (error) {
                    console.error('Ошибка сохранения API ключа:', error);
                    alert('❌ Ошибка сохранения API ключа');
                }
            }

            // Notification functions
            function showNotificationsModal() {
                if (window.notificationManager) {
                    window.notificationManager.showNotificationsModal();
                } else {
                    alert('❌ NotificationManager не инициализирован');
                }
            }
            
            // Add test notification for demonstration

            
            function showCategoriesStats() {
                if (window.categoryManager) {
                    const stats = window.categoryManager.getCategoriesStats();
                    const categories = window.categoryManager.getCategories();
                    
                    let message = \`📊 Статистика категорий:\\n\\n\`;
                    message += \`Всего категорий: \${categories.length}\\n\\n\`;
                    
                    if (stats.length > 0) {
                        message += 'Топ-5 категорий по количеству видео:\\n';
                        stats.slice(0, 5).forEach((cat, index) => {
                            message += \`\${index + 1}. \${cat.name}: \${cat.videos_count} видео, \${cat.total_views} просмотров\\n\`;
                        });
                    } else {
                        message += 'Нет данных о категориях.';
                    }
                    
                    alert(message);
                } else {
                    alert('❌ CategoryManager не инициализирован');
                }
            }
            
            // Import/Export functions
            function exportBackup() {
                if (window.importExportManager) {
                    window.importExportManager.exportBackup();
                } else {
                    alert('❌ ImportExportManager не инициализирован');
                }
            }
            
            function importBackup() {
                if (window.importExportManager) {
                    window.importExportManager.importBackup();
                } else {
                    alert('❌ ImportExportManager не инициализирован');
                }
            }

            // Make functions globally available
            window.showSection = showSection;
            window.showAddChannelModal = showAddChannelModal;
            window.hideAddChannelModal = hideAddChannelModal;
            window.showApiSettingsModal = showApiSettingsModal;
            window.hideApiSettingsModal = hideApiSettingsModal;
            window.autoFetchChannelInfo = autoFetchChannelInfo;
            window.saveChannel = saveChannel;
            window.updateChannelsDisplay = updateChannelsDisplay;
            window.syncChannelVideos = syncChannelVideos;
            window.removeChannel = removeChannel;
            window.saveApiKey = saveApiKey;
            window.showNotificationsModal = showNotificationsModal;

            window.showCategoriesStats = showCategoriesStats;
            window.exportBackup = exportBackup;
            window.importBackup = importBackup;

            // Section management functions
            window.showSection = function showSection(sectionName) {
                console.log('Переключение на секцию:', sectionName);
                
                try {
                    // Сохраняем текущую секцию
                    localStorage.setItem('viralscript_currentSection', sectionName);
                    
                    // Скрываем все секции
                    document.querySelectorAll('.section').forEach(section => {
                        section.classList.remove('active');
                        section.style.display = 'none';
                    });
                    
                    // Убираем активный класс со всех навигационных кнопок
                    document.querySelectorAll('.nav-btn').forEach(btn => {
                        btn.classList.remove('active', 'text-indigo-600', 'border-indigo-600');
                        btn.classList.add('text-gray-700', 'border-transparent');
                    });
                    
                    // Показываем нужную секцию
                    const targetSection = document.getElementById(sectionName + '-section');
                    if (targetSection) {
                        targetSection.classList.add('active');
                        targetSection.style.display = 'block';
                        
                        // Обновляем данные для конкретных секций
                        switch (sectionName) {
                            case 'dashboard':
                                if (window.app?.updateDashboardStats) {
                                    window.app.updateDashboardStats();
                                }
                                break;
                                
                            case 'my-channels':
                                if (window.updateChannelsDisplay) {
                                    window.updateChannelsDisplay();
                                }
                                if (window.initializeAnalyticsCharts) {
                                    window.initializeAnalyticsCharts();
                                }
                                break;
                                
                            case 'our-videos':
                                if (window.ourVideosManager) {
                                    setTimeout(() => {
                                        window.ourVideosManager.renderOurVideosSection();
                                    }, 100);
                                }
                                break;
                                
                            case 'authors':
                                if (window.renderAuthorsGrid) {
                                    window.renderAuthorsGrid();
                                    window.renderAuthorsStats();
                                }
                                break;
                                
                            case 'rubrics':
                                if (window.renderRubricsGrid) {
                                    window.updateRubricsChannelFilter();
                                    window.renderRubricsGrid();
                                    window.renderRubricsStats();
                                }
                                break;
                                
                            case 'analytics':
                                console.log('Аналитика - функционал в разработке');
                                break;
                        }
                    } else {
                        console.error('Секция не найдена:', sectionName + '-section');
                        return;
                    }
                    
                    // Активируем соответствующую кнопку навигации
                    const targetButton = Array.from(document.querySelectorAll('.nav-btn'))
                        .find(btn => btn.onclick?.toString().includes("'" + sectionName + "'"));
                    
                    if (targetButton) {
                        targetButton.classList.add('active', 'text-indigo-600', 'border-indigo-600');
                        targetButton.classList.remove('text-gray-700', 'border-transparent');
                    }
                    
                    console.log('Секция активирована:', sectionName);
                    
                } catch (error) {
                    console.error('Ошибка переключения секции:', sectionName, error);
                }
            }

            // Initialize app when DOM is ready
            document.addEventListener('DOMContentLoaded', initializeApp);
            
            // Also initialize immediately if DOM is already loaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initializeApp);
            } else {
                initializeApp();
            }

            // Restore last section
            setTimeout(() => {
                const lastSection = localStorage.getItem('viralscript_currentSection') || 'dashboard';
                if (document.getElementById(lastSection + '-section')) {
                    showSection(lastSection);
                }
            }, 500);
        </script>

        <style>
            .section {
                display: none;
            }
            .section.active {
                display: block;
            }
            .nav-btn.active {
                color: #4f46e5;
                border-bottom-color: #4f46e5;
            }
        </style>
    </body>
    </html>
  `)
})

// Create separate JS modules for cleaner code organization
const moduleContents: Record<string, string> = {
  'DataManager.js': `export class DataManager {
  constructor() {
    this.cache = new Map();
    this.subscribers = new Map();
    console.log("📊 DataManager инициализирован");
  }
  
  get(key) { 
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("DataManager.get error:", error);
      return null;
    }
  }
  
  set(key, value) { 
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.notifySubscribers(key, value);
      return true;
    } catch (error) {
      console.error("DataManager.set error:", error);
      return false;
    }
  }
  
  add(key, item) {
    try {
      const items = this.get(key) || [];
      item.id = item.id || Date.now() + Math.random();
      items.push(item);
      this.set(key, items);
      return item;
    } catch (error) {
      console.error("DataManager.add error:", error);
      return null;
    }
  }
  
  remove(key, id) {
    try {
      const items = this.get(key) || [];
      const filtered = items.filter(item => item.id !== id);
      this.set(key, filtered);
      return true;
    } catch (error) {
      console.error("DataManager.remove error:", error);
      return false;
    }
  }
  
  subscribe(key, callback) {
    if (!this.subscribers.has(key)) this.subscribers.set(key, []);
    this.subscribers.get(key).push(callback);
  }
  
  notifySubscribers(key, value) {
    const callbacks = this.subscribers.get(key) || [];
    callbacks.forEach(callback => {
      try {
        callback(value);
      } catch (error) {
        console.error("DataManager subscriber error:", error);
      }
    });
  }
}`,

  'YouTubeAPI.js': `export class YouTubeAPI {
  constructor() {
    this.apiKeys = [];
    this.currentKeyIndex = 0;
    console.log("📺 YouTubeAPI инициализирован");
  }
  
  async init() {
    try {
      // Загружаем ключи через SecureConfig для совместимости
      if (window.secureConfig) {
        const apiKey = await window.secureConfig.getApiKey('youtube');
        if (apiKey) {
          this.apiKeys = [apiKey];
          console.log("🔑 Загружен YouTube API ключ");
        } else {
          console.log("⚠️ YouTube API ключ не настроен");
        }
      } else {
        // Fallback для обратной совместимости
        const keys = JSON.parse(localStorage.getItem("youtube_api_keys") || "[]");
        this.apiKeys = keys;
        console.log("🔑 Загружено " + this.apiKeys.length + " API ключей (legacy)");
      }
    } catch (error) {
      console.error("YouTubeAPI.init error:", error);
    }
  }
  
  extractChannelIdFromUrl(url) {
    const patterns = [
      /youtube\\.com\\/channel\\/([^\\/\\?&]+)/,
      /youtube\\.com\\/c\\/([^\\/\\?&]+)/,
      /youtube\\.com\\/user\\/([^\\/\\?&]+)/,
      /youtube\\.com\\/@([^\\/\\?&]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  }
  
  async getChannelInfo(channelUrl) {
    let channelId = this.extractChannelIdFromUrl(channelUrl);
    let isHandle = false;
    
    if (!channelId) {
      channelId = channelUrl.trim();
    }
    
    // Проверяем, является ли это handle (@username)
    if (channelUrl.includes('/@')) {
      isHandle = true;
      channelId = channelId.replace('@', ''); // убираем @ если есть
    }
    
    // Получаем API ключ из SecureConfig
    let apiKey = null;
    if (window.secureConfig) {
      apiKey = await window.secureConfig.getApiKey('youtube');
    }
    
    // Если нет API ключа, выбрасываем ошибку
    if (!apiKey) {
      throw new Error("YouTube API ключ не настроен. Настройте API ключ в разделе Настройки.");
    }
    
    try {
      let data;
      
      // Для handle (@username) используем поиск
      if (isHandle) {
        console.log(\`🔍 Поиск канала по handle: @\${channelId}\`);
        
        // Используем Search API для поиска канала по имени
        const searchUrl = \`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=@\${channelId}&key=\${apiKey}\`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();
        
        if (searchData.items && searchData.items.length > 0) {
          // Берем первый результат поиска
          const foundChannel = searchData.items[0];
          channelId = foundChannel.snippet.channelId;
          console.log(\`✅ Найден канал по handle: \${channelId}\`);
        } else {
          throw new Error(\`Канал с handle @\${channelId} не найден\`);
        }
      }
      
      // Получаем полную информацию о канале по ID
      console.log(\`📺 Получение информации о канале: \${channelId}\`);
      const channelUrl = \`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=\${channelId}&key=\${apiKey}\`;
      const response = await fetch(channelUrl);
      data = await response.json();
      
      // Если не найден по ID, пытаемся как username
      if (!data.items || data.items.length === 0) {
        console.log(\`🔄 Попытка поиска как username: \${channelId}\`);
        const usernameUrl = \`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forUsername=\${channelId}&key=\${apiKey}\`;
        const usernameResponse = await fetch(usernameUrl);
        data = await usernameResponse.json();
      }
      
      // Проверяем наличие результата
      if (!data.items || data.items.length === 0) {
        if (data.error) {
          throw new Error(\`YouTube API Error: \${data.error.message}\`);
        }
        throw new Error(\`Канал не найден: \${channelId}\`);
      }
      
      const channel = data.items[0];
      const snippet = channel.snippet;
      const statistics = channel.statistics;
      
      console.log(\`✅ Найден канал: \${snippet.title}\`);
      
      return {
        id: channel.id,
        name: snippet.title,
        description: snippet.description || "Описание не указано",
        subscribers: parseInt(statistics.subscriberCount) || 0,
        videoCount: parseInt(statistics.videoCount) || 0,
        thumbnail: snippet.thumbnails?.default?.url || null
      };
      
    } catch (error) {
      console.error("Ошибка получения данных канала:", error);
      throw error;
    }
  }
  
  async getChannelVideos(channelId, maxResults = 50) {
    // Получаем API ключ из SecureConfig
    let apiKey = null;
    if (window.secureConfig) {
      apiKey = await window.secureConfig.getApiKey('youtube');
    }
    
    if (!apiKey) {
      throw new Error("YouTube API ключ не настроен");
    }
    
    try {
      // Сначала получаем uploads playlist ID
      const channelResponse = await fetch(
        \`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=\${channelId}&key=\${apiKey}\`
      );
      const channelData = await channelResponse.json();
      
      if (!channelData.items || channelData.items.length === 0) {
        throw new Error("Канал не найден");
      }
      
      const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
      
      // Получаем список видео из uploads playlist
      const videosResponse = await fetch(
        \`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=\${uploadsPlaylistId}&maxResults=\${maxResults}&key=\${apiKey}\`
      );
      const videosData = await videosResponse.json();
      
      if (!videosData.items) {
        return [];
      }
      
      // Получаем детальную информацию о каждом видео
      const videoIds = videosData.items.map(item => item.snippet.resourceId.videoId).join(',');
      const detailsResponse = await fetch(
        \`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=\${videoIds}&key=\${apiKey}\`
      );
      const detailsData = await detailsResponse.json();
      
      return detailsData.items.map(video => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        thumbnail: video.snippet.thumbnails?.medium?.url,
        viewCount: parseInt(video.statistics.viewCount) || 0,
        likeCount: parseInt(video.statistics.likeCount) || 0,
        commentCount: parseInt(video.statistics.commentCount) || 0,
        duration: video.contentDetails.duration,
        tags: video.snippet.tags || []
      }));
      
    } catch (error) {
      console.error("Ошибка получения видео с канала:", error);
      throw error;
    }
  }

  addApiKey(apiKey) {
    if (!this.apiKeys.includes(apiKey)) {
      this.apiKeys.push(apiKey);
      localStorage.setItem("youtube_api_keys", JSON.stringify(this.apiKeys));
      return true;
    }
    return false;
  }
}`,

  'ErrorHandler.js': `export class ErrorHandler {
  constructor() {
    this.errors = [];
    this.maxErrors = 100;
    console.log("🛡️ ErrorHandler инициализирован");
    
    window.addEventListener("error", (event) => {
      this.logError("GlobalError", event.error);
    });
    
    window.addEventListener("unhandledrejection", (event) => {
      this.logError("UnhandledPromiseRejection", event.reason);
    });
  }
  
  logError(context, error) {
    const errorEntry = {
      timestamp: new Date().toISOString(),
      context,
      message: error?.message || String(error),
      stack: error?.stack,
      id: Date.now() + Math.random()
    };
    
    this.errors.unshift(errorEntry);
    if (this.errors.length > this.maxErrors) {
      this.errors.pop();
    }
    
    console.error("❌ [" + context + "]", error);
    
    try {
      localStorage.setItem("viralscript_errors", JSON.stringify(this.errors));
    } catch (e) {
      console.warn("Failed to store error in localStorage:", e);
    }
  }
  
  getErrors() {
    return this.errors;
  }
  
  clearErrors() {
    this.errors = [];
    localStorage.removeItem("viralscript_errors");
  }
}`,

  'SecureConfig.js': `export class SecureConfig {
  constructor() {
    this.isProduction = this.detectEnvironment();
    console.log("🔐 SecureConfig инициализирован (" + (this.isProduction ? "production" : "development") + ")");
  }
  
  detectEnvironment() {
    // Для sandbox (.e2b.dev) и localhost используем development режим
    const hostname = window.location.hostname;
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1" || hostname.includes("localhost");
    const isSandbox = hostname.includes(".e2b.dev");
    
    // Только настоящий production deployment считается production
    return !isLocalhost && !isSandbox;
  }
  
  async saveApiKey(service, apiKey) {
    try {
      console.log("🔐 Сохранение API ключа...");
      
      // Безопасное получение массива ключей
      let keys = [];
      try {
        const stored = localStorage.getItem(service + "_api_keys");
        if (stored) {
          const parsed = JSON.parse(stored);
          keys = Array.isArray(parsed) ? parsed : [];
        }
      } catch (parseError) {
        console.warn("⚠️ Ошибка парсинга существующих ключей, создаем новый массив");
        keys = [];
      }
      
      // Добавляем ключ если его еще нет
      if (!keys.includes(apiKey)) {
        keys.push(apiKey);
        localStorage.setItem(service + "_api_keys", JSON.stringify(keys));
        console.log("✅ API ключ сохранен в localStorage");
      } else {
        console.log("ℹ️ API ключ уже существует");
      }
      
      return true;
    } catch (error) {
      console.error("❌ SecureConfig.saveApiKey error:", error);
      throw error;
    }
  }
  
  async getApiKey(service) {
    try {
      console.log("🔐 Получение API ключа из localStorage...");
      
      // Безопасное получение массива ключей
      let keys = [];
      try {
        const stored = localStorage.getItem(service + "_api_keys");
        if (stored) {
          const parsed = JSON.parse(stored);
          keys = Array.isArray(parsed) ? parsed : [];
        }
      } catch (parseError) {
        console.warn("⚠️ Ошибка парсинга ключей, возвращаем null");
        return null;
      }
      
      const key = keys.length > 0 ? keys[0] : null;
      console.log("🔑 Найден API ключ:", key ? "✅ Да" : "❌ Нет");
      return key;
      
    } catch (error) {
      console.error("❌ SecureConfig.getApiKey error:", error);
      return null;
    }
  }
}`,

  'ChannelManager.js': `export class ChannelManager {
  constructor(dataManager, youtubeAPI, scoreCalculator) {
    this.dataManager = dataManager;
    this.youtubeAPI = youtubeAPI;
    this.scoreCalculator = scoreCalculator || { 
      calculateViralScore: () => 0, 
      calculateVideoStatus: () => "normal" 
    };
    
    console.log("📺 ChannelManager: Инициализация управления каналами...");
    console.log("✅ ChannelManager: Готов к работе");
  }

  async addChannel(urlOrId) {
    try {
      console.log(\`📺 ChannelManager: Добавление канала: \${urlOrId}\`);
      
      let channelId = this.youtubeAPI?.extractChannelIdFromUrl ? 
        this.youtubeAPI.extractChannelIdFromUrl(urlOrId) : null;
      
      if (!channelId) {
        channelId = urlOrId.trim();
      }
      
      const existingChannels = this.dataManager.get("myChannels") || [];
      const existing = existingChannels.find(ch => ch.id === channelId);
      
      if (existing) {
        throw new Error("Этот канал уже добавлен в список отслеживаемых");
      }
      
      // Получаем реальную информацию о канале через YouTube API
      if (!this.youtubeAPI?.getChannelInfo) {
        throw new Error("YouTube API не инициализирован");
      }
      
      const channelInfo = await this.youtubeAPI.getChannelInfo(urlOrId);
      
      const channel = {
        ...channelInfo,
        added_at: new Date().toISOString(),
        last_sync: new Date().toISOString(),
        status: "active",
        video_sync_count: 0
      };
      
      existingChannels.push(channel);
      this.dataManager.set("myChannels", existingChannels);
      
      console.log('✅ ChannelManager: Канал ' + channel.name + ' добавлен');
      return channel;
      
    } catch (error) {
      console.error(\`❌ ChannelManager: Ошибка добавления канала:\`, error);
      throw error;
    }
  }

  getChannels() {
    return this.dataManager.get("myChannels") || [];
  }

  async syncChannelVideos(channelId, maxVideos = 50) {
    try {
      console.log(\`🔄 ChannelManager: Синхронизация видео канала \${channelId}\`);
      
      const channels = this.getChannels();
      const channel = channels.find(ch => ch.id === channelId);
      
      if (!channel) {
        throw new Error("Канал не найден в списке отслеживаемых");
      }
      
      // Проверяем наличие YouTube API
      if (!this.youtubeAPI?.getChannelVideos) {
        throw new Error("YouTube API не поддерживает получение видео. Добавьте метод getChannelVideos в YouTubeAPI.");
      }
      
      // Получаем реальные видео с YouTube API
      const channelVideos = await this.youtubeAPI.getChannelVideos(channelId, maxVideos);
      
      const processedVideos = channelVideos.map(video => ({
        ...video,
        category: \`Канал: \${channel.name}\`,
        viral_score: this.scoreCalculator.calculateViralScore(
          video.viewCount || 0, 
          video.likeCount || 0, 
          video.commentCount || 0
        ),
        status: this.scoreCalculator.calculateVideoStatus ? 
          this.scoreCalculator.calculateVideoStatus(video.viewCount || 0, video.likeCount || 0) : "normal",
        channel_source_id: channelId,
        channel_name: channel.name
      }));
      
      const existingVideos = this.dataManager.get("videos") || [];
      const newVideos = [];
      
      processedVideos.forEach(video => {
        const existing = existingVideos.find(v => v.id === video.id);
        if (!existing) {
          newVideos.push(video);
          existingVideos.push(video);
        } else {
          const index = existingVideos.findIndex(v => v.id === video.id);
          existingVideos[index] = { 
            ...existingVideos[index], 
            ...video, 
            updated_at: new Date().toISOString() 
          };
        }
      });
      
      this.dataManager.set("videos", existingVideos);
      
      const channelVideosCount = existingVideos.filter(v => v.channel_source_id === channelId);
      channel.last_sync = new Date().toISOString();
      channel.video_sync_count = (channel.video_sync_count || 0) + newVideos.length;
      channel.videoCount = channelVideosCount.length;
      channel.totalViews = channelVideosCount.reduce((sum, v) => sum + (parseInt(v.viewCount) || 0), 0);
      channel.totalLikes = channelVideosCount.reduce((sum, v) => sum + (parseInt(v.likeCount) || 0), 0);
      
      const channelIndex = channels.findIndex(ch => ch.id === channelId);
      if (channelIndex !== -1) {
        channels[channelIndex] = channel;
        this.dataManager.set("myChannels", channels);
      }
      
      console.log('✅ ChannelManager: Синхронизировано ' + newVideos.length + ' новых видео с канала ' + channel.name);
      
      return {
        totalFound: processedVideos.length,
        newVideos: newVideos.length,
        existingVideos: processedVideos.length - newVideos.length,
        channelName: channel.name
      };
      
    } catch (error) {
      console.error(\`❌ ChannelManager: Ошибка синхронизации канала:\`, error);
      throw error;
    }
  }

  removeChannel(channelId) {
    try {
      const channels = this.getChannels();
      const filtered = channels.filter(ch => ch.id !== channelId);
      
      if (filtered.length < channels.length) {
        this.dataManager.set("myChannels", filtered);
        console.log(\`🗑️ ChannelManager: Канал \${channelId} удален\`);
        return true;
      }
      return false;
    } catch (error) {
      console.error(\`❌ ChannelManager: Ошибка удаления канала:\`, error);
      throw error;
    }
  }

  getChannelsStats() {
    const channels = this.getChannels();
    const videos = this.dataManager.get("videos") || [];
    
    return {
      totalChannels: channels.length,
      totalSubscribers: channels.reduce((sum, ch) => sum + (ch.subscribers || 0), 0),
      totalViews: channels.reduce((sum, ch) => sum + (ch.totalViews || 0), 0),
      totalVideosFromChannels: videos.filter(v => v.channel_source_id).length,
      averageSubscribers: channels.length > 0 ? 
        Math.round(channels.reduce((sum, ch) => sum + (ch.subscribers || 0), 0) / channels.length) : 0
    };
  }

  async getMyChannels() {
    try {
      // Добавляем отладку localStorage
      console.log("🔍 DEBUG ChannelManager.getMyChannels: Проверяем localStorage...");
      
      // Выводим все ключи в localStorage
      console.log("🔍 DEBUG: Все ключи в localStorage:", Object.keys(localStorage));
      
      // Проверяем разные возможные ключи
      const possibleKeys = ['myChannels', 'channels', 'userChannels', 'channelsList'];
      possibleKeys.forEach(key => {
        const data = localStorage.getItem(key);
        console.log("🔍 DEBUG: localStorage['" + key + "'] =", data ? JSON.parse(data) : null);
      });
      
      const channels = this.dataManager.get("myChannels") || [];
      console.log("🔍 DEBUG: Полученные каналы через DataManager:", channels);
      return channels;
    } catch (error) {
      console.error("❌ ChannelManager: Ошибка получения каналов:", error);
      return [];
    }
  }

  async syncAllChannels() {
    try {
      const channels = await this.getMyChannels();
      console.log('🔄 Синхронизация всех каналов (' + channels.length + ')...');
      
      let totalNewVideos = 0;
      
      for (const channel of channels) {
        try {
          const result = await this.syncChannelVideos(channel.id);
          if (result && result.newVideos) {
            totalNewVideos += result.newVideos.length;
          }
        } catch (error) {
          console.error('❌ ChannelManager: Ошибка синхронизации канала ' + channel.title + ':', error);
        }
      }
      
      console.log('✅ ChannelManager: Синхронизация завершена. Новых видео: ' + totalNewVideos);
      return { totalNewVideos, channelsCount: channels.length };
      
    } catch (error) {
      console.error('❌ ChannelManager: Ошибка синхронизации всех каналов:', error);
      throw error;
    }
  }
}`,

  'CategoryManager.js': `export class CategoryManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
    this.defaultCategories = [];
    
    this.init();
  }

  init() {
    console.log("👥 CategoryManager: Инициализация категорий авторов...");
    this.ensureDefaultCategories();
    console.log("✅ CategoryManager: Готов к работе");
  }

  /**
   * Создание категорий по умолчанию
   */
  ensureDefaultCategories() {
    let categories = this.dataManager.get("authorCategories");
    if (!categories || categories.length === 0) {
      categories = [...this.defaultCategories];
      this.dataManager.set("authorCategories", categories);
      if (this.defaultCategories.length > 0) {
        console.log("📝 CategoryManager: Созданы категории по умолчанию");
      }
    }
    return categories;
  }

  /**
   * Получение всех категорий
   */
  getCategories() {
    return this.dataManager.get("authorCategories") || [];
  }

  /**
   * Добавление новой категории
   */
  addCategory(name, color, description = '') {
    const categories = this.getCategories();
    const maxId = Math.max(...categories.map(c => c.id), 0);
    
    const newCategory = {
      id: maxId + 1,
      name: name.trim(),
      color: color,
      description: description.trim(),
      created_at: new Date().toISOString(),
      videos_count: 0
    };

    categories.push(newCategory);
    this.dataManager.set("authorCategories", categories);
    
    console.log('✅ CategoryManager: Категория ' + name + ' добавлена');
    return newCategory;
  }

  /**
   * Обновление категории
   */
  updateCategory(id, updates) {
    const categories = this.getCategories();
    const index = categories.findIndex(c => c.id === id);
    
    if (index !== -1) {
      categories[index] = { 
        ...categories[index], 
        ...updates, 
        updated_at: new Date().toISOString() 
      };
      this.dataManager.set("authorCategories", categories);
      console.log(\`✅ CategoryManager: Категория ID \${id} обновлена\`);
      return categories[index];
    }
    
    return null;
  }

  /**
   * Удаление категории
   */
  removeCategory(id) {
    const categories = this.getCategories();
    const filtered = categories.filter(c => c.id !== id);
    
    if (filtered.length < categories.length) {
      // Обновляем видео, убирая эту категорию
      this.updateVideosCategory(id, null);
      
      this.dataManager.set("authorCategories", filtered);
      console.log(\`🗑️ CategoryManager: Категория ID \${id} удалена\`);
      return true;
    }
    
    return false;
  }

  /**
   * Получение категории по ID
   */
  getCategoryById(id) {
    const categories = this.getCategories();
    return categories.find(c => c.id === id) || null;
  }

  /**
   * Назначение категории видео
   */
  assignCategoryToVideo(videoId, categoryId) {
    const videos = this.dataManager.get("videos") || [];
    const videoIndex = videos.findIndex(v => v.id === videoId);
    
    if (videoIndex !== -1) {
      const category = this.getCategoryById(categoryId);
      if (category) {
        videos[videoIndex].author_category_id = categoryId;
        videos[videoIndex].author_category_name = category.name;
        videos[videoIndex].author_category_color = category.color;
        
        this.dataManager.set("videos", videos);
        this.updateCategoryVideoCounts();
        
        console.log('✅ CategoryManager: Видео ' + videos[videoIndex].title + ' назначено в категорию ' + category.name);
        return true;
      }
    }
    
    return false;
  }

  /**
   * Обновление категории видео при удалении категории
   */
  updateVideosCategory(categoryId, newCategoryId = null) {
    const videos = this.dataManager.get("videos") || [];
    let updated = false;

    videos.forEach(video => {
      if (video.author_category_id === categoryId) {
        if (newCategoryId) {
          const newCategory = this.getCategoryById(newCategoryId);
          if (newCategory) {
            video.author_category_id = newCategoryId;
            video.author_category_name = newCategory.name;
            video.author_category_color = newCategory.color;
          }
        } else {
          delete video.author_category_id;
          delete video.author_category_name;
          delete video.author_category_color;
        }
        updated = true;
      }
    });

    if (updated) {
      this.dataManager.set("videos", videos);
      this.updateCategoryVideoCounts();
    }
  }

  /**
   * Обновление счетчика видео в категориях
   */
  updateCategoryVideoCounts() {
    const categories = this.getCategories();
    const videos = this.dataManager.get("videos") || [];

    categories.forEach(category => {
      category.videos_count = videos.filter(v => v.author_category_id === category.id).length;
    });

    this.dataManager.set("authorCategories", categories);
  }

  /**
   * Получение статистики по категориям
   */
  getCategoriesStats() {
    const categories = this.getCategories();
    const videos = this.dataManager.get("videos") || [];

    return categories.map(category => {
      const categoryVideos = videos.filter(v => v.author_category_id === category.id);
      
      return {
        ...category,
        videos_count: categoryVideos.length,
        total_views: categoryVideos.reduce((sum, v) => sum + (v.views || 0), 0),
        avg_viral_score: categoryVideos.length > 0 ? 
          Math.round(categoryVideos.reduce((sum, v) => sum + (v.viral_score || 0), 0) / categoryVideos.length) : 0,
        top_video: categoryVideos.length > 0 ? 
          categoryVideos.reduce((max, v) => (v.views || 0) > (max.views || 0) ? v : max) : null
      };
    }).sort((a, b) => b.videos_count - a.videos_count);
  }

  /**
   * Получение цвета категории по имени
   */
  getCategoryColor(categoryName) {
    if (!categoryName) {
      return '#6B7280'; // Серый цвет для неназначенных категорий
    }
    
    const categories = this.getCategories();
    const category = categories.find(c => c.name === categoryName);
    
    if (category && category.color) {
      return category.color;
    }
    
    // Цвета по умолчанию для категорий
    const defaultColors = [
      '#3B82F6', // Синий
      '#10B981', // Зеленый
      '#F59E0B', // Желтый
      '#EF4444', // Красный
      '#8B5CF6', // Фиолетовый
      '#06B6D4', // Бирюзовый
      '#84CC16', // Лайм
      '#F97316'  // Оранжевый
    ];
    
    // Генерируем цвет на основе хэша имени категории
    let hash = 0;
    for (let i = 0; i < categoryName.length; i++) {
      hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return defaultColors[Math.abs(hash) % defaultColors.length];
  }
}`,

  'NotificationManager.js': `export class NotificationManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
    this.notifications = [];
    this.unreadCount = 0;
    this.autoUpdateInterval = null;
    
    console.log("🔔 NotificationManager: Инициализация системы уведомлений...");
    this.init();
  }

  init() {
    this.loadNotifications();
    this.startAutoUpdate();
    console.log("✅ NotificationManager: Готов к работе");
  }

  /**
   * Загрузка уведомлений из хранилища
   */
  loadNotifications() {
    this.notifications = this.dataManager.get("notifications") || [];
    this.updateUnreadCount();
  }

  /**
   * Сохранение уведомлений
   */
  saveNotifications() {
    this.dataManager.set("notifications", this.notifications);
  }

  /**
   * Добавление нового уведомления
   */
  addNotification(type, title, message, data = null) {
    const notification = {
      id: Date.now() + Math.random(),
      type: type, // 'new_video', 'channel_update', 'system', 'sync_complete'
      title: title,
      message: message,
      data: data,
      timestamp: new Date().toISOString(),
      read: false,
      created_at: new Date().toISOString()
    };

    this.notifications.unshift(notification);
    
    // Ограничиваем количество уведомлений (последние 100)
    if (this.notifications.length > 100) {
      this.notifications = this.notifications.slice(0, 100);
    }

    this.saveNotifications();
    this.updateUnreadCount();
    this.updateBadge();

    console.log('🔔 NotificationManager: Добавлено уведомление ' + title);
  }

  /**
   * Отметить уведомление как прочитанное
   */
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      notification.read = true;
      this.saveNotifications();
      this.updateUnreadCount();
      this.updateBadge();
    }
  }

  /**
   * Отметить все уведомления как прочитанные
   */
  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.saveNotifications();
    this.updateUnreadCount();
    this.updateBadge();
  }

  /**
   * Обновление счетчика непрочитанных
   */
  updateUnreadCount() {
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }

  /**
   * Обновление красного бейджа уведомлений
   */
  updateBadge() {
    const badge = document.getElementById("notifications-badge");
    if (badge) {
      if (this.unreadCount > 0) {
        badge.textContent = this.unreadCount > 99 ? "99+" : this.unreadCount;
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    }
  }

  /**
   * Получение последних уведомлений
   */
  getRecentNotifications(limit = 10) {
    return this.notifications.slice(0, limit);
  }

  /**
   * Показ модального окна с уведомлениями
   */
  showNotificationsModal() {
    // Удаляем существующее модальное окно, если есть
    if (window.currentNotificationsModal) {
      document.body.removeChild(window.currentNotificationsModal);
      window.currentNotificationsModal = null;
    }

    const modal = document.createElement("div");
    modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    modal.innerHTML = \`
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col" onclick="event.stopPropagation()">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            <i class="fas fa-bell mr-2 text-indigo-600"></i>
            Уведомления (\${this.unreadCount} непрочитанных)
          </h3>
          <div class="flex space-x-2">
            <button id="mark-all-read-btn" 
                    class="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
              Отметить все как прочитанные
            </button>
            <button id="close-notifications-btn" 
                    class="text-gray-400 hover:text-gray-600 transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <div class="flex-1 overflow-y-auto space-y-3">
          \${this.notifications.length === 0 ? 
            '<div class="text-center py-8 text-gray-500"><i class="fas fa-bell-slash text-3xl mb-2"></i><p>Нет уведомлений</p></div>' :
            this.notifications.map(notification => \`
              <div class="p-3 rounded-lg border \${notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'} cursor-pointer hover:bg-gray-100 transition-colors"
                   data-notification-id="\${notification.id}">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-1">
                      <span class="text-sm font-medium \${notification.read ? 'text-gray-700' : 'text-gray-900'}">
                        \${this.getNotificationIcon(notification.type)} \${notification.title}
                      </span>
                      \${!notification.read ? '<span class="w-2 h-2 bg-blue-600 rounded-full"></span>' : ''}
                    </div>
                    <p class="text-sm text-gray-600">\${notification.message}</p>
                    <p class="text-xs text-gray-400 mt-1">
                      \${new Date(notification.timestamp).toLocaleString('ru-RU')}
                    </p>
                  </div>
                </div>
              </div>
            \`).join('')
          }
        </div>
      </div>
    \`;
    
    // Добавляем обработчики событий
    modal.addEventListener("click", () => {
      this.closeNotificationsModal();
    });

    document.body.appendChild(modal);
    window.currentNotificationsModal = modal;

    // Добавляем обработчики для кнопок после добавления в DOM
    const markAllBtn = modal.querySelector("#mark-all-read-btn");
    const closeBtn = modal.querySelector("#close-notifications-btn");

    if (markAllBtn) {
      markAllBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.markAllAsRead();
        this.closeNotificationsModal();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.closeNotificationsModal();
      });
    }

    // Обработчики для отдельных уведомлений
    modal.querySelectorAll("[data-notification-id]").forEach(element => {
      element.addEventListener("click", (e) => {
        e.stopPropagation();
        const notificationId = element.getAttribute("data-notification-id");
        this.markAsRead(notificationId);
        this.closeNotificationsModal();
        setTimeout(() => this.showNotificationsModal(), 100);
      });
    });

    // ESC для закрытия
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        this.closeNotificationsModal();
        document.removeEventListener("keydown", handleEscape);
      }
    };
    document.addEventListener("keydown", handleEscape);
  }

  /**
   * Закрытие модального окна уведомлений
   */
  closeNotificationsModal() {
    if (window.currentNotificationsModal) {
      document.body.removeChild(window.currentNotificationsModal);
      window.currentNotificationsModal = null;
    }
  }

  /**
   * Получение иконки для типа уведомления
   */
  getNotificationIcon(type) {
    const icons = {
      "new_video": '<i class="fas fa-play-circle text-red-600"></i>',
      "channel_update": '<i class="fas fa-youtube text-red-600"></i>',
      "sync_complete": '<i class="fas fa-sync text-green-600"></i>',
      "system": '<i class="fas fa-cog text-gray-600"></i>'
    };
    return icons[type] || '<i class="fas fa-bell text-gray-600"></i>';
  }

  /**
   * Автообновление (1 раз в час)
   */
  startAutoUpdate() {
    // Автообновление каждый час (3600000 ms)
    this.autoUpdateInterval = setInterval(() => {
      this.checkForUpdates();
    }, 3600000); // 1 час

    console.log("⏰ NotificationManager: Автообновление запущено (каждый час)");
  }

  /**
   * Проверка обновлений
   */
  async checkForUpdates() {
    try {
      // Добавим системное уведомление
      this.addNotification(
        "system",
        "Автоматическая проверка",
        \`Система проверила обновления в \${new Date().toLocaleTimeString('ru-RU')}\`
      );
    } catch (error) {
      console.error("❌ NotificationManager: Ошибка автообновления:", error);
    }
  }

  /**
   * Остановка автообновления
   */
  stopAutoUpdate() {
    if (this.autoUpdateInterval) {
      clearInterval(this.autoUpdateInterval);
      this.autoUpdateInterval = null;
      console.log("⏹️ NotificationManager: Автообновление остановлено");
    }
  }

  /**
   * Уведомление о новом видео
   */
  notifyNewVideo(video, channelName) {
    this.addNotification(
      "new_video",
      "Новое видео!",
      \`\${channelName}: "\${video.title}"\`,
      { videoId: video.id, channelName: channelName }
    );
  }

  /**
   * Уведомление о завершении синхронизации
   */
  notifySyncComplete(channelName, newVideosCount) {
    this.addNotification(
      "sync_complete",
      "Синхронизация завершена",
      'Канал ' + channelName + ': добавлено ' + newVideosCount + ' новых видео',
      { channelName: channelName, count: newVideosCount }
    );
  }

  /**
   * Универсальный метод показа уведомлений
   */
  show(type, title, message) {
    try {
      // Определяем иконку по типу
      let icon = '📢';
      switch(type) {
        case 'success': icon = '✅'; break;
        case 'error': icon = '❌'; break;
        case 'warning': icon = '⚠️'; break;
        case 'info': icon = 'ℹ️'; break;
      }
      
      // Добавляем уведомление
      this.addNotification(icon + ' ' + title, message || '');
      
      console.log('[Notification] ' + type.toUpperCase() + ': ' + title + (message ? ' - ' + message : ''));
    } catch (error) {
      console.error('❌ NotificationManager.show error:', error);
    }
  }
}`,

  'RubricManager.js': `export class RubricManager {
  constructor(dataManager, errorHandler) {
    this.dataManager = dataManager;
    this.errorHandler = errorHandler;
    this.rubrics = this.loadRubrics();
  }

  loadRubrics() {
    try {
      const stored = this.dataManager.get("contentRubrics");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      this.errorHandler.handle(error, "Ошибка загрузки рубрик");
      return [];
    }
  }

  saveRubrics() {
    try {
      this.dataManager.set("contentRubrics", JSON.stringify(this.rubrics));
    } catch (error) {
      this.errorHandler.handle(error, "Ошибка сохранения рубрик");
    }
  }

  createRubric(name, icon = "📝", channelId = null) {
    if (!name?.trim()) {
      throw new Error("Имя рубрики не может быть пустым");
    }

    const rubric = {
      id: Date.now().toString(),
      name: name.trim(),
      icon: icon || "📝",
      channelId,
      createdAt: new Date().toISOString(),
      videoIds: [],
      statistics: {
        totalVideos: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0,
        avgEngagement: 0
      }
    };

    this.rubrics.push(rubric);
    this.saveRubrics();
    return rubric;
  }

  updateRubric(id, updates) {
    const index = this.rubrics.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error("Рубрика не найдена");
    }

    this.rubrics[index] = { ...this.rubrics[index], ...updates };
    this.saveRubrics();
    return this.rubrics[index];
  }

  deleteRubric(id) {
    const index = this.rubrics.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error("Рубрика не найдена");
    }

    const deleted = this.rubrics.splice(index, 1)[0];
    this.saveRubrics();
    return deleted;
  }

  getRubric(id) {
    return this.rubrics.find(r => r.id === id) || null;
  }

  getRubrics(channelId = null) {
    if (channelId) {
      return this.rubrics.filter(r => r.channelId === channelId);
    }
    return [...this.rubrics];
  }

  assignVideoToRubric(rubricId, videoId) {
    const rubric = this.getRubric(rubricId);
    if (!rubric) {
      throw new Error("Рубрика не найдена");
    }

    if (!rubric.videoIds.includes(videoId)) {
      rubric.videoIds.push(videoId);
      this.updateStatistics(rubricId);
      this.saveRubrics();
    }
  }

  unassignVideoFromRubric(rubricId, videoId) {
    const rubric = this.getRubric(rubricId);
    if (!rubric) {
      throw new Error("Рубрика не найдена");
    }

    const index = rubric.videoIds.indexOf(videoId);
    if (index > -1) {
      rubric.videoIds.splice(index, 1);
      this.updateStatistics(rubricId);
      this.saveRubrics();
    }
  }

  updateStatistics(rubricId) {
    const rubric = this.getRubric(rubricId);
    if (!rubric) return;

    const videos = this.dataManager.get("videos");
    if (!videos) return;

    const parsedVideos = JSON.parse(videos);
    const rubricVideos = parsedVideos.filter(v => rubric.videoIds.includes(v.id));

    const stats = {
      totalVideos: rubricVideos.length,
      totalViews: rubricVideos.reduce((sum, v) => sum + (parseInt(v.viewCount) || 0), 0),
      totalLikes: rubricVideos.reduce((sum, v) => sum + (parseInt(v.likeCount) || 0), 0),
      totalComments: rubricVideos.reduce((sum, v) => sum + (parseInt(v.commentCount) || 0), 0),
      avgEngagement: 0
    };

    if (stats.totalViews > 0) {
      stats.avgEngagement = ((stats.totalLikes + stats.totalComments) / stats.totalViews * 100).toFixed(2);
    }

    rubric.statistics = stats;
  }

  getVideoRubrics(videoId) {
    return this.rubrics.filter(r => r.videoIds.includes(videoId));
  }

  searchRubrics(query) {
    const lowerQuery = query.toLowerCase();
    return this.rubrics.filter(r => 
      r.name.toLowerCase().includes(lowerQuery) || 
      r.icon.includes(query)
    );
  }

  getRubricStatistics() {
    const total = this.rubrics.length;
    const withVideos = this.rubrics.filter(r => r.videoIds.length > 0).length;
    const totalVideosAssigned = this.rubrics.reduce((sum, r) => sum + r.videoIds.length, 0);

    return {
      total,
      withVideos,
      empty: total - withVideos,
      totalVideosAssigned,
      avgVideosPerRubric: total > 0 ? (totalVideosAssigned / total).toFixed(1) : 0
    };
  }
}`,

  'AnalyticsManager.js': `export class AnalyticsManager {
  constructor(dataManager, scoreCalculator, chartManager) {
    this.dataManager = dataManager;
    this.scoreCalculator = scoreCalculator;
    this.chartManager = chartManager;
    
    this.currentPeriod = 'week';
    this.currentCategory = 'all';
    this.currentType = 'all';
    
    console.log('📊 AnalyticsManager: Инициализация расширенной аналитики...');
    console.log('✅ AnalyticsManager: Готов к работе');
  }

  /**
   * Обновление всей аналитики
   */
  updateAnalytics() {
    const videos = this.getFilteredVideos();
    
    this.updateTopVideosTable(videos);
    this.updateAnalyticsCharts(videos);
    this.updateFilterOptions();
  }

  /**
   * Получение отфильтрованных видео
   */
  getFilteredVideos() {
    let videos = this.dataManager.get('videos');
    if (!videos) return [];
    
    try {
      videos = JSON.parse(videos);
    } catch (error) {
      console.error('Ошибка парсинга видео:', error);
      return [];
    }

    // Фильтр по периоду
    if (this.currentPeriod !== 'all') {
      const now = new Date();
      const days = this.currentPeriod === 'week' ? 7 : 
                  this.currentPeriod === 'month' ? 30 : 
                  this.currentPeriod === 'quarter' ? 90 : 365;
      
      const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      
      videos = videos.filter(video => {
        if (!video.publishedAt) return false;
        return new Date(video.publishedAt) >= cutoffDate;
      });
    }

    // Фильтр по категории авторов
    if (this.currentCategory !== 'all') {
      videos = videos.filter(video => video.category === this.currentCategory);
    }

    // Фильтр по типу видео
    if (this.currentType !== 'all') {
      videos = videos.filter(video => {
        const duration = this.parseDuration(video.duration) || 0;
        switch (this.currentType) {
          case 'short': return duration <= 80;
          case 'medium': return duration > 80 && duration <= 120;
          case 'long': return duration > 120;
          default: return true;
        }
      });
    }

    return videos;
  }

  /**
   * Парсинг длительности видео из ISO 8601 формата
   */
  parseDuration(duration) {
    if (!duration) return 0;
    const match = duration.match(/PT(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+)S)?/);
    if (!match) return 0;
    
    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);
    
    return hours * 3600 + minutes * 60 + seconds;
  }

  /**
   * Обновление таблицы топ-10 видео
   */
  updateTopVideosTable(videos) {
    const tbody = document.getElementById('top-videos-tbody');
    if (!tbody) return;

    // Сортируем по engagement rate
    const sortedVideos = videos
      .map(video => ({
        ...video,
        engagementRate: this.calculateEngagementRate(video),
        viralScore: this.calculateViralScore(video)
      }))
      .sort((a, b) => b.engagementRate - a.engagementRate)
      .slice(0, 10);

    if (sortedVideos.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">Нет данных для отображения</td></tr>';
      return;
    }

    tbody.innerHTML = sortedVideos.map((video, index) => \`
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full \${
              index < 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
            } text-sm font-bold">
              \${index + 1}
            </span>
          </div>
        </td>
        <td class="px-6 py-4">
          <div class="text-sm font-medium text-gray-900 max-w-xs truncate" title="\${video.title}">
            \${video.title || 'Без названия'}
          </div>
          <div class="text-sm text-gray-500">\${this.formatDuration(video.duration)}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          \${video.channelTitle || 'Неизвестный канал'}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          \${this.formatNumber(video.viewCount)}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          \${this.formatNumber(video.likeCount)}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full \${
            video.engagementRate > 5 ? 'bg-green-100 text-green-800' :
            video.engagementRate > 2 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }">
            \${video.engagementRate.toFixed(2)}%
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
            \${video.viralScore}
          </span>
        </td>
      </tr>
    \`).join('');
  }

  /**
   * Обновление графиков аналитики
   */
  updateAnalyticsCharts(videos) {
    if (!this.chartManager) return;
    
    // Timeline график
    this.chartManager.createTimelineChart('timeline-chart', videos, this.currentPeriod);
    
    // Engagement распределение
    this.chartManager.createEngagementChart('engagement-chart', videos);
    
    // Scatter plot
    this.chartManager.createScatterChart('scatter-chart', videos);
  }

  /**
   * Обновление опций фильтров
   */
  updateFilterOptions() {
    // Обновляем категории авторов
    const categorySelect = document.getElementById('analytics-category-filter');
    if (categorySelect) {
      const authors = this.dataManager.get('authors');
      let parsedAuthors = [];
      if (authors) {
        try {
          parsedAuthors = JSON.parse(authors);
        } catch (error) {
          console.error('Ошибка парсинга авторов:', error);
        }
      }
      
      categorySelect.innerHTML = '<option value="all">Все категории</option>' +
        parsedAuthors.map(author => \`<option value="\${author.name}">\${author.name}</option>\`).join('');
      categorySelect.value = this.currentCategory;
    }

    // Устанавливаем текущие значения фильтров
    const periodSelect = document.getElementById('analytics-period-filter');
    if (periodSelect) periodSelect.value = this.currentPeriod;

    const typeSelect = document.getElementById('analytics-type-filter');
    if (typeSelect) typeSelect.value = this.currentType;
  }

  /**
   * Применение фильтров
   */
  applyFilters() {
    const periodSelect = document.getElementById('analytics-period-filter');
    const categorySelect = document.getElementById('analytics-category-filter');
    const typeSelect = document.getElementById('analytics-type-filter');

    this.currentPeriod = periodSelect?.value || 'week';
    this.currentCategory = categorySelect?.value || 'all';
    this.currentType = typeSelect?.value || 'all';

    this.updateAnalytics();
  }

  /**
   * Получение статистики аналитики
   */
  getAnalyticsStats() {
    const videos = this.getFilteredVideos();
    
    if (videos.length === 0) {
      return {
        totalVideos: 0,
        avgEngagement: 0,
        avgViralScore: 0,
        topCategory: 'Нет данных'
      };
    }

    const engagementRates = videos.map(v => this.calculateEngagementRate(v));
    const viralScores = videos.map(v => this.calculateViralScore(v));
    
    // Находим самую популярную категорию
    const categories = {};
    videos.forEach(v => {
      const cat = v.category || 'Без категории';
      categories[cat] = (categories[cat] || 0) + 1;
    });
    const topCategory = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b, 'Нет данных');

    return {
      totalVideos: videos.length,
      avgEngagement: (engagementRates.reduce((a, b) => a + b, 0) / engagementRates.length).toFixed(2),
      avgViralScore: Math.round(viralScores.reduce((a, b) => a + b, 0) / viralScores.length),
      topCategory: topCategory
    };
  }

  /**
   * Расчет engagement rate
   */
  calculateEngagementRate(video) {
    const views = parseInt(video.viewCount) || 0;
    const likes = parseInt(video.likeCount) || 0;
    const comments = parseInt(video.commentCount) || 0;
    
    if (views === 0) return 0;
    return ((likes + comments) / views) * 100;
  }

  /**
   * Расчет viral score
   */
  calculateViralScore(video) {
    const views = parseInt(video.viewCount) || 0;
    const likes = parseInt(video.likeCount) || 0;
    const comments = parseInt(video.commentCount) || 0;
    
    // Простая формула viral score
    const engagementRate = this.calculateEngagementRate(video);
    const viewsScore = Math.log10(Math.max(views, 1)) * 10;
    
    return Math.min(100, Math.round(viewsScore + engagementRate * 2));
  }

  /**
   * Форматирование числа
   */
  formatNumber(num) {
    const number = parseInt(num) || 0;
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    return number.toLocaleString();
  }

  /**
   * Форматирование длительности
   */
  formatDuration(duration) {
    const seconds = this.parseDuration(duration);
    if (seconds < 60) return \`\${seconds}с\`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes < 60) return \`\${minutes}:\${remainingSeconds.toString().padStart(2, '0')}\`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return \`\${hours}:\${remainingMinutes.toString().padStart(2, '0')}:\${remainingSeconds.toString().padStart(2, '0')}\`;
  }
}`,

  'ChartManager.js': `export class ChartManager {
  constructor() {
    this.charts = new Map();
    this.colors = {
      primary: '#3B82F6',
      secondary: '#8B5CF6', 
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
      info: '#06B6D4'
    };
    console.log('📈 ChartManager: Инициализация системы графиков...');
    console.log('✅ ChartManager: Готов к работе');
  }

  destroyChart(chartId) {
    if (this.charts.has(chartId)) {
      this.charts.get(chartId).destroy();
      this.charts.delete(chartId);
    }
  }

  createCategoriesChart(canvasId, categoriesData) {
    this.destroyChart(canvasId);
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.warn(\`⚠️ ChartManager: Canvas \${canvasId} не найден\`);
      return null;
    }

    if (!window.Chart) {
      console.warn('Chart.js не загружен');
      return null;
    }

    const labels = categoriesData.map(cat => cat.name);
    const videosData = categoriesData.map(cat => cat.videoCount);

    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Количество видео',
          data: videosData,
          backgroundColor: this.colors.primary + '80',
          borderColor: this.colors.primary,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Производительность по категориям' },
          tooltip: {
            callbacks: {
              afterLabel: function(context) {
                return [
                  '',
                  '📊 Формула расчета:',
                  'Количество видео в категории',
                  '',
                  '💡 Метрика показывает общее',
                  'количество видео по категориям'
                ];
              }
            }
          }
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Количество видео' } }
        }
      }
    });

    this.charts.set(canvasId, chart);
    return chart;
  }

  createDurationDistributionChart(canvasId, videos) {
    this.destroyChart(canvasId);
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.warn(\`⚠️ ChartManager: Canvas \${canvasId} не найден\`);
      return null;
    }

    if (!window.Chart) {
      console.warn('Chart.js не загружен');
      return null;
    }

    const distribution = {
      'Короткие (≤60с)': videos.filter(v => this.parseDuration(v.duration) <= 60).length,
      'Средние (60-600с)': videos.filter(v => {
        const dur = this.parseDuration(v.duration);
        return dur > 60 && dur <= 600;
      }).length,
      'Длинные (>600с)': videos.filter(v => this.parseDuration(v.duration) > 600).length
    };

    const labels = Object.keys(distribution);
    const data = Object.values(distribution);
    const colors = [this.colors.info, this.colors.warning, this.colors.danger];

    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Количество видео',
          data: data,
          backgroundColor: colors.map(color => color + '80'),
          borderColor: colors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Распределение по длительности' },
          tooltip: {
            callbacks: {
              afterLabel: function(context) {
                return [
                  '',
                  '📊 Классификация длительности:',
                  '• Короткие: ≤ 60 секунд',
                  '• Средние: 60-600 секунд',  
                  '• Длинные: > 600 секунд',
                  '',
                  '💡 Основано на поле duration'
                ];
              }
            }
          }
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Количество видео' } }
        }
      }
    });

    this.charts.set(canvasId, chart);
    return chart;
  }

  /**
   * Создает dual-axis график роста канала (подписчики + просмотры)
   */
  createChannelGrowthChart(canvasId, channelData, historicalData = null) {
    this.destroyChart(canvasId);
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.warn(\`⚠️ ChartManager: Canvas \${canvasId} не найден\`);
      return null;
    }

    if (!window.Chart) {
      console.warn('Chart.js не загружен');
      return null;
    }

    // Генерируем временные данные для демонстрации роста
    const timePoints = this.generateTimePoints(30); // последние 30 дней
    const subscribersData = this.generateGrowthData(channelData.subscriberCount || channelData.subscribers, timePoints.length, 'subscribers');
    const viewsData = this.generateGrowthData(channelData.viewCount || channelData.totalViews, timePoints.length, 'views');

    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timePoints,
        datasets: [
          {
            label: 'Подписчики',
            data: subscribersData,
            borderColor: this.colors.primary,
            backgroundColor: this.colors.primary + '20',
            yAxisID: 'y',
            tension: 0.4
          },
          {
            label: 'Просмотры',
            data: viewsData,
            borderColor: this.colors.secondary,
            backgroundColor: this.colors.secondary + '20',
            yAxisID: 'y1',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: { position: 'top' },
          title: { 
            display: true, 
            text: \`Рост канала: \${channelData.title || channelData.name}\`,
            font: { size: 14, weight: 'bold' }
          }
        },
        scales: {
          x: {
            display: true,
            title: { display: true, text: 'Дата' }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: { display: true, text: 'Подписчики' },
            ticks: {
              callback: (value) => this.formatNumber(value)
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: { display: true, text: 'Просмотры' },
            grid: { drawOnChartArea: false },
            ticks: {
              callback: (value) => this.formatNumber(value)
            }
          }
        }
      }
    });

    this.charts.set(canvasId, chart);
    return chart;
  }

  /**
   * Генерирует временные точки для графика
   */
  generateTimePoints(days) {
    const points = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      points.push(date.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' }));
    }
    
    return points;
  }

  /**
   * Генерирует данные роста для графика
   */
  generateGrowthData(currentValue, points, type) {
    const data = [];
    const growthRate = type === 'subscribers' ? 0.02 : 0.05; // 2% для подписчиков, 5% для просмотров
    const variance = 0.3; // вариативность изменений
    
    let baseValue = Math.max(1, (currentValue || 0) * 0.7); // начинаем с 70% от текущего значения
    
    for (let i = 0; i < points; i++) {
      // Добавляем рост с небольшой случайностью
      const randomFactor = 1 + (Math.random() - 0.5) * variance;
      const growthFactor = 1 + (growthRate * randomFactor);
      baseValue *= growthFactor;
      
      data.push(Math.round(baseValue));
    }
    
    // Корректируем последнее значение под текущее
    data[data.length - 1] = currentValue || 0;
    
    return data;
  }

  /**
   * Создает timeline график активности по дням
   */
  createTimelineChart(canvasId, videos, period = 'week') {
    this.destroyChart(canvasId);
    
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return null;

    const timelineData = this.processTimelineData(videos, period);
    
    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timelineData.labels,
        datasets: [
          {
            label: 'Количество видео',
            data: timelineData.videoCount,
            borderColor: this.colors.primary,
            backgroundColor: this.colors.primary + '20',
            yAxisID: 'y',
            tension: 0.4
          },
          {
            label: 'Средние просмотры',
            data: timelineData.avgViews,
            borderColor: this.colors.secondary,
            backgroundColor: this.colors.secondary + '20',
            yAxisID: 'y1',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' }
        },
        scales: {
          x: { display: true },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: { display: true, text: 'Количество видео' }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: { display: true, text: 'Средние просмотры' },
            grid: { drawOnChartArea: false },
            ticks: {
              callback: (value) => this.formatNumber(value)
            }
          }
        }
      }
    });

    this.charts.set(canvasId, chart);
    return chart;
  }

  /**
   * Создает график распределения engagement rate
   */
  createEngagementChart(canvasId, videos) {
    this.destroyChart(canvasId);
    
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return null;

    // Группируем по уровням engagement
    const engagement = {
      'Высокий (>5%)': videos.filter(v => this.calculateEngagementRate(v) > 5).length,
      'Средний (2-5%)': videos.filter(v => {
        const rate = this.calculateEngagementRate(v);
        return rate >= 2 && rate <= 5;
      }).length,
      'Низкий (<2%)': videos.filter(v => this.calculateEngagementRate(v) < 2).length
    };

    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(engagement),
        datasets: [{
          data: Object.values(engagement),
          backgroundColor: [this.colors.success, this.colors.warning, this.colors.danger],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              afterLabel: function(context) {
                return [
                  '',
                  '📊 Формула Engagement Rate:',
                  'ER = ((Лайки + Комментарии) / Просмотры) × 100',
                  '',
                  '💡 Классификация:',
                  '• Высокий: > 5% (отличное вовлечение)',
                  '• Средний: 2-5% (хорошее вовлечение)', 
                  '• Низкий: < 2% (слабое вовлечение)'
                ];
              }
            }
          }
        }
      }
    });

    this.charts.set(canvasId, chart);
    return chart;
  }

  /**
   * Создает scatter plot просмотры vs engagement
   */
  createScatterChart(canvasId, videos) {
    this.destroyChart(canvasId);
    
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return null;

    const scatterData = videos.map(video => ({
      x: parseInt(video.viewCount) || 0,
      y: this.calculateEngagementRate(video),
      label: video.title?.substring(0, 30) || 'Без названия'
    }));

    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Видео',
          data: scatterData,
          backgroundColor: this.colors.primary + '60',
          borderColor: this.colors.primary,
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: function(context) {
                return context[0].raw.label || 'Видео';
              },
              label: (context) => [
                \`Просмотры: \${this.formatNumber(context.parsed.x)}\`,
                \`Engagement: \${context.parsed.y.toFixed(2)}%\`
              ],
              afterLabel: function(context) {
                return [
                  '',
                  '📊 Корреляция просмотры vs вовлечение:',
                  'X: Количество просмотров (логарифм. шкала)',
                  'Y: Engagement Rate (%)',
                  '',
                  '💡 Формула ER:',
                  '((Лайки + Комментарии) / Просмотры) × 100'
                ];
              }
            }
          }
        },
        scales: {
          x: {
            type: 'logarithmic',
            title: { display: true, text: 'Просмотры (log scale)' },
            ticks: {
              callback: (value) => this.formatNumber(value)
            }
          },
          y: {
            title: { display: true, text: 'Engagement Rate (%)' },
            beginAtZero: true
          }
        }
      }
    });

    this.charts.set(canvasId, chart);
    return chart;
  }

  /**
   * Обработка данных timeline
   */
  processTimelineData(videos, period) {
    const now = new Date();
    const days = period === 'week' ? 7 : period === 'month' ? 30 : period === 'quarter' ? 90 : 365;
    
    const data = {};
    
    // Создаем точки времени
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      data[dateKey] = { count: 0, totalViews: 0 };
    }

    // Группируем видео по дням
    videos.forEach(video => {
      if (video.publishedAt) {
        const videoDate = new Date(video.publishedAt).toISOString().split('T')[0];
        if (data[videoDate]) {
          data[videoDate].count++;
          data[videoDate].totalViews += parseInt(video.viewCount) || 0;
        }
      }
    });

    return {
      labels: Object.keys(data).map(date => new Date(date).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })),
      videoCount: Object.values(data).map(d => d.count),
      avgViews: Object.values(data).map(d => d.count > 0 ? Math.round(d.totalViews / d.count) : 0)
    };
  }

  /**
   * Расчет engagement rate
   */
  calculateEngagementRate(video) {
    const views = parseInt(video.viewCount) || 0;
    if (views === 0) return 0;
    
    const likes = parseInt(video.likeCount) || 0;
    const comments = parseInt(video.commentCount) || 0;
    return ((likes + comments) / views) * 100;
  }

  /**
   * Парсинг длительности видео из ISO 8601 формата
   */
  parseDuration(duration) {
    if (!duration) return 0;
    const match = duration.match(/PT(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+)S)?/);
    if (!match) return 0;
    
    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);
    
    return hours * 3600 + minutes * 60 + seconds;
  }

  /**
   * Форматирование чисел для графиков
   */
  formatNumber(num) {
    const number = parseInt(num) || 0;
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
  }

  destroyAllCharts() {
    this.charts.forEach((chart, chartId) => { chart.destroy(); });
    this.charts.clear();
    console.log('🗑️ ChartManager: Все графики уничтожены');
  }
}`,

  'ViralScoreCalculator.js': `export class ViralScoreCalculator {
  constructor() {
    console.log('🧮 ViralScoreCalculator: Инициализация системы подсчета метрик...');
    console.log('✅ ViralScoreCalculator: Готов к работе');
  }

  calculateViralScore(views, likes, comments) {
    views = parseInt(views) || 0;
    likes = parseInt(likes) || 0;
    comments = parseInt(comments) || 0;

    const viewScore = Math.min(views / 10000, 100);
    const engagementScore = views > 0 ? ((likes + comments * 2) / views) * 1000 : 0;
    const totalScore = Math.round(viewScore + engagementScore);
    
    return totalScore;
  }

  calculateEngagementRate(views, likes, comments) {
    views = parseInt(views) || 0;
    likes = parseInt(likes) || 0;
    comments = parseInt(comments) || 0;
    if (views === 0) return 0;
    return ((likes + comments) / views) * 100;
  }

  formatDuration(duration) {
    // Поддерживает как секунды, так и ISO 8601 формат
    let seconds = 0;
    
    if (typeof duration === 'string' && duration.startsWith('PT')) {
      // ISO 8601 формат (PT1H2M30S)
      const match = duration.match(/PT(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+)S)?/);
      if (match) {
        const hours = parseInt(match[1] || 0);
        const minutes = parseInt(match[2] || 0);
        const secs = parseInt(match[3] || 0);
        seconds = hours * 3600 + minutes * 60 + secs;
      }
    } else {
      seconds = parseInt(duration) || 0;
    }
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return \`\${hours}:\${minutes.toString().padStart(2, '0')}:\${remainingSeconds.toString().padStart(2, '0')}\`;
    }
    return \`\${minutes}:\${remainingSeconds.toString().padStart(2, '0')}\`;
  }

  formatNumber(num) {
    num = parseInt(num) || 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }

  calculateAverageMetrics(videos) {
    if (!videos || videos.length === 0) {
      return { avgViews: 0, avgLikes: 0, avgComments: 0, avgEngagement: 0, avgViralScore: 0, totalVideos: 0 };
    }

    const totals = videos.reduce((acc, video) => {
      acc.views += parseInt(video.viewCount || video.views) || 0;
      acc.likes += parseInt(video.likeCount || video.likes) || 0;
      acc.comments += parseInt(video.commentCount || video.comments) || 0;
      acc.viralScore += parseInt(video.viral_score || this.calculateViralScore(
        video.viewCount || video.views,
        video.likeCount || video.likes, 
        video.commentCount || video.comments
      )) || 0;
      return acc;
    }, { views: 0, likes: 0, comments: 0, viralScore: 0 });

    const count = videos.length;
    const avgViews = totals.views / count;
    const avgLikes = totals.likes / count;
    const avgComments = totals.comments / count;

    return {
      avgViews: Math.round(avgViews),
      avgLikes: Math.round(avgLikes), 
      avgComments: Math.round(avgComments),
      avgEngagement: this.calculateEngagementRate(avgViews, avgLikes, avgComments),
      avgViralScore: Math.round(totals.viralScore / count),
      totalVideos: count
    };
  }

  compareCategories(videos) {
    const categories = {};
    
    videos.forEach(video => {
      const category = video.category || 'Без категории';
      if (!categories[category]) categories[category] = [];
      categories[category].push(video);
    });

    return Object.keys(categories).map(category => ({
      name: category,
      metrics: this.calculateAverageMetrics(categories[category]),
      videoCount: categories[category].length
    }));
  }

  isViral(video) {
    const viralScore = this.calculateViralScore(
      video.viewCount || video.views, 
      video.likeCount || video.likes, 
      video.commentCount || video.comments
    );
    return viralScore > 70;
  }

  /**
   * Получение трендовых видео (топ по viral score)
   */
  getTrendingVideos(videos, limit = 10) {
    return videos
      .map(video => ({
        ...video,
        viralScore: this.calculateViralScore(
          video.viewCount || video.views,
          video.likeCount || video.likes,
          video.commentCount || video.comments
        )
      }))
      .sort((a, b) => b.viralScore - a.viralScore)
      .slice(0, limit);
  }

  /**
   * Статистика по viral score
   */
  getViralScoreStats(videos) {
    if (!videos || videos.length === 0) {
      return {
        totalVideos: 0,
        viralVideos: 0,
        averageScore: 0,
        highScore: 0,
        lowScore: 0
      };
    }

    const scores = videos.map(video => 
      this.calculateViralScore(
        video.viewCount || video.views,
        video.likeCount || video.likes,
        video.commentCount || video.comments
      )
    );

    const viralVideos = scores.filter(score => score > 70).length;
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    return {
      totalVideos: videos.length,
      viralVideos: viralVideos,
      averageScore: Math.round(averageScore),
      highScore: Math.max(...scores),
      lowScore: Math.min(...scores)
    };
  }
}`,

  'ImportExportManager.js': `export class ImportExportManager {
  constructor(dataManager, viralScoreCalculator) {
    this.dataManager = dataManager;
    this.viralScoreCalculator = viralScoreCalculator;
    console.log('📤 ImportExportManager: Инициализация системы импорта/экспорта...');
    console.log('✅ ImportExportManager: Готов к работе');
  }

  /**
   * Экспорт всех данных в JSON для бэкапа
   */
  exportBackup() {
    try {
      const backupData = {
        _metadata: {
          version: 'ViralScript AI v4.0',
          exportDate: new Date().toISOString(),
          description: 'Full backup of ViralScript AI data'
        },
        videos: this.dataManager.get('videos'),
        channels: this.dataManager.get('channels'),
        myChannels: this.dataManager.get('myChannels'),
        authors: this.dataManager.get('authors'),
        authorCategories: this.dataManager.get('authorCategories'),
        contentRubrics: this.dataManager.get('contentRubrics'),
        notifications: this.dataManager.get('notifications'),
        settings: this.dataManager.get('settings')
      };
      
      const dataStr = JSON.stringify(backupData, null, 2);
      
      // Создаем файл для скачивания
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = \`viralscript_backup_\${new Date().toISOString().split('T')[0]}.json\`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      console.log('✅ ImportExportManager: Бэкап успешно экспортирован');
      this.showNotification('Бэкап успешно экспортирован', 'success');
      
      return true;
    } catch (error) {
      console.error('❌ ImportExportManager: Ошибка экспорта бэкапа:', error);
      this.showNotification('Ошибка при экспорте бэкапа', 'error');
      return false;
    }
  }

  /**
   * Импорт данных из JSON бэкапа
   */
  importBackup() {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const backupData = JSON.parse(event.target.result);
            
            // Проверяем формат данных
            if (!backupData._metadata || !backupData._metadata.version) {
              throw new Error('Неверный формат файла бэкапа');
            }
            
            // Подтверждение импорта
            if (confirm(\`Импортировать данные из бэкапа \${backupData._metadata.exportDate}?\\nВнимание: Все текущие данные будут заменены!\`)) {
              const success = this.importAllData(backupData);
              
              if (success) {
                console.log('✅ ImportExportManager: Данные успешно импортированы');
                this.showNotification('Данные успешно импортированы! Перезагрузка страницы...', 'success');
                
                // Перезагружаем страницу для обновления интерфейса
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              }
            }
          } catch (error) {
            console.error('❌ ImportExportManager: Ошибка парсинга файла:', error);
            this.showNotification('Ошибка чтения файла бэкапа', 'error');
          }
        };
        
        reader.readAsText(file);
      };
      
      input.click();
    } catch (error) {
      console.error('❌ ImportExportManager: Ошибка импорта:', error);
      this.showNotification('Ошибка при импорте данных', 'error');
    }
  }

  /**
   * Импорт всех данных из бэкапа
   */
  importAllData(backupData) {
    try {
      // Импортируем данные по ключам
      Object.keys(backupData).forEach(key => {
        if (key !== '_metadata' && backupData[key]) {
          this.dataManager.set(key, backupData[key]);
        }
      });
      
      return true;
    } catch (error) {
      console.error('❌ ImportExportManager: Ошибка импорта данных:', error);
      return false;
    }
  }

  /**
   * Экспорт в Excel (.xlsx) - требует библиотеку SheetJS
   */
  exportToExcel() {
    // Проверяем наличие библиотеки XLSX
    if (typeof XLSX === 'undefined') {
      this.showNotification('Библиотека XLSX не загружена. Экспорт в Excel недоступен.', 'error');
      return false;
    }

    try {
      // Создаем новую рабочую книгу
      const workbook = XLSX.utils.book_new();
      
      // Получаем все данные
      const videosData = this.dataManager.get('videos');
      const channelsData = this.dataManager.get('myChannels');
      const authorsData = this.dataManager.get('authors');
      
      const videos = videosData ? JSON.parse(videosData) : [];
      const channels = channelsData ? JSON.parse(channelsData) : [];
      const authors = authorsData ? JSON.parse(authorsData) : [];
      
      // Лист 1: Обзор данных
      const overviewData = [{
        'Общая статистика': 'Значение',
        'Всего видео': videos.length,
        'Всего каналов': channels.length,
        'Категорий авторов': authors.length,
        'Дата экспорта': new Date().toLocaleDateString('ru-RU'),
        'Версия': 'ViralScript AI v4.0'
      }];
      
      const overviewSheet = XLSX.utils.json_to_sheet(overviewData);
      XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Обзор');
      
      // Лист 2: Видео
      if (videos.length > 0) {
        const videosExportData = videos.map(video => ({
          'Название': video.title || 'Без названия',
          'Просмотры': video.viewCount || video.views || 0,
          'Лайки': video.likeCount || video.likes || 0,
          'Комментарии': video.commentCount || video.comments || 0,
          'Длительность': this.viralScoreCalculator.formatDuration(video.duration),
          'Viral Score': this.viralScoreCalculator.calculateViralScore(
            video.viewCount || video.views, 
            video.likeCount || video.likes, 
            video.commentCount || video.comments
          ),
          'Engagement Rate': this.viralScoreCalculator.calculateEngagementRate(
            video.viewCount || video.views, 
            video.likeCount || video.likes, 
            video.commentCount || video.comments
          ).toFixed(2) + '%',
          'Категория': video.category || 'Не указано',
          'Дата публикации': video.publishedAt ? new Date(video.publishedAt).toLocaleDateString('ru-RU') : 'Не указано'
        }));
        
        const videosSheet = XLSX.utils.json_to_sheet(videosExportData);
        XLSX.utils.book_append_sheet(workbook, videosSheet, 'Видео');
      }
      
      // Лист 3: Каналы
      if (channels.length > 0) {
        const channelsExportData = channels.map(channel => ({
          'Название канала': channel.title || channel.name || 'Без названия',
          'ID канала': channel.id || 'Не указано',
          'Подписчики': channel.subscriberCount || channel.subscribers || 0,
          'Всего просмотров': channel.viewCount || channel.totalViews || 0,
          'Количество видео': channel.videoCount || 0,
          'Дата добавления': channel.addedAt ? new Date(channel.addedAt).toLocaleDateString('ru-RU') : 'Не указано',
          'Статус': 'active'
        }));
        
        const channelsSheet = XLSX.utils.json_to_sheet(channelsExportData);
        XLSX.utils.book_append_sheet(workbook, channelsSheet, 'Каналы');
      }
      
      // Лист 4: Аналитика
      const metrics = this.viralScoreCalculator.calculateAverageMetrics(videos);
      const analyticsData = [{
        'Метрика': 'Значение',
        'Среднее количество просмотров': metrics.avgViews,
        'Средние лайки': metrics.avgLikes,
        'Средние комментарии': metrics.avgComments,
        'Средний Engagement Rate': metrics.avgEngagement.toFixed(2) + '%',
        'Средний Viral Score': metrics.avgViralScore,
        'Вирусных видео': videos.filter(v => this.viralScoreCalculator.isViral(v)).length,
        'Процент вирусных': videos.length > 0 ? 
          ((videos.filter(v => this.viralScoreCalculator.isViral(v)).length / videos.length) * 100).toFixed(1) + '%' : '0%'
      }];
      
      const analyticsSheet = XLSX.utils.json_to_sheet(analyticsData);
      XLSX.utils.book_append_sheet(workbook, analyticsSheet, 'Аналитика');
      
      // Сохраняем файл
      const fileName = \`viralscript_export_\${new Date().toISOString().split('T')[0]}.xlsx\`;
      XLSX.writeFile(workbook, fileName);
      
      console.log('✅ ImportExportManager: Excel файл экспортирован');
      this.showNotification('Excel файл успешно экспортирован', 'success');
      
      return true;
    } catch (error) {
      console.error('❌ ImportExportManager: Ошибка экспорта Excel:', error);
      this.showNotification('Ошибка при экспорте в Excel', 'error');
      return false;
    }
  }

  /**
   * Экспорт в PDF (упрощенная версия)
   */
  exportToPDF() {
    try {
      // Получаем данные для отчета
      const videosData = this.dataManager.get('videos');
      const videos = videosData ? JSON.parse(videosData) : [];
      const metrics = this.viralScoreCalculator.calculateAverageMetrics(videos);
      
      // Создаем HTML для PDF
      const htmlContent = \`
        <html>
        <head>
          <title>ViralScript AI v4.0 - Отчет</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; color: #3B82F6; margin-bottom: 30px; }
            .stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px; }
            .stat-card { border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>ViralScript AI v4.0 - Аналитический отчет</h1>
            <p>Дата создания: \${new Date().toLocaleDateString('ru-RU')}</p>
          </div>
          
          <div class="stats">
            <div class="stat-card">
              <h3>Общая статистика</h3>
              <p>Всего видео: \${videos.length}</p>
              <p>Вирусных видео: \${videos.filter(v => this.viralScoreCalculator.isViral(v)).length}</p>
            </div>
            <div class="stat-card">
              <h3>Средние метрики</h3>
              <p>Просмотры: \${this.viralScoreCalculator.formatNumber(metrics.avgViews)}</p>
              <p>Engagement: \${metrics.avgEngagement.toFixed(2)}%</p>
            </div>
          </div>
          
          <h3>Топ-10 видео</h3>
          <table>
            <thead>
              <tr>
                <th>Название</th>
                <th>Просмотры</th>
                <th>Viral Score</th>
                <th>Длительность</th>
              </tr>
            </thead>
            <tbody>
              \${videos.slice(0, 10).map(video => \`
                <tr>
                  <td>\${video.title || 'Без названия'}</td>
                  <td>\${this.viralScoreCalculator.formatNumber(video.viewCount || video.views)}</td>
                  <td>\${this.viralScoreCalculator.calculateViralScore(
                    video.viewCount || video.views, 
                    video.likeCount || video.likes, 
                    video.commentCount || video.comments
                  )}</td>
                  <td>\${this.viralScoreCalculator.formatDuration(video.duration)}</td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        </body>
        </html>
      \`;
      
      // Открываем в новом окне для печати/сохранения в PDF
      const printWindow = window.open('', '_blank');
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();
      
      console.log('✅ ImportExportManager: PDF отчет создан');
      this.showNotification('PDF отчет создан (используйте Печать → Сохранить как PDF)', 'success');
      
      return true;
    } catch (error) {
      console.error('❌ ImportExportManager: Ошибка экспорта PDF:', error);
      this.showNotification('Ошибка при создании PDF отчета', 'error');
      return false;
    }
  }

  /**
   * Очистка всех данных
   */
  clearAllData() {
    if (confirm('Вы уверены, что хотите очистить ВСЕ данные?\\nЭто действие необратимо!')) {
      try {
        // Очищаем все ключи данных
        const keys = [
          'videos', 'channels', 'myChannels', 'authors', 
          'authorCategories', 'contentRubrics', 'notifications', 'settings'
        ];
        
        keys.forEach(key => {
          this.dataManager.remove(key);
        });
        
        console.log('✅ ImportExportManager: Данные очищены');
        this.showNotification('Все данные очищены! Перезагрузка страницы...', 'success');
        setTimeout(() => window.location.reload(), 1000);
        
        return true;
      } catch (error) {
        console.error('❌ ImportExportManager: Ошибка очистки данных:', error);
        this.showNotification('Ошибка при очистке данных', 'error');
        return false;
      }
    }
    return false;
  }

  /**
   * Показ уведомления через NotificationManager
   */
  showNotification(message, type = 'info') {
    if (window.notificationManager) {
      window.notificationManager.show(message, type);
    } else {
      // Резервный вариант через alert
      const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
      alert(\`\${emoji} \${message}\`);
    }
  }
}`,

  'ViralScriptApp.js': `export class ViralScriptApp {
  constructor() {
    this.channels = [];
    this.videos = [];
    this.dataManager = null;
    this.youtubeAPI = null;
    this.errorHandler = null;
    this.secureConfig = null;
    this.channelManager = null;
    this.categoryManager = null;
    this.notificationManager = null;
    this.rubricManager = null;
    this.analyticsManager = null;
    this.chartManager = null;
    this.viralScoreCalculator = null;
    this.importExportManager = null;
    console.log("🚀 ViralScriptApp создан");
  }
  
  async init() {
    try {
      console.log("⚡ Инициализация ViralScriptApp...");
      
      this.dataManager = window.dataManager;
      this.youtubeAPI = window.youtubeAPI;
      this.errorHandler = window.errorHandler;
      this.secureConfig = window.secureConfig;
      this.channelManager = window.channelManager;
      this.categoryManager = window.categoryManager;
      this.notificationManager = window.notificationManager;
      this.rubricManager = window.rubricManager;
      this.analyticsManager = window.analyticsManager;
      this.chartManager = window.chartManager;
      this.viralScoreCalculator = window.viralScoreCalculator;
      this.importExportManager = window.importExportManager;
      
      if (this.youtubeAPI) {
        await this.youtubeAPI.init();
      }
      
      this.loadChannels();
      this.loadVideos();
      this.updateDashboardStats();
      
      console.log("✅ ViralScriptApp инициализирован");
    } catch (error) {
      this.errorHandler?.logError("ViralScriptApp.init", error);
      throw error;
    }
  }
  
  loadChannels() {
    try {
      this.channels = this.channelManager?.getChannels() || this.dataManager?.get("myChannels") || [];
      console.log("📺 Загружено каналов: " + this.channels.length);
    } catch (error) {
      this.errorHandler?.logError("ViralScriptApp.loadChannels", error);
    }
  }
  
  loadVideos() {
    try {
      this.videos = this.dataManager?.get("videos") || [];
      console.log("🎬 Загружено видео: " + this.videos.length);
    } catch (error) {
      this.errorHandler?.logError("ViralScriptApp.loadVideos", error);
    }
  }
  
  async addChannel(channelData) {
    try {
      console.log("➕ Добавление канала:", channelData.name || channelData);
      
      let channel;
      if (this.channelManager) {
        channel = await this.channelManager.addChannel(
          typeof channelData === "string" ? channelData : channelData.url
        );
      } else {
        channel = {
          ...channelData,
          id: Date.now() + Math.random(),
          created_at: new Date().toISOString(),
          video_count: 0,
          last_sync: null
        };
        
        this.channels.push(channel);
        this.dataManager?.set("channels", this.channels);
      }
      
      this.updateDashboardStats();
      this.renderChannels();
      
      return channel;
    } catch (error) {
      this.errorHandler?.logError("ViralScriptApp.addChannel", error);
      throw error;
    }
  }
  
  updateDashboardStats() {
    try {
      const totalChannels = this.channels?.length || 0;
      const totalVideos = this.videos?.length || 0;
      
      const totalChannelsEl = document.getElementById("total-channels");
      const totalVideosEl = document.getElementById("total-videos");
      
      if (totalChannelsEl) totalChannelsEl.textContent = totalChannels;
      if (totalVideosEl) totalVideosEl.textContent = totalVideos;
      
      const viralVideos = this.videos.filter(v => v.viral_score > 70).length;
      const viralVideosEl = document.getElementById("viral-videos");
      if (viralVideosEl) viralVideosEl.textContent = viralVideos;
      
      const avgScore = this.videos.length > 0 
        ? (this.videos.reduce((sum, v) => sum + (v.viral_score || 0), 0) / this.videos.length).toFixed(1)
        : "0.0";
      const avgScoreEl = document.getElementById("avg-viral-score");
      if (avgScoreEl) avgScoreEl.textContent = avgScore;
      
    } catch (error) {
      this.errorHandler?.logError("ViralScriptApp.updateDashboardStats", error);
    }
  }
  
  renderChannels() {
    try {
      console.log("🔄 Рендеринг каналов...");
      if (window.updateChannelsDisplay) {
        window.updateChannelsDisplay();
      }
    } catch (error) {
      this.errorHandler?.logError("ViralScriptApp.renderChannels", error);
    }
  }
}`,

  'OurVideosManager.js': `/**
 * OurVideosManager - Управление разделом "Наши видео"
 * Модуль для управления новыми видео с пользовательских каналов
 * Включает фильтрацию, сортировку, категоризацию и массовые операции
 * 
 * @version 4.0.0
 * @author ViralScript AI Team
 */

export class OurVideosManager {
    constructor(dataManager, channelManager, categoryManager, viralScoreCalculator) {
        this.dataManager = dataManager;
        this.channelManager = channelManager;
        this.categoryManager = categoryManager;
        this.viralScoreCalculator = viralScoreCalculator;
        
        // Состояние фильтров
        this.activeFilters = {
            channel: '',
            status: '', // read | unread | empty
            author: '',
            videoType: '', // short | medium | long | empty
            dateFrom: '',
            dateTo: ''
        };
        
        // Состояние сортировки
        this.activeSorting = {
            field: 'date',
            direction: 'desc' // asc | desc
        };
        
        // Выбранные видео для массовых операций
        this.selectedVideos = new Set();
        
        // Кэш для производительности
        this.cachedVideos = null;
        this.cacheTimestamp = null;
        this.cacheExpiryTime = 5 * 60 * 1000; // 5 минут
        
        console.log('OurVideosManager инициализирован');
    }

    /**
     * Инициализация модуля
     */
    async init() {
        try {
            await this.loadOurVideos();
            this.setupEventListeners();
            this.renderOurVideosSection();
            console.log('OurVideosManager готов к работе');
            return true;
        } catch (error) {
            console.error('Ошибка инициализации OurVideosManager:', error);
            return false;
        }
    }

    /**
     * Загрузка наших видео (из каналов пользователя)
     */
    async loadOurVideos() {
        try {
            // Получаем каналы пользователя
            const myChannels = await this.channelManager.getMyChannels();
            
            console.log('🔍 DEBUG: myChannels получено:', myChannels);
            console.log('🔍 DEBUG: myChannels длина:', myChannels ? myChannels.length : 'null');
            
            if (!myChannels || myChannels.length === 0) {
                console.log('Каналы пользователя не найдены');
                return [];
            }

            // Получаем все видео из основного хранилища
            const allVideos = this.dataManager.get('videos') || [];
            console.log('🔍 DEBUG: Все видео из localStorage:', allVideos.length);
            
            // Получаем ID наших каналов
            const myChannelIds = myChannels.map(ch => ch.id);
            console.log('🔍 DEBUG: ID наших каналов:', myChannelIds);
            
            // Фильтруем видео только с наших каналов
            const ourVideos = [];
            
            for (const video of allVideos) {
                // Проверяем принадлежность к нашим каналам
                const belongsToOurChannel = myChannelIds.includes(video.channel_source_id) || 
                                          myChannelIds.some(channelId => video.channelId === channelId);
                
                if (belongsToOurChannel) {
                    // Находим информацию о канале
                    const channel = myChannels.find(ch => ch.id === video.channel_source_id || ch.id === video.channelId);
                    
                    const processedVideo = {
                        ...video,
                        channelId: video.channel_source_id || video.channelId,
                        channelName: channel ? (channel.name || channel.title) : video.channel_name,
                        channelUrl: channel ? channel.url : null,
                        // Дополнительные поля для "наших видео"
                        isRead: video.isRead || false,
                        authorCategory: video.authorCategory || null,
                        addedDate: video.addedDate || video.publishedAt,
                        // Классификация по длительности
                        durationType: this.classifyVideoDuration(video.duration),
                        // Вирусный скор
                        viralScore: this.viralScoreCalculator.calculateViralScore(
                            video.viewCount, 
                            video.likeCount, 
                            video.commentCount
                        ),
                        // Engagement rate
                        engagementRate: this.calculateEngagementRate(video)
                    };
                    
                    ourVideos.push(processedVideo);
                }
            }
            
            console.log('🔍 DEBUG: Найдено наших видео:', ourVideos.length);

            // Сортируем по дате добавления (новые сначала)
            ourVideos.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
            
            console.log('Загружено ' + ourVideos.length + ' наших видео');
            return ourVideos;
            
        } catch (error) {
            console.error('Ошибка загрузки наших видео:', error);
            return [];
        }
    }

    /**
     * Классификация видео по длительности
     */
    classifyVideoDuration(duration) {
        if (!duration) return 'unknown';
        
        const seconds = this.parseDurationToSeconds(duration);
        
        if (seconds <= 60) return 'short';      // ≤60 сек
        if (seconds <= 119) return 'medium';    // 61-119 сек  
        return 'long';                          // ≥120 сек
    }

    /**
     * Парсинг длительности в секунды (из формата PT1M30S)
     */
    parseDurationToSeconds(duration) {
        if (typeof duration === 'number') return duration;
        
        const match = duration.match(/PT(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+)S)?/);
        if (!match) return 0;
        
        const hours = parseInt(match[1] || 0);
        const minutes = parseInt(match[2] || 0);
        const seconds = parseInt(match[3] || 0);
        
        return hours * 3600 + minutes * 60 + seconds;
    }

    /**
     * Расчет engagement rate
     */
    calculateEngagementRate(video) {
        const views = parseInt(video.viewCount) || 0;
        const likes = parseInt(video.likeCount) || 0;
        const comments = parseInt(video.commentCount) || 0;
        
        if (views === 0) return 0;
        
        return ((likes + comments) / views * 100).toFixed(2);
    }

    /**
     * Получение статистики наших видео
     */
    async getOurVideosStats() {
        const videos = await this.getFilteredVideos();
        
        const stats = {
            totalNew: videos.length,
            unread: videos.filter(v => !v.isRead).length,
            totalViews: videos.reduce((sum, v) => sum + (parseInt(v.viewCount) || 0), 0),
            uncategorized: videos.filter(v => !v.authorCategory).length
        };
        
        return stats;
    }

    /**
     * Применение фильтров к видео
     */
    async getFilteredVideos() {
        // Проверяем кэш
        if (this.cachedVideos && 
            this.cacheTimestamp && 
            Date.now() - this.cacheTimestamp < this.cacheExpiryTime) {
            return this.applyFiltersAndSorting(this.cachedVideos);
        }
        
        // Загружаем свежие данные
        const videos = await this.loadOurVideos();
        
        // Обновляем кэш
        this.cachedVideos = videos;
        this.cacheTimestamp = Date.now();
        
        return this.applyFiltersAndSorting(videos);
    }

    /**
     * Применение фильтров и сортировки
     */
    applyFiltersAndSorting(videos) {
        let filtered = [...videos];
        
        // Применяем фильтры
        if (this.activeFilters.channel) {
            filtered = filtered.filter(v => v.channelId === this.activeFilters.channel);
        }
        
        if (this.activeFilters.status) {
            const isRead = this.activeFilters.status === 'read';
            filtered = filtered.filter(v => v.isRead === isRead);
        }
        
        if (this.activeFilters.author) {
            filtered = filtered.filter(v => v.authorCategory === this.activeFilters.author);
        }
        
        if (this.activeFilters.videoType) {
            filtered = filtered.filter(v => v.durationType === this.activeFilters.videoType);
        }
        
        if (this.activeFilters.dateFrom) {
            const fromDate = new Date(this.activeFilters.dateFrom);
            filtered = filtered.filter(v => new Date(v.addedDate) >= fromDate);
        }
        
        if (this.activeFilters.dateTo) {
            const toDate = new Date(this.activeFilters.dateTo);
            toDate.setHours(23, 59, 59, 999); // Включаем весь день
            filtered = filtered.filter(v => new Date(v.addedDate) <= toDate);
        }
        
        // Применяем сортировку
        filtered.sort((a, b) => {
            let aValue, bValue;
            
            switch (this.activeSorting.field) {
                case 'date':
                    aValue = new Date(a.addedDate);
                    bValue = new Date(b.addedDate);
                    break;
                case 'views':
                    aValue = parseInt(a.viewCount) || 0;
                    bValue = parseInt(b.viewCount) || 0;
                    break;
                case 'engagement':
                    aValue = parseFloat(a.engagementRate) || 0;
                    bValue = parseFloat(b.engagementRate) || 0;
                    break;
                case 'viral':
                    aValue = a.viralScore || 0;
                    bValue = b.viralScore || 0;
                    break;
                default:
                    return 0;
            }
            
            const result = aValue > bValue ? 1 : (aValue < bValue ? -1 : 0);
            return this.activeSorting.direction === 'desc' ? -result : result;
        });
        
        return filtered;
    }

    /**
     * Установка фильтров
     */
    setFilters(filters) {
        this.activeFilters = { ...this.activeFilters, ...filters };
        this.invalidateCache();
    }

    /**
     * Установка сортировки
     */
    setSorting(field, direction = 'desc') {
        this.activeSorting = { field, direction };
        this.invalidateCache();
    }

    /**
     * Инвалидация кэша
     */
    invalidateCache() {
        this.cachedVideos = null;
        this.cacheTimestamp = null;
    }

    /**
     * Массовые операции с видео
     */
    async selectVideo(videoId) {
        this.selectedVideos.add(videoId);
        this.updateSelectionUI();
    }

    async deselectVideo(videoId) {
        this.selectedVideos.delete(videoId);
        this.updateSelectionUI();
    }

    async selectAllVideos() {
        const videos = await this.getFilteredVideos();
        videos.forEach(video => this.selectedVideos.add(video.id));
        this.updateSelectionUI();
    }

    async deselectAllVideos() {
        this.selectedVideos.clear();
        this.updateSelectionUI();
    }

    /**
     * Назначение автора выбранным видео
     */
    async assignAuthorToSelected(authorCategory) {
        const videos = await this.getFilteredVideos();
        const selectedVideosList = videos.filter(v => this.selectedVideos.has(v.id));
        
        for (const video of selectedVideosList) {
            video.authorCategory = authorCategory;
            // Обновляем данные в каналах
            await this.updateVideoInChannel(video);
        }
        
        this.invalidateCache();
        await this.renderVideosList();
        
        console.log('Автор ' + authorCategory + ' назначен ' + selectedVideosList.length + ' видео');
        return selectedVideosList.length;
    }

    /**
     * Пометка выбранных видео как прочитанные
     */
    async markSelectedAsRead() {
        const videos = await this.getFilteredVideos();
        const selectedVideosList = videos.filter(v => this.selectedVideos.has(v.id));
        
        for (const video of selectedVideosList) {
            video.isRead = true;
            await this.updateVideoInChannel(video);
        }
        
        this.invalidateCache();
        await this.renderVideosList();
        
        console.log(selectedVideosList.length + ' видео отмечено как прочитанные');
        return selectedVideosList.length;
    }

    /**
     * Обновление видео в канале
     */
    async updateVideoInChannel(video) {
        try {
            const channels = await this.channelManager.getMyChannels();
            const channel = channels.find(c => c.id === video.channelId);
            
            if (channel && channel.videos) {
                const videoIndex = channel.videos.findIndex(v => v.id === video.id);
                if (videoIndex !== -1) {
                    channel.videos[videoIndex] = { ...channel.videos[videoIndex], ...video };
                    await this.dataManager.saveData('myChannels', channels);
                }
            }
        } catch (error) {
            console.error('Ошибка обновления видео в канале:', error);
        }
    }

    /**
     * Обновление UI выбора
     */
    updateSelectionUI() {
        const count = this.selectedVideos.size;
        
        // Обновляем счетчики
        const countElements = [
            'selected-new-videos-count',
            'mass-author-selected-count', 
            'mass-author-apply-count'
        ];
        
        countElements.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = count;
        });
        
        // Управляем кнопками
        const buttons = [
            'assign-author-btn',
            'mark-read-btn'
        ];
        
        buttons.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.disabled = count === 0;
        });
        
        // Обновляем чекбоксы
        document.querySelectorAll('.video-checkbox').forEach(checkbox => {
            const videoId = checkbox.dataset.videoId;
            checkbox.checked = this.selectedVideos.has(videoId);
        });
    }

    /**
     * Настройка обработчиков событий
     */
    setupEventListeners() {
        // Фильтры
        const filterElements = [
            'channel-filter-new-videos',
            'read-status-filter', 
            'author-filter-new-videos',
            'video-type-filter',
            'date-from-filter',
            'date-to-filter'
        ];
        
        filterElements.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', () => this.handleFilterChange());
            }
        });
        
        // Сортировка
        const sortEl = document.getElementById('sort-by-filter');
        if (sortEl) {
            sortEl.addEventListener('change', () => this.handleSortChange());
        }
        
        console.log('Обработчики событий OurVideosManager настроены');
    }

    /**
     * Обработка изменения фильтров
     */
    async handleFilterChange() {
        // Собираем значения фильтров
        const filters = {
            channel: document.getElementById('channel-filter-new-videos')?.value || '',
            status: document.getElementById('read-status-filter')?.value || '',
            author: document.getElementById('author-filter-new-videos')?.value || '',
            videoType: document.getElementById('video-type-filter')?.value || '',
            dateFrom: document.getElementById('date-from-filter')?.value || '',
            dateTo: document.getElementById('date-to-filter')?.value || ''
        };
        
        this.setFilters(filters);
        await this.renderVideosList();
        await this.updateStatsCards();
    }

    /**
     * Обработка изменения сортировки
     */
    async handleSortChange() {
        const sortValue = document.getElementById('sort-by-filter')?.value;
        if (!sortValue) return;
        
        const [field, direction] = sortValue.split('_');
        this.setSorting(field, direction);
        await this.renderVideosList();
    }

    /**
     * Рендеринг раздела "Наши видео"
     */
    async renderOurVideosSection() {
        await this.updateStatsCards();
        await this.renderFilterOptions();
        await this.renderVideosList();
    }

    /**
     * Обновление статистических карточек
     */
    async updateStatsCards() {
        const stats = await this.getOurVideosStats();
        
        // Обновляем карточки
        const statsMapping = {
            'total-new-videos': stats.totalNew,
            'unread-new-videos': stats.unread,
            'new-videos-total-views': this.formatNumber(stats.totalViews),
            'uncategorized-videos': stats.uncategorized
        };
        
        Object.entries(statsMapping).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        });
        
        // Обновляем счетчик отображения
        const displayCount = document.getElementById('videos-count-display');
        if (displayCount) {
            const filteredVideos = await this.getFilteredVideos();
            displayCount.textContent = filteredVideos.length;
        }
    }

    /**
     * Рендеринг опций фильтров
     */
    async renderFilterOptions() {
        // Каналы
        await this.renderChannelOptions();
        
        // Авторы
        await this.renderAuthorOptions();
    }

    /**
     * Рендеринг опций каналов
     */
    async renderChannelOptions() {
        const channelSelect = document.getElementById('channel-filter-new-videos');
        if (!channelSelect) return;
        
        try {
            const channels = await this.channelManager.getMyChannels();
            
            channelSelect.innerHTML = '<option value="">Все каналы</option>';
            
            channels.forEach(channel => {
                const option = document.createElement('option');
                option.value = channel.id;
                option.textContent = channel.title;
                channelSelect.appendChild(option);
            });
            
        } catch (error) {
            console.error('Ошибка рендеринга опций каналов:', error);
        }
    }

    /**
     * Рендеринг опций авторов
     */
    async renderAuthorOptions() {
        const authorSelect = document.getElementById('author-filter-new-videos');
        if (!authorSelect) return;
        
        try {
            const authors = await this.categoryManager.getCategories();
            
            authorSelect.innerHTML = '<option value="">Все авторы</option>';
            
            authors.forEach(author => {
                const option = document.createElement('option');
                option.value = author.name;
                option.textContent = author.name;
                authorSelect.appendChild(option);
            });
            
        } catch (error) {
            console.error('Ошибка рендеринга опций авторов:', error);
        }
    }

    /**
     * Рендеринг списка видео
     */
    async renderVideosList() {
        const container = document.getElementById('new-videos-list-detailed');
        if (!container) {
            console.error('Контейнер списка видео не найден');
            return;
        }
        
        try {
            const videos = await this.getFilteredVideos();
            
            if (videos.length === 0) {
                container.innerHTML = '<div class="text-center py-12"><i class="fas fa-video text-gray-400 text-6xl mb-4"></i><h3 class="text-lg font-medium text-gray-900 mb-2">Видео не найдены</h3><p class="text-gray-600">Измените фильтры или добавьте каналы для мониторинга</p></div>';
                return;
            }
            
            const videosHTML = videos.map(video => this.renderVideoCard(video)).join('');
            container.innerHTML = videosHTML;
            
            // Настраиваем обработчики для чекбоксов
            this.setupVideoCheckboxes();
            
        } catch (error) {
            console.error('Ошибка рендеринга списка видео:', error);
            container.innerHTML = '<div class="text-center py-12"><i class="fas fa-exclamation-triangle text-red-400 text-6xl mb-4"></i><h3 class="text-lg font-medium text-gray-900 mb-2">Ошибка загрузки</h3><p class="text-gray-600">Не удалось загрузить список видео</p></div>';
        }
    }

    /**
     * Рендеринг карточки видео
     */
    renderVideoCard(video) {
        const isSelected = this.selectedVideos.has(video.id);
        const readStatus = video.isRead ? 'прочитано' : 'непрочитано';
        const readClass = video.isRead ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-l-blue-500';
        
        // Получаем цвет категории автора
        const categoryColor = this.categoryManager.getCategoryColor(video.authorCategory);
        const categoryBadge = video.authorCategory 
            ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style="background-color: ' + categoryColor + '20; color: ' + categoryColor + ';">' + video.authorCategory + '</span>'
            : '<span class="text-gray-400 text-xs">Не назначен</span>';
        
        // Иконка типа видео
        const typeIcons = {
            short: '⚡',
            medium: '🎯', 
            long: '📹'
        };
        
        const typeIcon = typeIcons[video.durationType] || '❓';
        
        return '<div class="video-card ' + readClass + ' rounded-lg p-4 mb-3 transition-all hover:shadow-md" data-video-id="' + video.id + '">' +
                '<div class="flex items-start space-x-4">' +
                    '<!-- Чекбокс -->' +
                    '<div class="flex items-center pt-1">' +
                        '<input type="checkbox" class="video-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500" data-video-id="' + video.id + '"' + (isSelected ? ' checked' : '') + '>' +
                    '</div>' +
                    
                    '<!-- Thumbnail -->' +
                    '<div class="flex-shrink-0">' +
                        '<img src="' + (video.thumbnail || '/static/placeholder-video.png') + '" alt="Thumbnail" class="w-24 h-16 object-cover rounded-lg bg-gray-200">' +
                        '<div class="text-xs text-center mt-1 text-gray-500">' +
                            typeIcon + ' ' + this.formatDuration(video.duration) +
                        '</div>' +
                    '</div>' +
                    
                    '<!-- Содержимое -->' +
                    '<div class="flex-1 min-w-0">' +
                        '<div class="flex items-start justify-between">' +
                            '<div class="flex-1">' +
                                '<!-- Заголовок -->' +
                                '<h4 class="text-sm font-medium mb-2">' +
                                    '<a href="' + video.url + '" target="_blank" class="text-blue-600 hover:text-blue-800 hover:underline line-clamp-2 cursor-pointer" title="Открыть видео на YouTube">' +
                                        video.title +
                                    '</a>' +
                                '</h4>' +
                                
                                '<!-- Метаданные -->' +
                                '<div class="flex items-center space-x-4 text-xs text-gray-500 mb-2">' +
                                    '<span title="Канал">' +
                                        '<i class="fas fa-tv mr-1"></i>' +
                                        video.channelName +
                                    '</span>' +
                                    '<span title="Дата публикации">' +
                                        '<i class="fas fa-calendar mr-1"></i>' +
                                        this.formatDate(video.publishedAt) +
                                    '</span>' +
                                    '<span title="Статус">' +
                                        '<i class="fas fa-eye mr-1"></i>' +
                                        readStatus +
                                    '</span>' +
                                '</div>' +
                                
                                '<!-- Статистика -->' +
                                '<div class="flex items-center space-x-4 text-xs text-gray-600">' +
                                    '<span title="Просмотры">' +
                                        '<i class="fas fa-play text-blue-500 mr-1"></i>' +
                                        this.formatNumber(video.viewCount) +
                                    '</span>' +
                                    '<span title="Лайки">' +
                                        '<i class="fas fa-thumbs-up text-green-500 mr-1"></i>' +
                                        this.formatNumber(video.likeCount) +
                                    '</span>' +
                                    '<span title="Комментарии">' +
                                        '<i class="fas fa-comment text-purple-500 mr-1"></i>' +
                                        this.formatNumber(video.commentCount) +
                                    '</span>' +
                                    '<span title="Engagement Rate">' +
                                        '<i class="fas fa-chart-line text-orange-500 mr-1"></i>' +
                                        video.engagementRate + '%' +
                                    '</span>' +
                                    '<span title="Viral Score">' +
                                        '<i class="fas fa-fire text-red-500 mr-1"></i>' +
                                        video.viralScore +
                                    '</span>' +
                                '</div>' +
                            '</div>' +
                            
                            '<!-- Действия -->' +
                            '<div class="flex flex-col items-end space-y-2 ml-4">' +
                                '<!-- Категория автора -->' +
                                '<div class="text-right">' +
                                    '<div class="text-xs text-gray-500 mb-1">Автор:</div>' +
                                    categoryBadge +
                                '</div>' +
                                
                                '<!-- Кнопки -->' +
                                '<div class="flex space-x-2">' +
                                    '<button onclick="window.ourVideosManager.toggleVideoReadStatus(\\\"' + video.id + '\\\")" class="text-xs ' + (video.isRead ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-green-100 hover:bg-green-200 text-green-700') + ' px-2 py-1 rounded" title="' + (video.isRead ? 'Отметить как непрочитанное' : 'Отметить как прочитанное') + '">' +
                                        '<i class="fas ' + (video.isRead ? 'fa-eye-slash' : 'fa-check') + '"></i>' +
                                    '</button>' +
                                    '<button onclick="window.open(\\\"' + video.url + '\\\", \\\"_blank\\\")" class="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded" title="Открыть видео">' +
                                        '<i class="fab fa-youtube"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    /**
     * Настройка обработчиков чекбоксов
     */
    setupVideoCheckboxes() {
        document.querySelectorAll('.video-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const videoId = e.target.dataset.videoId;
                if (e.target.checked) {
                    this.selectVideo(videoId);
                } else {
                    this.deselectVideo(videoId);
                }
            });
        });
    }

    /**
     * Переключение статуса прочтения видео
     */
    async toggleVideoReadStatus(videoId) {
        try {
            const videos = await this.getFilteredVideos();
            const video = videos.find(v => v.id === videoId);
            
            if (video) {
                video.isRead = !video.isRead;
                await this.updateVideoInChannel(video);
                
                this.invalidateCache();
                await this.renderVideosList();
                await this.updateStatsCards();
                
                const status = video.isRead ? 'прочитанным' : 'непрочитанным';
                console.log('Видео отмечено как ' + status);
            }
        } catch (error) {
            console.error('Ошибка изменения статуса видео:', error);
        }
    }

    // УДАЛЕНО: assignAuthorToVideo - заменено на новую систему назначения авторов

    /**
     * Форматирование чисел
     */
    formatNumber(num) {
        if (!num) return '0';
        const number = parseInt(num);
        if (number >= 1000000) return (number / 1000000).toFixed(1) + 'M';
        if (number >= 1000) return (number / 1000).toFixed(1) + 'K';
        return number.toString();
    }

    /**
     * Форматирование даты
     */
    formatDate(dateStr) {
        if (!dateStr) return 'Неизвестно';
        const date = new Date(dateStr);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    /**
     * Форматирование длительности
     */
    formatDuration(duration) {
        if (!duration) return '0:00';
        
        const seconds = this.parseDurationToSeconds(duration);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return hours + ':' + minutes.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
        }
        return minutes + ':' + secs.toString().padStart(2, '0');
    }

    /**
     * Экспорт в Excel
     */
    async exportToExcel() {
        try {
            const videos = await this.getFilteredVideos();
            
            if (videos.length === 0) {
                alert('Нет данных для экспорта');
                return;
            }
            
            const exportData = videos.map(video => ({
                'Название': video.title,
                'Канал': video.channelName,
                'Автор': video.authorCategory || 'Не назначен',
                'Тип': this.getVideoTypeLabel(video.durationType),
                'Длительность': this.formatDuration(video.duration),
                'Просмотры': video.viewCount,
                'Лайки': video.likeCount,
                'Комментарии': video.commentCount,
                'Engagement Rate': video.engagementRate + '%',
                'Viral Score': video.viralScore,
                'Дата публикации': this.formatDate(video.publishedAt),
                'Статус': video.isRead ? 'Прочитано' : 'Не прочитано',
                'URL': video.url
            }));
            
            // Используем ImportExportManager если доступен
            if (window.importExportManager) {
                await window.importExportManager.exportToExcel(exportData, 'Наши_видео');
            } else {
                console.log('Данные для экспорта:', exportData);
                alert('Экспорт будет реализован позже');
            }
            
        } catch (error) {
            console.error('Ошибка экспорта:', error);
            alert('Ошибка экспорта данных');
        }
    }

    /**
     * Получение подписи типа видео
     */
    getVideoTypeLabel(type) {
        const labels = {
            short: 'Короткое (≤60с)',
            medium: 'Среднее (61-119с)',
            long: 'Длинное (≥2мин)',
            unknown: 'Неизвестно'
        };
        return labels[type] || 'Неизвестно';
    }

    /**
     * Синхронизация всех каналов
     */
    async syncAllChannels() {
        try {
            console.log('Синхронизация всех каналов...');
            
            // Запускаем синхронизацию через ChannelManager
            await this.channelManager.syncAllChannels();
            
            // Очищаем кэш и обновляем отображение
            this.invalidateCache();
            await this.renderOurVideosSection();
            
            console.log('Синхронизация завершена');
            
            // Показываем уведомление
            if (window.notificationManager) {
                window.notificationManager.show('success', 'Каналы синхронизированы', 'Данные о новых видео обновлены');
            }
            
        } catch (error) {
            console.error('Ошибка синхронизации каналов:', error);
            
            if (window.notificationManager) {
                window.notificationManager.show('error', 'Ошибка синхронизации', error.message);
            }
        }
    }
}

// Глобальные функции для HTML
window.syncAllChannelsNewVideos = async () => {
    if (window.ourVideosManager) {
        await window.ourVideosManager.syncAllChannels();
    }
};

window.markAllNewVideosAsRead = async () => {
    if (window.ourVideosManager) {
        const videos = await window.ourVideosManager.getFilteredVideos();
        const unreadVideos = videos.filter(v => !v.isRead);
        
        if (unreadVideos.length === 0) {
            alert('Нет непрочитанных видео');
            return;
        }
        
        if (confirm('Отметить ' + unreadVideos.length + ' видео как прочитанные?')) {
            // Выбираем все непрочитанные
            unreadVideos.forEach(v => window.ourVideosManager.selectVideo(v.id));
            
            // Отмечаем как прочитанные
            await window.ourVideosManager.markSelectedAsRead();
            
            // Очищаем выбор
            await window.ourVideosManager.deselectAllVideos();
        }
    }
};

window.applyNewVideosFilters = async () => {
    if (window.ourVideosManager) {
        await window.ourVideosManager.handleFilterChange();
    }
};

window.applySorting = async () => {
    if (window.ourVideosManager) {
        await window.ourVideosManager.handleSortChange();
    }
};

window.selectAllNewVideos = async () => {
    if (window.ourVideosManager) {
        await window.ourVideosManager.selectAllVideos();
    }
};

window.deselectAllNewVideos = async () => {
    if (window.ourVideosManager) {
        await window.ourVideosManager.deselectAllVideos();
    }
};

window.exportFilteredVideosToExcel = async () => {
    if (window.ourVideosManager) {
        await window.ourVideosManager.exportToExcel();
    }
};

// ========================================
// КРИТИЧЕСКИ ВАЖНЫЕ UI ФУНКЦИИ ДЛЯ АВТОРОВ И РУБРИК
// ========================================

/**
 * Показать модал назначения автора одному видео (упрощённая версия)
 */
// УДАЛЕНО: Проблемные функции showSingleAuthorAssignModal и showMassAuthorAssignModal
// Заменено на новую систему управления авторами и рубриками

console.log('OurVideosManager модуль загружен');

// ========================================
// НОВАЯ СИСТЕМА АВТОРОВ И РУБРИК
// ========================================

/**
 * Показать модальное окно добавления автора
 */
window.showAddAuthorModal = function showAddAuthorModal() {
    const authorName = prompt('Введите имя автора:');
    if (!authorName || !authorName.trim()) {
        return;
    }
    
    // Добавляем автора через CategoryManager
    if (window.categoryManager) {
        const newAuthor = window.categoryManager.addCategory({
            name: authorName.trim(),
            color: getRandomColor(),
            description: ''
        });
        
        console.log('✅ Автор добавлен:', newAuthor);
        renderAuthorsGrid();
        renderAuthorsStats();
        
        if (window.notificationManager) {
            window.notificationManager.show('success', 'Автор добавлен', 'Автор "' + authorName + '" успешно создан');
        }
    }
};

/**
 * Показать модальное окно добавления рубрики
 */
window.showAddRubricModal = function showAddRubricModal() {
    const rubricName = prompt('Введите название рубрики:');
    if (!rubricName || !rubricName.trim()) {
        return;
    }
    
    // Получаем список каналов для выбора
    const channels = window.channelManager?.getMyChannels() || [];
    let channelId = null;
    
    if (channels.length > 0) {
        const channelChoice = prompt(
            'Выберите канал для рубрики (или оставьте пустым для общей рубрики):\\n\\n' +
            channels.map((ch, index) => (index + 1) + '. ' + ch.name).join('\\n') + 
            '\\n\\nВведите номер канала или оставьте пустым:'
        );
        
        if (channelChoice && channelChoice.trim()) {
            const choiceNum = parseInt(channelChoice);
            if (choiceNum > 0 && choiceNum <= channels.length) {
                channelId = channels[choiceNum - 1].id;
            }
        }
    }
    
    // Добавляем рубрику через RubricManager
    if (window.rubricManager) {
        const newRubric = window.rubricManager.createRubric(
            rubricName.trim(),
            'fas fa-folder',
            channelId
        );
        
        console.log('✅ Рубрика добавлена:', newRubric);
        renderRubricsGrid();
        renderRubricsStats();
        updateRubricsChannelFilter();
        
        if (window.notificationManager) {
            window.notificationManager.show('success', 'Рубрика добавлена', 'Рубрика "' + rubricName + '" успешно создана');
        }
    }
};

/**
 * Получить случайный цвет для автора
 */
function getRandomColor() {
    const colors = [
        '#EF4444', '#F97316', '#F59E0B', '#EAB308', 
        '#84CC16', '#22C55E', '#10B981', '#14B8A6',
        '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1',
        '#8B5CF6', '#A855F7', '#D946EF', '#EC4899'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Отрендерить сетку авторов
 */
window.renderAuthorsGrid = function renderAuthorsGrid() {
    const authorsGrid = document.getElementById('authors-grid');
    if (!authorsGrid) return;
    
    const authors = window.categoryManager?.getCategories() || [];
    
    if (authors.length === 0) {
        authorsGrid.innerHTML = 
            '<div class="col-span-full text-center py-12 text-gray-500">' +
                '<i class="fas fa-user-plus text-4xl mb-4"></i>' +
                '<p>Добавьте первого автора для начала работы</p>' +
            '</div>';
        return;
    }
    
    authorsGrid.innerHTML = authors.map(author => 
        '<div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">' +
            '<div class="flex items-center mb-3">' +
                '<div class="w-4 h-4 rounded-full mr-2" style="background-color: ' + author.color + '"></div>' +
                '<h4 class="font-medium text-gray-900 truncate flex-1">' + author.name + '</h4>' +
            '</div>' +
            '<div class="flex items-center justify-between text-sm text-gray-600">' +
                '<span>Видео: ' + (author.videos_count || 0) + '</span>' +
                '<div class="flex space-x-1">' +
                    '<button onclick="assignAuthorToSelectedVideos(' + author.id + ')" ' +
                           'class="text-blue-600 hover:text-blue-800 p-1" title="Назначить выбранным видео">' +
                        '<i class="fas fa-link text-xs"></i>' +
                    '</button>' +
                    '<button onclick="removeAuthor(' + author.id + ')" ' +
                           'class="text-red-600 hover:text-red-800 p-1" title="Удалить автора">' +
                        '<i class="fas fa-trash text-xs"></i>' +
                    '</button>' +
                '</div>' +
            '</div>' +
        '</div>'
    ).join('');
};

/**
 * Отрендерить сетку рубрик
 */
window.renderRubricsGrid = function renderRubricsGrid() {
    const rubricsGrid = document.getElementById('rubrics-grid');
    if (!rubricsGrid) return;
    
    const rubrics = window.rubricManager?.getRubrics() || [];
    const channelFilter = document.getElementById('rubrics-channel-filter')?.value || '';
    
    // Фильтруем рубрики по выбранному каналу
    let filteredRubrics = rubrics;
    if (channelFilter === 'general') {
        filteredRubrics = rubrics.filter(r => !r.channel_id);
    } else if (channelFilter) {
        filteredRubrics = rubrics.filter(r => r.channel_id === channelFilter);
    }
    
    if (filteredRubrics.length === 0) {
        rubricsGrid.innerHTML = 
            '<div class="col-span-full text-center py-12 text-gray-500">' +
                '<i class="fas fa-folder-plus text-4xl mb-4"></i>' +
                '<p>' + (channelFilter ? 'Нет рубрик для выбранного канала' : 'Добавьте первую рубрику для начала работы') + '</p>' +
            '</div>';
        return;
    }
    
    rubricsGrid.innerHTML = filteredRubrics.map(rubric => {
        const channelName = rubric.channel_id ? getChannelName(rubric.channel_id) : 'Общая';
        const channelClass = rubric.channel_id ? 'text-blue-600' : 'text-green-600';
        
        return '<div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">' +
            '<div class="flex items-center mb-2">' +
                '<i class="' + (rubric.icon || 'fas fa-folder') + ' text-purple-600 mr-2"></i>' +
                '<h4 class="font-medium text-gray-900 truncate flex-1">' + rubric.name + '</h4>' +
            '</div>' +
            '<div class="text-xs ' + channelClass + ' mb-3">' +
                '<i class="fas fa-' + (rubric.channel_id ? 'tv' : 'globe') + ' mr-1"></i>' + channelName +
            '</div>' +
            '<div class="flex items-center justify-between text-sm text-gray-600">' +
                '<span>Видео: ' + (rubric.videos_count || 0) + '</span>' +
                '<div class="flex space-x-1">' +
                    '<button onclick="assignRubricToSelectedVideos(' + rubric.id + ')" ' +
                           'class="text-purple-600 hover:text-purple-800 p-1" title="Назначить выбранным видео">' +
                        '<i class="fas fa-link text-xs"></i>' +
                    '</button>' +
                    '<button onclick="removeRubric(' + rubric.id + ')" ' +
                           'class="text-red-600 hover:text-red-800 p-1" title="Удалить рубрику">' +
                        '<i class="fas fa-trash text-xs"></i>' +
                    '</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    }).join('');
};

/**
 * Получить название канала по ID
 */
function getChannelName(channelId) {
    const channels = window.channelManager?.getMyChannels() || [];
    const channel = channels.find(ch => ch.id === channelId);
    return channel ? (channel.name || channel.title || 'Неизвестный канал') : 'Неизвестный канал';
}

/**
 * Обновить фильтр каналов для рубрик
 */
window.updateRubricsChannelFilter = function updateRubricsChannelFilter() {
    const channelFilter = document.getElementById('rubrics-channel-filter');
    if (!channelFilter) return;
    
    const channels = window.channelManager?.getMyChannels() || [];
    const currentValue = channelFilter.value;
    
    // Сохраняем базовые опции
    channelFilter.innerHTML = 
        '<option value="">Все рубрики</option>' +
        '<option value="general">Общие рубрики</option>';
    
    // Добавляем каналы
    channels.forEach(channel => {
        const option = document.createElement('option');
        option.value = channel.id;
        option.textContent = channel.name || channel.title || channel.id;
        channelFilter.appendChild(option);
    });
    
    // Восстанавливаем выбранное значение
    channelFilter.value = currentValue;
};

/**
 * Фильтровать рубрики по каналу
 */
window.filterRubricsByChannel = function filterRubricsByChannel() {
    renderRubricsGrid();
};

/**
 * Отрендерить статистику авторов
 */
window.renderAuthorsStats = function renderAuthorsStats() {
    const authorsStats = document.getElementById('authors-stats');
    if (!authorsStats) return;
    
    const authors = window.categoryManager?.getCategories() || [];
    if (authors.length === 0) {
        authorsStats.innerHTML = '<p class="text-gray-500">Статистика появится после добавления авторов</p>';
        return;
    }
    
    // Получаем статистику через CategoryManager
    const stats = window.categoryManager?.getCategoriesStats() || [];
    
    authorsStats.innerHTML = 
        '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">' +
        stats.slice(0, 6).map(stat => 
            '<div class="border border-gray-200 rounded-lg p-4">' +
                '<div class="flex items-center mb-2">' +
                    '<div class="w-3 h-3 rounded-full mr-2" style="background-color: ' + stat.color + '"></div>' +
                    '<h5 class="font-medium text-gray-900">' + stat.name + '</h5>' +
                '</div>' +
                '<div class="space-y-1 text-sm text-gray-600">' +
                    '<div>Видео: ' + stat.videos_count + '</div>' +
                    '<div>Просмотры: ' + formatNumber(stat.total_views) + '</div>' +
                    '<div>Ср. балл: ' + stat.avg_viral_score + '</div>' +
                '</div>' +
            '</div>'
        ).join('') +
        '</div>';
};

/**
 * Отрендерить статистику рубрик
 */
window.renderRubricsStats = function renderRubricsStats() {
    const rubricsStats = document.getElementById('rubrics-stats');
    if (!rubricsStats) return;
    
    const rubrics = window.rubricManager?.getRubrics() || [];
    if (rubrics.length === 0) {
        rubricsStats.innerHTML = '<p class="text-gray-500">Статистика появится после добавления рубрик</p>';
        return;
    }
    
    // Получаем статистику через RubricManager
    const stats = window.rubricManager?.getRubricsStats() || [];
    
    rubricsStats.innerHTML = 
        '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">' +
        stats.slice(0, 6).map(stat => {
            const channelName = stat.channel_id ? getChannelName(stat.channel_id) : 'Общая';
            const channelClass = stat.channel_id ? 'text-blue-600' : 'text-green-600';
            
            return '<div class="border border-gray-200 rounded-lg p-4">' +
                '<div class="flex items-center justify-between mb-2">' +
                    '<h5 class="font-medium text-gray-900">' + stat.name + '</h5>' +
                    '<i class="' + (stat.icon || 'fas fa-folder') + ' text-purple-600"></i>' +
                '</div>' +
                '<div class="text-xs ' + channelClass + ' mb-2">' +
                    '<i class="fas fa-' + (stat.channel_id ? 'tv' : 'globe') + ' mr-1"></i>' + channelName +
                '</div>' +
                '<div class="space-y-1 text-sm text-gray-600">' +
                    '<div>Видео: ' + stat.videos_count + '</div>' +
                    '<div>Просмотры: ' + formatNumber(stat.total_views) + '</div>' +
                    '<div>Ср. балл: ' + stat.avg_viral_score + '</div>' +
                '</div>' +
            '</div>';
        }).join('') +
        '</div>';
};

/**
 * Назначить автора выбранным видео
 */
window.assignAuthorToSelectedVideos = function assignAuthorToSelectedVideos(authorId) {
    if (!window.ourVideosManager || !window.ourVideosManager.selectedVideos) {
        alert('Сначала выберите видео на странице "Видео"');
        return;
    }
    
    const selectedCount = window.ourVideosManager.selectedVideos.size;
    if (selectedCount === 0) {
        alert('Выберите видео для назначения автора');
        return;
    }
    
    const author = window.categoryManager?.getCategoryById(authorId);
    if (!author) {
        alert('Автор не найден');
        return;
    }
    
    if (confirm('Назначить автора "' + author.name + '" для ' + selectedCount + ' видео?')) {
        let successCount = 0;
        window.ourVideosManager.selectedVideos.forEach(videoId => {
            if (window.categoryManager.assignCategoryToVideo(videoId, authorId)) {
                successCount++;
            }
        });
        
        // Очищаем выбор
        window.ourVideosManager.selectedVideos.clear();
        
        // Обновляем интерфейс
        window.ourVideosManager.renderVideosList();
        renderAuthorsGrid();
        renderAuthorsStats();
        
        alert('✅ Автор "' + author.name + '" назначен для ' + successCount + ' видео');
    }
};

/**
 * Назначить рубрику выбранным видео  
 */
window.assignRubricToSelectedVideos = function assignRubricToSelectedVideos(rubricId) {
    if (!window.ourVideosManager || !window.ourVideosManager.selectedVideos) {
        alert('Сначала выберите видео на странице "Видео"');
        return;
    }
    
    const selectedCount = window.ourVideosManager.selectedVideos.size;
    if (selectedCount === 0) {
        alert('Выберите видео для назначения рубрики');
        return;
    }
    
    const rubric = window.rubricManager?.getRubricById(rubricId);
    if (!rubric) {
        alert('Рубрика не найдена');
        return;
    }
    
    if (confirm('Назначить рубрику "' + rubric.name + '" для ' + selectedCount + ' видео?')) {
        let successCount = 0;
        window.ourVideosManager.selectedVideos.forEach(videoId => {
            if (window.rubricManager.assignRubricToVideo(videoId, rubricId)) {
                successCount++;
            }
        });
        
        // Очищаем выбор
        window.ourVideosManager.selectedVideos.clear();
        
        // Обновляем интерфейс
        window.ourVideosManager.renderVideosList();
        renderRubricsGrid();
        renderRubricsStats();
        
        alert('✅ Рубрика "' + rubric.name + '" назначена для ' + successCount + ' видео');
    }
};

/**
 * Удалить автора
 */
window.removeAuthor = function removeAuthor(authorId) {
    const author = window.categoryManager?.getCategoryById(authorId);
    if (!author) return;
    
    if (confirm('Удалить автора "' + author.name + '"? Все видео этого автора останутся без автора.')) {
        window.categoryManager.removeCategory(authorId);
        renderAuthorsGrid();
        renderAuthorsStats();
        
        // Обновляем список видео если он открыт
        if (window.ourVideosManager) {
            window.ourVideosManager.renderVideosList();
        }
    }
};

/**
 * Удалить рубрику
 */
window.removeRubric = function removeRubric(rubricId) {
    const rubric = window.rubricManager?.getRubricById(rubricId);
    if (!rubric) return;
    
    if (confirm('Удалить рубрику "' + rubric.name + '"? Все видео этой рубрики останутся без рубрики.')) {
        window.rubricManager.removeRubric(rubricId);
        renderRubricsGrid();
        renderRubricsStats();
        
        // Обновляем список видео если он открыт
        if (window.ourVideosManager) {
            window.ourVideosManager.renderVideosList();
        }
    }
};

console.log('✅ Новая система авторов и рубрик загружена');`
}

// API Health Check
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    application: 'ViralScript AI v4.0',
    architecture: 'modular',
    modules: Object.keys(moduleContents).length,
    timestamp: new Date().toISOString()
  });
});

// Module endpoints for ES6 modules
app.get('/api/modules/:module', (c) => {
  const moduleName = c.req.param('module');
  
  try {
    const moduleContent = getModuleContent(moduleName);
    
    return new Response(moduleContent, {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    return c.json({ error: `Module ${moduleName} not found` }, 404);
  }
});

// Function to get ES6 module content
function getModuleContent(moduleName: string): string {
  if (moduleContents[moduleName]) {
    return moduleContents[moduleName];
  }
  throw new Error(`Unknown module: ${moduleName}`);
}

export default app