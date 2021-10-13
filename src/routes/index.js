const express = require('express');
const { ContextRunnerImpl } = require('express-validator/src/chain');
const router = express.Router();
const control = require('../controllers/index')

//routing

router.get('/login', control.handleLogin);
router.post('/auth', control.handleAuth);
//router.get('/admin/usersdashboard', control.handleUsersDash);
router.get('/class/:class_id', control.handleClass);
router.get('/', control.handleMyCourses);
router.post('/post/:class', control.handlePost);
// router.get('/admin', control.handleLogin);//---login
router.post('admin/auth', control.handleAdminAuth);
router.get('/admin/user', control.handleAdminUser);//---Usuario
router.post('/admin/userI', control.handleAdminUserI);
router.post('/admin/userU', control.handleAdminUserU);
router.get('/admin/createU', control.handleAdminCreateU);
router.get('/admin/updateU/:id', control.handleAdminUpdateU);
router.get('/admin/deleteU/:id', control.handleAdminDeleteU);
router.get('/admin/asignaturas', control.handleAdminAsignaturas); //---Asignatura
router.post('/admin/asignaturaI', control.handleAdminAsignaturaI);
router.post('/admin/asignaturaU/', control.handleAdminAsignaturaU);
router.get('/admin/createA', control.handleAdminCreateA);
router.get('/admin/updateA/:id', control.handleAdminUpdateA);
router.get('/admin/deleteA/:id', control.handleAdminDeleteA);
router.get('/admin/actividades', control.handleAdminActividades);//--Actividades
router.post('/admin/actividadI', control.handleAdminActividadI);
router.post('/admin/actividadU', control.handleAdminActividadU);
router.get('/admin/createAc', control.handleAdminCreateAc);
router.get('/admin/updateAc/:id', control.handleAdminUpdateAc);
router.get('/admin/deleteAc/:id', control.handleAdminDeleteAc);
router.get('/admin/notas', control.handleAdminNotas); //--Notas
router.post('/admin/notasI', control.handleAdminNotasI);
router.post('/admin/notasU', control.handleAdminNotasU);
router.get('/admin/createN', control.handleAdminCreateN);
router.get('/admin/updateN/:user', control.handleAdminUpdateN);
router.get('/admin/deleteN/:user', control.handleAdminDeleteN);
router.get('/admin/dashboard', control.handleAdminDashboard);
router.get('/admin/logout', control.handleLogout);

//router.get('*', control.handle404)
// router.get('/error',control.handleError); // falta por mejorar o cambiar el template

module.exports = router;
