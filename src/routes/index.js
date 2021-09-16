const express = require('express');
const { ContextRunnerImpl } = require('express-validator/src/chain');
const router = express.Router();
const control = require('../controllers/index')

//routing
router.get('/login', control.handleLogin);
router.post('/auth', control.handleAuth);
router.get('/admin/usersdashboard', control.handleUsersDash);
router.get('/class/:class_id', control.handleClass);
router.get('/', control.handleMyCourses);
router.post('/post/:class', control.handlePost);

module.exports = router;
