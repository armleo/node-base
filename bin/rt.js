const Logger = require('../logger');
const logger = new Logger();

module.exports = function(req,res,next)
{
	// Засечь начало
	let beginTime = Date.now();
	// В конце ответа
	res.on('finish',()=>{
		let d =  Date.now();// получить дату в мс
		logger.log('Reponse time: ' + (d - beginTime),{
			url:req.url, // записать в лог куда пришел запрос (Включает urlencode string :)
			time:(d - beginTime) // сколько прошло времени
		});
	});
	// Передать действие другому обработчику
	next();
}