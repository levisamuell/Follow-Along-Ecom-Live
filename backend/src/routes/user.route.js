const express = require('express');
const  {CreateUser, verifyUserController, login, signup} = require('../controllers/user.controller.js');
const upload = require('../middlewares/multer.js');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/create-user', upload.single('file'), CreateUser);
router.get('/activation/:token', verifyUserController);
router.post('/signup', signup);
router.post('/login', login);



module.exports = router;
