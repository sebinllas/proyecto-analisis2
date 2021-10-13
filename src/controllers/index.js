const path = require('path');
const util = require('util');
var moment = require('moment');
const timeago = require('timeago.js');
const edjsHTML = require("editorjs-html");
const edjsParser = edjsHTML();
const control = {}

control.handle404 = (req, res) =>{
	res.render('error404.html')
}

control.handleLogin = (req, res) => {
	if (req.session.loggedin) {
		control.handleClass(req, res);
	}
	res.render('login');
};
control.handleUsersDash = (req, res) => {
	if (!req.session.loggedin) {
		res.redirect('/login');
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
					console.log('-------------->',user);
					req.session.loggedin = true;
					req.session.user = {
						id: user[0].id,
						userName: user[0].userName,
						fullName: user[0].fullName,
						email: user[0].email,
						role: user[0].role,
					};
					
					//res.send(`funcionó! jejejeje ${JSON.stringify(user[0])}`);
					console.log(req.session.user.role);
					if (req.session.user.role === "admin") {
						res.redirect("/admin/dashboard");
					} else {
						res.redirect('/');
					}

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
					conn.query(`SELECT name FROM classes WHERE id = ${req.params.class_id}`, (err, className) => {
						posts.reverse();
						for (const i of posts) {
							var date = timeago.format(i.date, 'es_ES');
							let content = '';
							try {
								// console.log("parsed JSON: ", JSON.parse(i.content).blocks);
								// console.log('Blocks parsed to html: ', edjsParser.parse(JSON.parse(i.content)));
								for (const block of edjsParser.parse(JSON.parse(i.content))) {
									if (typeof (block) === 'string') {
										content += block
									}
								}
							} catch (e) {
								
								content = `<p>${i.content}</p>`
							}
							i.date = date;
							i.content = content;
						}
						res.render('posts', { posts, className: className[0].name });
					});


				} else {
					console.log("clase sin posts");
					res.render('posts', { posts: [{ content: '', class: req.params.class_id, className: req.params.class_id, }] });
				}
			}
		);
	});
};
control.handleMyCourses = (req, res) => {
	//res.send(req.session)
	if (!req.session.loggedin) {
		res.redirect('/login');
		return;
	}
	req.getConnection((err, conn) => {
		conn.query(
			'SELECT * FROM users_classes INNER JOIN classes' +
			' ON users_classes.user = ? AND users_classes.class = classes.id' +
			' INNER JOIN schedules ON schedules.id = classes.schedule',
			[req.session.user.id],
			(err, classes) => {
				if (classes.length == 0) {
					res.render('my-courses', { classes: [] });
				}
				console.log(classes);
				let days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
				let schedule = {}
				for (const class_ of classes) {

					for (const day of days) {
						console.log(class_[day]);
						if (class_[day]) {
							for (let i = 0; i < class_.duration; i++) {
								//console.log(moment(class_.init_hour, 'HH:mm:ss' ).add(i, 'hour').hour());
								let time = moment(class_.init_hour, 'HH:mm:ss').add(i, 'hours');
								//console.log(time.format('HH:mm'))
								if (!schedule[time.format('HH:mm')]) {
									schedule[time.format('HH:mm')] = {}
								}

								schedule[time.format('HH:mm')][day] = class_.name;
							}

						}
					}
				} console.log(schedule)
				res.render('my-courses', { data: { 'classes': classes, 'schedule': schedule } });
			}
		);
	});
};

control.handlePost = (req, res) => {
	if (!req.session.loggedin) {
		res.redirect('/login');
	}
	req.getConnection((err, conn) => {
		conn.query(
			'INSERT INTO `posts`(`id`, `content`, `owner`, `class`) VALUES (?, ?, ?, ?)',
			['NULL', req.body.message, req.session.user.id, parseInt(req.params.class)],
			(err, post) => {
				console.log(err);
				console.log('form body-------------->',req.body);
				console.log('post-------------->',post);
				res.redirect(`/class/${req.params.class}`);
			}
		);
	});
};

