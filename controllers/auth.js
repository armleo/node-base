let app = new (require('express').Router)();
// Создадим роутер
const models = require('./../models');
// Загрузим модели
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

// Инициализация паспорта

passport.use(new LocalStrategy(
	function(username, password, done) {
		models.User.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (user.password != password) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}
));
// Сериализация паспорта
passport.serializeUser(function(user, done) {
  	done(null, user._id);
});
// ДеСериализация паспорта
passport.deserializeUser(function(id, done) {
	models.User.findById(id, function(err, user) {
		done(err, user);
	});
});
// Конттроллер
app.post('/login',
  	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
    })
);
// Образ
app.get('/login',function(req,res,next)
{
	if(req.user) return res.redirect('/');
	// Пропускать только неафторизованных
	res.render('login',{
		user:req.user
	});
});

module.exports = app;
