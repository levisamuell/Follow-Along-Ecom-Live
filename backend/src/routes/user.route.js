const express = require('express');
const  {CreateUser, verifyUserController} = require('../controllers/user.controller.js');
const upload = require('../middlewares/multer.js');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/create-user', upload.single('file'), CreateUser);
router.get('/activation/:token', CreateUser.verifyUserController);



module.exports = router;
