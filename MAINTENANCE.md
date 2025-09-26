# 🔒 MAINTENANCE MODE - Процедуры управления приватностью сайта

## 📋 Файловая структура

**Основные файлы:**
- `src/index_original.tsx` - Оригинальная версия приложения (BACKUP)
- `src/maintenance_simple.tsx` - Maintenance страница для приватности
- `src/index.tsx` - Текущий активный файл (определяет что деплоится)

## 🔄 ВКЛЮЧИТЬ MAINTENANCE (сделать сайт приватным)

### Шаг 1: Переключить на maintenance версию
```bash
cd /home/user/webapp
cp src/maintenance_simple.tsx src/index.tsx
```

### Шаг 2: Пересобрать проект
```bash
npm run build
```

### Шаг 3: Задеплоить на Cloudflare Pages
```bash
npx wrangler pages deploy dist --project-name webapp --commit-dirty=true
```

## 🌍 ОТКЛЮЧИТЬ MAINTENANCE (сделать сайт публичным)

### Шаг 1: Вернуть оригинальное приложение
```bash
cd /home/user/webapp
cp src/index_original.tsx src/index.tsx
```

### Шаг 2: Пересобрать проект
```bash
npm run build
```

### Шаг 3: Задеплоить на Cloudflare Pages
```bash
npx wrangler pages deploy dist --project-name webapp --commit-dirty=true
```

## ✅ Проверка статуса

**Локальная проверка (тест перед деплоем):**
```bash
cd /home/user/webapp
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000 --local &
curl http://localhost:3000
```

**Production проверка:**
- 🌍 Основной домен: https://webapp-309.pages.dev
- 📊 Status check: `npx wrangler pages deployment list --project-name webapp`

## 🔍 Индикаторы режимов

**MAINTENANCE MODE активен когда:**
- 🔒 Иконка замка
- "Сайт находится в разработке"
- HTTP Status: 503
- Заголовок: "Сайт временно недоступен"

**NORMAL MODE активен когда:**
- 📊 Дашборд с разделами
- "ViralScript AI v4.0 🚀 LIVE"
- Секции: "Мои каналы", "Наши видео", "Управление авторами"

## ⚠️ Важные заметки

1. **Кэширование:** Cloudflare может кэшировать ~2-5 минут
2. **Тестирование:** Всегда тестируйте локально перед deployment
3. **Backup:** Никогда не удаляйте `src/index_original.tsx`
4. **Git:** Коммитите важные изменения перед переключением режимов

## 🚀 Последнее выполнение

- ✅ **2025-09-26 12:38** - Maintenance mode активирован
- 🔒 **Статус:** ПРИВАТНЫЙ (maintenance)
- 📦 **Deployment ID:** 386e6aef-5eed-4135-ad52-8621ac838b33