# Используем базовый образ
FROM node:20

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
ARG NEXT_PUBLIC_BACKENDURL
RUN echo "NEXT_PUBLIC_BACKEND_URL=\"$NEXT_PUBLIC_BACKENDURL\"" > .env


# Собираем проект (если необходимо)
RUN npm run build

# Экспонируем порт, который будет использоваться приложением
EXPOSE 3000

CMD ["npm","run","start"]