control.handleCourseActivities = (req, res) => {
	if (!req.session.loggedin) {
		res.redirect('/login');
	}
	req.getConnection((err, conn) => {
		conn.query(
			'SELECT * from ',
			['NULL', req.body.message, req.session.user.id, parseInt(req.params.class)],
			(err, post) => {
				console.log(err);
				console.log(post);
				res.redirect(`/class/${req.params.class}`);
			}
		);
	});

}

//Panel de Administracion

///////////////----------------Usuario
control.handleAdminUser = (req, res) => {

	if (req.session.loggedin) {
		req.getConnection((err, conn) => {
			conn.query('SELECT * FROM users', (err, users) => {
				if (err) {
					res.json(err);
				}
				res.render('admin/Auser', { login: true, data: users });

			});
		});

	} else {
		res.redirect('/login');
	}
};

control.handleAdminCreateU = (req, res) => {
	if (req.session.loggedin) {
		res.render('admin/AcreateU', {
			login: true,
		});
	} else {
		res.redirect('/login');
	}
};
control.handleAdminUpdateU = (req, res) => {
	if (req.session.loggedin) {
		const id = req.params.id;
		req.getConnection((err, conn) => {
			conn.query('SELECT * FROM users WHERE id= ?', [id], (err, users) => {
				if (err) {
					res.json(err);
				}
				res.render('admin/AupdateU', { login: true, data: users[0] });

			});
		});


	} else {
		res.redirect('/login');
	}
};

control.handleAdminDeleteU = (req, res) => {
	const id = req.params.id;
	if (req.session.loggedin) {
		const newCustomer = req.body;
		req.getConnection((err, conn) => {
			conn.query(
				'DELETE FROM users WHERE id = ?', [id],
				(err, post) => {
					console.log(err);
					res.redirect('/admin/user');
				}
			);
		});

	} else {
		res.redirect('/login');
	}
};

control.handleAdminUserI = (req, res) => {

	if (req.session.loggedin) {
		req.getConnection((err, conn) => {
			conn.query(
				'INSERT INTO `users`(`id`, `userName`, `fullName`, `email` , `password`, `role`) VALUES (?, ?, ?, ?, ?, ?)',
				['NULL', req.body.usuario, req.body.nombre, req.body.email, req.body.password, req.body.role],
				(err, post) => {
					console.log(err);
					res.redirect('/admin/user');
				}
			);
		});

	} else {
		res.redirect('/login');
	}
};

control.handleAdminUserU = (req, res) => {
	const datos = req.body;
	if (req.session.loggedin) {

		req.getConnection((err, conn) => {
			conn.query(
				'UPDATE users SET ? WHERE id = ?', [{ userName: datos.usuario, fullName: datos.nombre, email: datos.email, password: datos.password, role: datos.role }, req.body.id],
				(err, post) => {
					console.log(err);
					res.redirect('/admin/user');
				}
			);
		});

	} else {
		res.redirect('/login');
	}
};

///////////////----------------Asignaturas
control.handleAdminAsignaturas = (req, res) => {
	if (req.session.loggedin) {
		req.getConnection((err, conn) => {
			conn.query('SELECT * FROM classes', (err, info) => {
				if (err) {
					res.json(err);
				}
				res.render('admin/Aasignaturas', { login: true, data: info });

			});
		});

	} else {
		res.redirect('/login');
	}
};

control.handleAdminCreateA = (req, res) => {
	if (req.session.loggedin) {
		const role = 'profesor';
		req.getConnection((err, conn) => {
			conn.query('SELECT * FROM users WHERE role = ?', [role], (err, info) => {
				if (err) {
					res.json(err);
				}
				res.render('admin/AcreateA', {
					login: true,
					data: info
				});

			});
		});


	} else {
		res.redirect('/login');
	}
};

