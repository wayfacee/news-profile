const fs = require("fs");
const jsonServer = require("json-server");
const path = require("path");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, "db.json"));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const TOKEN_EXPIRATION = "1000y"; // Время жизни токена

const blacklistedTokens = new Set();

// Имитация задержки для реалистичности API
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800);
  });
  next();
});

// Функция для генерации токена
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: TOKEN_EXPIRATION,
  });
};

// Эндпоинт для получения данных профиля
server.get("/profile", (req, res) => {
  try {
    // Извлекаем токен из заголовка Authorization
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res.status(403).json({ message: "AUTH ERROR: Token missing" });
    }

    // Проверяем и расшифровываем токен
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "AUTH ERROR: Invalid token" });
      }

      // Извлекаем userId из расшифрованного токена
      const userId = decoded.id;

      // Читаем данные из базы
      const db = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
      );
      const { profile = [] } = db;

      // Ищем профиль пользователя по userId
      const profileData = profile.find((item) => item.id === userId);

      if (!profileData) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res.json({
        id: userId,
        name: profileData.name || decoded.username,
        username: decoded.username,
        email: profileData.email || "",
        city: profileData.city || "",
        companyName: profileData.companyName || "",
      });
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
});

// Эндпоинт для получения новостей
// server.get("/news", (req, res) => {
//   try {
//     // Читаем данные из базы
//     const db = JSON.parse(
//       fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8")
//     );
//     const { news = [] } = db;

//     // Возвращаем массив новостей
//     res.json(news);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ message: "Не удалось загрузить новости" });
//   }
// });

server.get("/news", (req, res) => {
  try {
    // Читаем данные из базы
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
    );
    const { news = [] } = db;

    // Извлекаем параметры пагинации
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);

    // Если параметры не указаны, возвращаем все данные
    if (!page || !limit) {
      return res.json(news);
    }

    // Рассчитываем начальный и конечный индекс для пагинации
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Разбиваем массив новостей на страницы
    const paginatedNews = news.slice(startIndex, endIndex);

    // Возвращаем только новости
    res.json(paginatedNews);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Не удалось загрузить новости" });
  }
});

// Эндпоинт для логина
server.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
    );
    const { users = [] } = db;

    const userFromDb = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (userFromDb) {
      const token = generateToken(userFromDb); // Генерация токена

      // Получаем данные профиля пользователя для возвращения их в ответе
      const profileData = db.profile.find(
        (profile) => profile.id === userFromDb.id,
      );

      return res.json({
        access_token: token,
        user: {
          id: userFromDb.id,
          name: profileData?.name || userFromDb.username,
          username: userFromDb.username,
          email: profileData?.email || "",
          city: profileData?.city || "",
          companyName: profileData?.companyName || "",
        },
      });
    }

    return res.status(403).json({ message: "User not found" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// Эндпоинт для логаута
server.post("/logout", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "AUTH ERROR: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  // Проверяем токен
  jwt.verify(token, SECRET_KEY, (err) => {
    if (err) {
      return res.status(403).json({ message: "AUTH ERROR: Invalid token" });
    }

    // Добавляем токен в чёрный список
    blacklistedTokens.add(token);
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// Middleware для проверки токена
server.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "AUTH ERROR: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "AUTH ERROR: Invalid token" });
    }

    req.user = decoded; // Добавляем расшифрованные данные в запрос
    next();
  });
});

// Подключаем маршруты JSON Server
server.use(router);

// Запуск сервера
server.listen(8000, () => {
  console.log("server is running on port 8000");
});
