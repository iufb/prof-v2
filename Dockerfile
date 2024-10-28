# Используем базовый образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости и проверяем на ошибки
RUN echo "Installing dependencies..." && \
    yarn --frozen-lockfile || { echo "Dependency installation failed"; exit 1; }

# Копируем остальной код приложения
COPY . .

# Создаем .env файл из переменной окружения
ARG NEXT_PUBLIC_BACKENDURL
RUN echo "NEXT_PUBLIC_BACKENDURL=\"$NEXT_PUBLIC_BACKENDURL\"" > .env || { echo "Failed to create .env file"; exit 1; }

# Собираем проект и проверяем на ошибки
RUN echo "Building project..." && \
    yarn run build || { echo "Build failed"; exit 1; }

# Экспонируем порт, который будет использоваться приложением
EXPOSE 3000

# Запускаем приложение
CMD ["yarn", "start"]