control.handleAdminUpdateA = (req, res) => {
	if (req.session.loggedin) {
		const id = req.params.id;

		req.getConnection((err, conn) => {
			conn.query('SELECT * FROM classes WHERE id= ?', [id], (err, users) => {
				if (err) {
					res.json(err);
				}

				res.render('admin/AupdateA', {
					login: true,
					data: users[0]

				});

			});
		});


	} else {
		res.redirect('/login');
	}
};

control.handleAdminDeleteA = (req, res) => {
	const id = req.params.id;
	if (req.session.loggedin) {
		req.getConnection((err, conn) => {
			conn.query(
				'DELETE FROM classes WHERE id = ?', [id],
				(err, post) => {
					console.log(err);
					res.redirect('/admin/asignaturas');
				}
			);
		});

	} else {
		res.redirect('/login');
	}
};

control.handleAdminAsignaturaI = (req, res) => {
	if (req.session.loggedin) {
		const d = req.body;
		req.getConnection((err, conn) => {
			conn.query(
				'INSERT INTO `classes`(`id`, `name`, `teacher`,`group`, `hour`, `days`) VALUES (?, ?, ?, ?, ?, ?)',
				['NULL', d.nombre, d.profesor, d.grupo, d.hora, d.dia],
				(err, post) => {
					console.log(err);
					res.redirect('/admin/asignaturas');
				}
			);
		});

	} else {
		res.redirect('/login');
	}
};

control.handleAdminAsignaturaU = (req, res) => {

	if (req.session.loggedin) {
		req.getConnection((err, conn) => {
			conn.query(
				'UPDATE classes SET ? WHERE id = ?', [{ name: req.body.nombre, teacher: req.body.profesor, group: req.body.grupo, hour: req.body.hora, days: req.body.dia }, req.body.id],
				(err, post) => {
					console.log(err);
					res.redirect('/admin/asignaturas');
				}
			);
		});

	} else {
		res.redirect('/login');
	}
};

///////--------Actvidades

control.handleAdminActividades = (req, res) => {

	if (req.session.loggedin) {
		req.getConnection((err, conn) => {
			conn.query('SELECT * FROM activities', (err, users) => {
				if (err) {
					res.json(err);
				}
				res.render('admin/Aactividades', { login: true, data: users });

			});
		});

	} else {
		res.redirect('/login');
	}
};

control.handleAdminCreateAc = (req, res) => {
	if (req.session.loggedin) {
		res.render('admin/AcreateAc', {
			login: true,
		});
	} else {
		res.redirect('/login');
	}
};
control.handleAdminUpdateAc = (req, res) => {
	if (req.session.loggedin) {
		const id = req.params.id;
		req.getConnection((err, conn) => {
			conn.query('SELECT * FROM activities WHERE id= ?', [id], (err, users) => {
				if (err) {
					res.json(err);
				}
				res.render('admin/AupdateAc', { login: true, data: users[0] });

			});
		});


	} else {
		res.redirect('/login');
	}
};

control.handleAdminDeleteAc = (req, res) => {
	const id = req.params.id;
	if (req.session.loggedin) {
		const newCustomer = req.body;
		req.getConnection((err, conn) => {
			conn.query(
				'DELETE FROM activities WHERE id = ?', [id],
				(err, post) => {
					console.log(err);
					res.redirect('/admin/actividades');
				}
			);
		});

	} else {
		res.redirect('/login');
	}
};

control.handleAdminActividadI = (req, res) => {

	if (req.session.loggedin) {
		req.getConnection((err, conn) => {
			conn.query(
				'INSERT INTO `activities`(`id`, `name`, `description`, `class` , `post`, `init_date`,`deadline`) VALUES (?, ?, ?, ?, ?, ?,?)',
				['NULL', req.body.nombre, req.body.descripcion, req.body.clase, req.body.post, req.body.fechai, req.body.fechaf],
				(err, post) => {
					console.log(err);
					res.redirect('/admin/actividades');
				}
			);
		});

	} else {
		res.redirect('/login');
	}
};

