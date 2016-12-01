let app = new (require('express').Router)();
const models = require("../models");

app.get('/post', function(req,res,next)
{
	if(!req.user) return res.redirect('/login');
	res.render('addpost',{
		user:req.user
	});
});

app.post('/post', function(req, res, next)
{
	if(!req.user) return res.redirect('/login');
	let post = new models.Post(req.body);
	post.save()
		.then(()=>{
			res.redirect('/post/' + post.slug);
		}).catch(next);
});

app.get('/post/:slug',(req, res, next)=>{
	models.Post.findOne({
		slug:req.params.slug
	}).exec().then((post)=>{
		if(!post) res.redirect('/#notfound');
		res.render('post',{
			user:req.user,
			post
		});
	}).catch(next);
});

module.exports = app;
