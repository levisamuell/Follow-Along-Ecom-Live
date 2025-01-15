const ErrorHandler = require('../utils/ErrorHandler.js');
const UserModel = require('../models/user.model.js');
const transporter = require('../utils/sendmail.js');
const jwt = require('jsonwebtoken');
require('dotenv').config({
    path:'../config/.env'
});

 async function CreateUser(req, res){
    const {Name, email, password} = req.body;

    const CheckUserPresent = await UserModel.findOne({
        email:email,
    });

    if(CheckUserPresent){
        const error = new ErrorHandler('Already present in DB', 400);
       return res
       .status(404)
       .send({
        message:error.message,
        status:error.statusCode,
        success:false,
    });
    }

    const newUser = new UserModel({
        Name: Name,
        email: email,
        password: password,
    });

    const data = {
        Name,
        email,
        password,
    }
    const token = generateToken(data)

    await transporter.sendMail({
        to: 'levi.samuel@kalvium.community',
        from: 'levisamuel2005@gmail.com',
        subject: 'verification mail from follow along project',
        text: 'Text',
        html: `<h1>Hello World  http://localhost:5173/activation/${token}</h1>`,
    })

    await newUser.save();

    return res.send('User Created Successfully');
}

const generateToken = (data) => {
    const token = jwt.sign({name: data.name, email: data.email }, process.env.SECRET_KEY);
    return token
};

const verifyUser = (token) => {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    if(verify){
        return verify;
    } else{
        return false;
    }
};

async function verifyUserController(req,res) {
    const {token} = req.params;
    try{
        if(verifyUser(token)){
            return res.status(200).cookie();
        }
        return res.status(403).send({ message: 'token expired' });
    }catch(er){
        return res.status(403).send({ message: er.message });
    }
}

module.exports = {CreateUser, verifyUserController};