control.handleAdminActividadU = (req, res) => {

	if (req.session.loggedin) {
		req.getConnection((err, conn) => {
			conn.query(
				'UPDATE activities SET ? WHERE id = ?', [{ name: req.body.nombre, description: req.body.descripcion, class: req.body.clase, post: req.body.post, init_date: req.body.fechai, deadline: req.body.fechaf }, req.body.id],
				(err, post) => {
					console.log(err);
					res.redirect('/admin/actividades');
				}
			);
		});

	} else {
		res.redirect('/login');
	}
};


///////////-----------Notas
control.handleAdminNotas = (req, res) => {

	if (req.session.loggedin) {
		req.getConnection((err, conn) => {
			conn.query('SELECT * FROM users_classes', (err, users) => {
				if (err) {
					res.json(err);
				}
				res.render('admin/ANotas', { login: true, data: users });

			});
		});

	} else {
		res.redirect('/login');
	}
};

control.handleAdminCreateN = (req, res) => {
	if (req.session.loggedin) {
		res.render('admin/AcreateN', {
			login: true,
		});
	} else {
		res.redirect('/login');
	}
};

control.handleAdminUpdateN = (req, res) => {
	if (req.session.loggedin) {
		const id = req.params.user;
		req.getConnection((err, conn) => {
			conn.query('SELECT * FROM users_classes WHERE user= ?', [id], (err, users) => {
				if (err) {
					res.json(err);
				}
				res.render('admin/AupdateN', { login: true, data: users[0] });

			});
		});


	} else {
		res.redirect('/login');
	}
};

control.handleAdminDeleteN = (req, res) => {
	const id = req.params.user;
	if (req.session.loggedin) {
		const newCustomer = req.body;
		req.getConnection((err, conn) => {
			conn.query(
				'DELETE FROM users_classes WHERE user = ?', [id],
				(err, post) => {
					console.log(err);
					res.redirect('/admin/notas');
				}
			);
		});

	} else {
		res.redirect('/login');
	}
};

control.handleAdminNotasI = (req, res) => {

	if (req.session.loggedin) {
		req.getConnection((err, conn) => {
			conn.query(
				'INSERT INTO `users_classes`(`user`, `class`, `qualifications`) VALUES (?, ?, ?)',
				[req.body.usuario, req.body.clase, req.body.calificacion],
				(err, post) => {
					res.redirect('/admin/notas');
				}
			);
		});

	} else {
		res.redirect('/login');
	}
};

control.handleAdminNotasU = (req, res) => {

	if (req.session.loggedin) {
		req.getConnection((err, conn) => {
			conn.query(
				'UPDATE users_classes SET ? WHERE user = ?', [{ user: req.body.usuario, class: req.body.clase, qualifications: req.body.calificacion }, req.body.usuario],
				(err, post) => {
					console.log(err);
					res.redirect('/admin/notas');
				}
			);
		});

	} else {
		res.redirect('/login');
	}
};


////////////----------------Otro
control.handleAdminDashboard = (req, res) => {
	if (req.session.loggedin) {
		res.render('admin/Adashboard', {
			login: true,

		});
	} else {
		res.redirect('/login');
	}

};


control.handleAdminAuth = (req, res) => {
	const data = req.body;
	const role = 'admin';
	//console.log(data);
	req.getConnection((err, conn) => {
		const query = conn.query(
			'SELECT * FROM users WHERE  userName = ? AND password = ? AND role = ?',
			[data.userAdmin, data.password, role],
			(err, user) => {
				if (user[0] == undefined) {
					res.render('admin/admin', {
						alert: true,
						alertTitle: 'Error',
						alertMessage: 'Usuario o contraseña incorrectos',
						alertIcon: 'error',
						showConfirmButton: true,
						timer: 4000,
						ruta: 'admin',
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
					res.redirect('/admin/dashboard');

				}

			}
		);
	});
};

control.handleLogout = (req, res) => {
	req.session.loggedin = false;
	res.redirect('/login');

};
module.exports = control;