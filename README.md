# Проект: Бэкенд Mesto. Каркас API Mesto
[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&width=600&lines=%D0%9F%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8%D1%81%D1%8C+%D0%BA%D1%80%D0%B0%D1%81%D0%BE%D1%82%D0%BE%D0%B9+%D0%BC%D0%B5%D1%81%D1%82%2C+%D0%B3%D0%B4%D0%B5+%D1%82%D1%8B+%D0%B1%D1%8B%D0%BB!)](https://git.io/typing-svg)

## О проекте

Серверная часть проекта Место. В этом проекте люди размещают разные фотографии (от красивых мест до котиков), а другие люди могу лайкнуть их. 

### Функциональность API


- Регистрация пользователя
- Авторизация пользователя
- Редактирование профиля
- Получение списка фотографий
- Добавление фотографий
- Удаление своих фотографий
- Лайки фотографий



### Стэк
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)


- mongoose
- jsonwebtoken
- bcrypt
  


### API
- POST /signup
- POST /login
- POST /cards
- PATCH /users/me
- PATCH /users/me/avatar
- PUT /cards/:id/likes
- GET /cards
- GET /users/me
- DEL /cards/:id/likes
- DEL /cards/:id


### Запуск
- Установка всех зависимостей: npm i
- Запустить сервер Mongodb
- Запуск: npm run start


