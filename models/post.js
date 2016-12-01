// Загрузим mongoose т.к. нам требуется несколько классов или типов для нашей модели
const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
// Создаем новую схему!
let postSchema = new mongoose.Schema({
	title:{
		type:String, // тип: String
		required:[true,"titleRequired"],
		// Данное поле обязательно. Если его нет вывести ошибку с текстом titleRequired
		// Максимальная длинна 32 Юникод символа (Unicode symbol != byte)
		minlength:[6,"tooShort"],
		unique:true // Оно должно быть уникальным
	},
	text:{
		type:String, // тип String
		
        required:[true,"textRequired"]
		// Думаю здесь все тоже очевидно
	},
	// Здесь будут и другие поля, но сейчас еще рано их сюда ставить!
	// Например коментарии
	// Оценки
	// и тд

	// slug:String
});

// Теперь подключим плагины (внешнии модули)

// Подключим генератор на основе названия
postSchema.plugin(URLSlugs('title'));

// Компилируем и Экспортируем модель
module.exports = mongoose.model('Post',postSchema);
