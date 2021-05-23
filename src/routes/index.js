const express = require('express');
const { ContextRunnerImpl } = require('express-validator/src/chain');
const router = express.Router();
const path = require('path');
const util = require('util');

handleLogin = (req, res) => {
	res.render('login.html');
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
					res.redirect('login');
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
handlePosts = (req, res) => {
	if (!req.session.loggedin) {
		res.redirect('login');
		return;
	}
	req.getConnection((err, conn) => {
		conn.query('SELECT * FROM posts', (err, posts) => {
			// posts.forEach((post) => {
			// 	conn.query('SELECT fullName FROM users WHERE id = ?', [post.owner], (err, user) => {
			// 		//console.log(user[0].fullName);
			// 		post['ownerName'] = user[0].fullName;
			// 	});

			// });
			for (let i = 0; i < posts.length; i++) {
				conn.query('SELECT fullName FROM users WHERE id = ?', [posts[i].owner], (err, user) => {
					posts[i]['ownerName'] = user[0].fullName;
					if (i == posts.length - 1) {
						res.render('posts', { posts });
						console.log('post = ', JSON.stringify(posts));
					}
				});
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
			console.log(classes);
			console.log(req.session);
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

//routing
router.get('/login', handleLogin);
router.post('/auth', handleAuth);
router.get('/admin/usersdashboard', handleUsersDash);
router.get('/posts', handlePosts);
router.get('/', handleMyCourses);

module.exports = router;
