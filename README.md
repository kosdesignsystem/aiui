# Инструкция: как загрузить и запустить проект с GitHub на MacBook

Инструкция для Product Designer без работы в терминале и без навыков программирования.

## Что нужно заранее

- MacBook с доступом в интернет
- GitHub-аккаунт
- OpenAI-аккаунт (для входа в Codex)
- Ссылка на репозиторий проекта (например: `https://github.com/company/project`)

## Шаг 1. Установите GitHub Desktop

1. Откройте сайт: [desktop.github.com](https://desktop.github.com/).
2. Нажмите `Download for macOS`.
3. Откройте скачанный файл и перетащите GitHub Desktop в `Applications`.
4. Запустите GitHub Desktop и войдите в GitHub.

## Шаг 2. Скачайте проект из GitHub (без терминала)

1. В GitHub Desktop откройте `File` -> `Clone repository...`.
2. Перейдите на вкладку `URL`.
3. Вставьте ссылку на репозиторий.
4. В поле `Local Path` выберите папку, например `~/Projects`.
5. Нажмите `Clone`.

После этого проект появится у вас как обычная папка на компьютере.

## Шаг 3. Установите Codex (десктоп-приложение)

1. Перейдите на официальный сайт OpenAI и откройте страницу загрузки Codex.
2. Скачайте версию для macOS.
3. Установите приложение и войдите в свой OpenAI-аккаунт.

## Шаг 4. Добавьте проект в Codex

1. Откройте Codex.
2. Нажмите `Open Folder` или `Add Project`.
3. Выберите папку проекта, которую вы скачали через GitHub Desktop.
4. Подождите, пока Codex загрузит структуру проекта.

## Шаг 5. Запустите проект через Codex

1. В чате Codex напишите: `Установи зависимости и запусти проект`.
2. Codex выполнит нужные команды (обычно `npm install` и `npm run dev`).
3. После запуска появится локальный адрес (например `http://localhost:5173`).
4. Откройте этот адрес в браузере.

## Шаг 6. Как остановить проект

1. Нажмите `Stop` в окне запущенного процесса в Codex.
2. Или напишите в чате: `Останови dev-сервер`.

## Важно про права пользователя (без администратора)

- Все шаги выше выполняются под обычным пользователем macOS.
- Иногда первая установка зависимостей может потребовать заранее установленный Node.js.
- Если на вашем Mac нельзя устанавливать системные компоненты без admin-прав, попросите IT установить Node.js один раз. Дальше проект обычно запускается без admin-доступа.

## Если проект не стартует

1. Проверьте, что вы открыли папку проекта, а не `.zip`-архив.
2. Проверьте интернет (для первой установки зависимостей).
3. В Codex напишите: `Покажи причину ошибки запуска и предложи исправление`.

## Публикация на GitHub Pages

Проект уже подготовлен к деплою через GitHub Actions.

1. Откройте репозиторий на GitHub.
2. Перейдите в `Settings` -> `Pages`.
3. В блоке `Build and deployment` выберите `Source: GitHub Actions`.
4. Убедитесь, что основная ветка называется `main`.
5. Запушьте изменения в `main`.

После этого workflow `Deploy to GitHub Pages` соберет проект и опубликует его по адресу:

- `https://kosdesignsystem.github.io/aiui/`

Важно:

- Для GitHub Pages в проекте уже настроен корректный `base` путь.
- Роутинг работает через `HashRouter`, поэтому дополнительные настройки `404.html` не нужны.

## Автоматический PR из GitHub веб-интерфейса через Codex

В репозитории добавлен workflow:

- `.github/workflows/codex-auto-pr.yml`

Что он делает:

1. Вы запускаете workflow вручную в GitHub через `Actions` -> `Codex Auto PR` -> `Run workflow`.
2. Вставляете текст задачи в поле `prompt`.
3. GitHub Actions запускает Codex, Codex меняет файлы в репозитории.
4. Workflow сам создает ветку, коммит и Pull Request.

Что нужно включить один раз:

1. В GitHub откройте `Settings` -> `Secrets and variables` -> `Actions`.
2. Создайте secret `OPENAI_API_KEY`.
3. В `Settings` -> `Actions` -> `General` включите `Read and write permissions` для `GITHUB_TOKEN`.
4. Там же включите `Allow GitHub Actions to create and approve pull requests`.

Как пользоваться:

1. Откройте вкладку `Actions`.
2. Выберите workflow `Codex Auto PR`.
3. Нажмите `Run workflow`.
4. Заполните:
   - `prompt` — что именно нужно изменить
   - `pr_title` — заголовок будущего PR
   - `base_branch` — обычно `main`
5. Дождитесь завершения job.
6. Откройте созданный PR по ссылке из summary workflow.

Важно:

- Это создает `PR`, а не пушит напрямую в `main`.
- Если Codex не внес изменения, PR не появится.
- Запускать workflow стоит только тем, у кого есть write-доступ к репозиторию.

## Мост: prompt -> GitHub workflow -> auto PR

Если нужен внешний endpoint, который принимает текст задачи и сам запускает workflow, в репозитории есть простой bridge:

- `scripts/codex-dispatch-bridge.mjs`
- `docs/codex-dispatch-openapi.yaml`

Что он делает:

1. Принимает `POST /dispatch` с JSON и Bearer token.
2. Вызывает GitHub API `workflow_dispatch` для workflow `codex-auto-pr.yml`.
3. GitHub Actions запускает Codex и автоматически открывает PR.

Переменные окружения:

- `BRIDGE_TOKEN` — секрет для доступа к bridge endpoint
- `GITHUB_TOKEN` — GitHub token с правом запускать workflow
- `GITHUB_REPOSITORY` — репозиторий в формате `owner/repo`
- `GITHUB_WORKFLOW_ID` — по умолчанию `codex-auto-pr.yml`
- `GITHUB_BASE_BRANCH` — по умолчанию `main`
- `CODEX_MODEL` — по умолчанию `gpt-5.2-codex`
- `CODEX_EFFORT` — по умолчанию `medium`
- `PORT` — по умолчанию `8787`
- `HOST` — по умолчанию `127.0.0.1`

Локальный запуск:

```bash
BRIDGE_TOKEN=change-me \
GITHUB_TOKEN=ghp_xxx \
GITHUB_REPOSITORY=owner/repo \
npm run bridge:codex-pr
```

Пример запроса:

```bash
curl -X POST http://127.0.0.1:8787/dispatch \
  -H "Authorization: Bearer change-me" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Обнови README и исправь стили кнопки поиска",
    "prTitle": "Codex: fix search button styles"
  }'
```

Что важно понимать:

- Это рабочий мост для `любой web/UI -> endpoint -> GitHub Actions`.
- У самого `Codex web` сейчас нет публичного механизма, чтобы на отправку промпта вызвать ваш произвольный webhook.
- Поэтому для сценария именно `чат -> endpoint` нужен либо свой frontend, либо `ChatGPT Action`, либо другой внешний клиент, который будет вызывать этот endpoint.
