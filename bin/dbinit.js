// Инициализация датабазы!
// Загрузим mongoose
const mongoose = require('mongoose');
// Заменим библиотеку Обещаний (Promise) которая идет в поставку с mongoose (mpromise)
mongoose.Promise = require('bluebird');
// На Bluebird
const Logger = require('../logger');
const logger = new Logger(); //  Загрузить логгер!

// Подключимся к серверу MongoDB
const config = require('../config');
mongoose.connect(config.mongoUri,{
    server:{
        poolSize: 10
		// Поставим количество подключений в пуле
		// 10 рекомендуемое количество для моего проекта.
		// Вам возможно понадобится и то меньше...
    }
});

// В случае ошибки будет вызвано данная функция
mongoose.connection.on('error',(err)=>
{
    logger.error("Database Connection Error: " + err);
    // Скажите админу пусть включит MongoDB сервер :)
	logger.error('Админ сервер MongoDB Запусти!');
	process.exit(2);
});

// Данная функция будет вызвано когда подключение будет установлено
mongoose.connection.on('connected',()=>
{
	// Подключение установлено
    logger.info("Succesfully connected to MongoDB Database");
	// В дальнейшем здесь мы будем запускать сервер.
});
require('./../models'); // Попытка проиницилизировать модели (скомпилировать)
