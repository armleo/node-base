const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session'); // Сессии
const MongoStore = require('connect-mongo')(session); // Хранилище сессий в монгодб
const cons = require('consolidate');
const config = require('../config');
const Logger = require('../logger');
const logger = new Logger(); //  Загрузить логгер!
require('./dbinit'); // Инициализация датабазы
// Загрузим express
let app = express();
// Создадим новый сервер
// Время ответа
app.use(require('./rt'));
// Промонтировать файлы из project/public в наш сайт по адресу /public
app.use('/public',express.static(path.join(__dirname,'../public')));


// Парсер Куки!
app.use(require('cookie-parser')());
// Теперь сессия
// поставить хендлер для сессий
app.use(session({
    secret: 'Химера Хирера',
    // Замените на что нибудь
    resave: false,
    // Пересохранять даже если нету изменений
    saveUninitialized: true,
    // Сохранять пустые сессии
    store: new MongoStore({ mongooseConnection: require('mongoose').connection })
    // Использовать монго хранилище
}));
// JSON Парсер :)
app.use(bodyParser.json({
    limit:"10kb"
}));
app.use(bodyParser.urlencoded({
    extended:true
}));
// Используем движок усов
app.engine('html', cons.mustache);
// установить движок рендеринга
app.set('view engine', 'html');
// папка с образами
app.set('views', __dirname + '/../views');

app.use(require('./../controllers')); // Монтируем контроллеры!


// Обработчик ошибок
app.use(require('./errorHandler'));


// Запустим сервер на порту 3000 и сообщим об этом в консоли.
// Все Worker-ы  должны иметь один и тот же порт
app.listen(config.port, function(err){
	if(err) throw err;
	// Если есть ошибка сообщить об этом
	logger.log(`Running server at port ${config.port}!`);
	// Иначе сообщить что мы успешно соединились с мастером
	// И ждем сообщений от клиентов
});
