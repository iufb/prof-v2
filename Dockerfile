# Используем базовый образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN yarn --frozen-lockfile

# Копируем остальной код приложения
COPY . .

# Создаем .env файл из переменной окружения
# Переменные окружения должны быть переданы на этапе сборки
ARG NEXT_PUBLIC_BACKENDURL
RUN echo "NEXT_PUBLIC_BACKENDURL=\"$NEXT_PUBLIC_BACKENDURL\"" > .env


# Собираем проект (если необходимо)
RUN yarn run build

# Экспонируем порт, который будет использоваться приложением
EXPOSE 3000

CMD ["yarn","start"]
