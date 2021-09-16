const path = require('path');
const util = require('util');
const timeago = require('timeago.js');
const control = {}

control.handleLogin = (req, res) => {
	res.render('login');
};
control.handleUsersDash = (req, res) => {
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
control.handleAuth = (req, res) => {
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
control.handleClass = (req, res) => {
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
		conn.query(
			'SELECT * FROM posts INNER JOIN users ON posts.class = ? AND posts.owner = users.id',
			[req.params.class_id],
			(err, posts) => {
				if (posts.length >= 1) {
					conn.query(`SELECT name FROM classes WHERE id = ${posts[0].class}`, (err, className) => {
						posts.reverse();
						for (const i of posts) {
							var date = timeago.format(i.date, 'es_ES');
							i.date = date;
						}
						res.render('posts', { posts, className: className[0].name });
					});

					
				} else {
					res.render('posts', { posts: [{ content: '', class: req.params.class_id }] });
				}
			}
		);
	});
};
control.handleMyCourses = (req, res) => {
	//res.send(req.session)
	if (!req.session.loggedin) {
		res.redirect('login');
		return;
	}
	req.getConnection((err, conn) => {
		conn.query(
			'SELECT * FROM users_classes INNER JOIN classes ON users_classes.user = ? AND users_classes.class = classes.id',
			[req.session.user.id],
			(err, classes) => {
				if (classes.length == 0) {
					res.render('my-courses', { classes: [] });
				}
				res.render('my-courses', { classes });
			}
		);
	});
};

control.handlePost = (req, res) => {
	if (!req.session.loggedin) {
		res.redirect('/login');
	}
	console.log('req.body: ',(req.body));
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

module.exports = control;