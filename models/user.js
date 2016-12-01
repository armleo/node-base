// Загрузим mongoose т.к. нам требуется несколько классов или типов для нашей модели
const mongoose = require('mongoose');
// Создаем новую схему!
let userSchema = new mongoose.Schema({
	// Логин
	username:{
		type:String, // тип: String
		required:[true,"usernameRequired"],
		// Данное поле обязательно. Если его нет вывести ошибку с текстом usernameRequired
		maxlength:[32,"tooLong"],
		// Максимальная длинна 32 Юникод символа (Unicode symbol != byte)
		minlength:[6,"tooShort"],
		// Слишком короткий Логин!
		match:[/^[a-z0-9]+$/,"usernameIncorrect"],
		// Мой любимй формат! ЗАПРЕТИТЬ НИЖНЕЕ ТИРЕ!
		unique:true // Оно должно быть уникальным
	},
	// Пароль
	password:{
		type:String, // тип String
		// В дальнейшем мы добавим сюда хеширование
		maxlength:[32,"tooLong"],
        minlength:[8, "tooShort"],
        match:[/^[A-Za-z0-9]+$/,"passwordIncorrect"],
        required:[true,"passwordRequired"]
		// Думаю здесь все уже очевидно
	},
	// Здесь будут и другие поля, но сейчас еще рано их сюда ставить!
});

// Теперь подключим плагины (внешнии модули)



// Компилируем и Экспортируем модель
module.exports = mongoose.model('User',userSchema);
