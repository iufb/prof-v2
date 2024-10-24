# Используем базовый образ
FROM node:22

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код приложения
COPY . .

# Создаем .env файл из переменной окружения
# Переменные окружения должны быть переданы на этапе сборки
ARG NEXT_PUBLIC_BACKEND_URL
RUN echo "NEXT_PUBLIC_BACKENDURL=\"$NEXT_PUBLIC_BACKENDURL\"" > .env


# Собираем проект (если необходимо)
RUN npm run build

# Экспонируем порт, который будет использоваться приложением
EXPOSE 3000

CMD ["npm","run","start"]
