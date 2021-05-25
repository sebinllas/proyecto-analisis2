const express = require('express');
const { ContextRunnerImpl } = require('express-validator/src/chain');
const router = express.Router();
const path = require('path');
const util = require('util');

handleLogin = (req, res) => {
	res.render('login');
};
handleUsersDash = (req, res) => {
	if (!req.session.loggedin) {
		res.redirect('login');
		return;
	}
	req.getConnection((err, conn) => {
		conn.query('SELECT * FROM users', (err, users) => {
			if (err) {
				res.json(err);
			}
			console.log(users);
			res.render('users', { data: users });
		});
	});
};
handleAuth = (req, res) => {
	const data = req.body;
	//console.log(data);
	req.getConnection((err, conn) => {
		const query = conn.query(
			'SELECT * FROM users WHERE  userName = ? AND password = ?',
			[data.userName, data.password],
			(err, user) => {
				if (user[0] == undefined) {
					res.render('login', {
						alert: true,
						alertTitle: 'Error',
						alertMessage: 'USUARIO y/o PASSWORD incorrectas',
						alertIcon: 'error',
						showConfirmButton: true,
						timer: false,
						ruta: 'login',
					});
				} else {
					req.session.loggedin = true;
					req.session.user = {
						id: user[0].id,
						userName: user[0].userName,
						fullName: user[0].fullName,
						email: user[0].email,
						role: user[0].role,
					};
					//res.send(`funcionó! jejejeje ${JSON.stringify(user[0])}`);
					res.redirect('/');
				}
			}
		);
	});
};
handleClass = (req, res) => {
	if (!req.session.loggedin) {
		res.redirect('/login');
	}
	req.getConnection((err, conn) => {
		conn.query(
			'SELECT * FROM users_classes WHERE user = ? AND class = ?',
			[req.session.user.id, req.params.class_id],
			(err, user_class) => {
				if (user_class.length < 1) {
					res.redirect('/');
				}
			}
		);
		conn.query('SELECT * FROM posts WHERE class = ?', [req.params.class_id], (err, posts) => {
			if (posts.length >= 1) {
				for (let i = 0; i < posts.length; i++) {
					conn.query('SELECT fullName FROM users WHERE id = ?', [posts[i].owner], (err, user) => {
						posts[i]['ownerName'] = user[0].fullName;
						if (i == posts.length - 1) {
							res.render('posts', { posts });
						}
					});
				}
			} else {
				res.render('posts', { posts: [{ content: '', class: req.params.class_id }] });
			}

			//res.send('estos son los posts\n' + JSON.stringify(posts));
		});
	});
};
handleMyCourses = (req, res) => {
	//res.send(req.session)
	if (!req.session.loggedin) {
		res.redirect('login');
		return;
	}
	req.getConnection((err, conn) => {
		conn.query('SELECT class FROM users_classes WHERE user = ?', [req.session.user.id], (err, classes) => {
			// conn.query('SELECT * FROM classes WHERE id = ')
			//console.log('classes = ',classes, classes.length);
			console.log(req.session);
			if (classes.length == 0) {
				res.render('my-courses', { allClasses: [] });
			}
			var allClasses = [];
			for (let i = 0; i < classes.length; i++) {
				console.log(classes[i].class);
				conn.query('SELECT * FROM classes WHERE id = ? ', [classes[i].class], (err, cls) => {
					console.log(JSON.stringify(cls[0]));
					allClasses[i] = cls[0];
					if (i == classes.length - 1) {
						console.log(allClasses);
						res.render('my-courses', { allClasses: allClasses });
					}
				});
			}
		});
	});
};

handlePost = (req, res) => {
	console.log(req.body);
	console.log(req.params);
	req.getConnection((err, conn) => {
		conn.query(
			'INSERT INTO `posts`(`id`, `content`, `owner`, `class`) VALUES (?, ?, ?, ?)',
			['NULL', req.body.message, req.session.user.id, parseInt(req.params.class)],
			(err, post) => {
				console.log(err);
				console.log(post);
				res.redirect(`/class/${req.params.class}`);
			}
		);
	});
};

//routing
router.get('/login', handleLogin);
router.post('/auth', handleAuth);
router.get('/admin/usersdashboard', handleUsersDash);
router.get('/class/:class_id', handleClass);
router.get('/', handleMyCourses);
router.post('/post/:class', handlePost);

module.exports = router;
