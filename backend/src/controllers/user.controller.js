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

const signup = async (req, res) => {
    const { Name, email, password } = req.body;
    console.log(req.body);
    try {
      const checkUserPresentInDB = await UserModel.findOne({ email: email });
      if (checkUserPresentInDB) {
        return res.status(403).send({ message: "User already present" });
      }
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          return res
            .status(403)
            .send({ message: "Please enter the password..." });
        }
  
        await UserModel.create({
          Name: Name,
          email: email,
          password: hash,
        });
      });
  
      return res.status(201).send({ message: "User created sucessfully" });
    } catch (er) {
      return res.status(500).send({ message: er.message });
    }
  };
  
  const login = async (req, res) => {
    try {
      const { Name, email, password } = req.body;
      const checkUserPresentInDB = await UserModel.findOne({ email: email });
      if (checkUserPresentInDB) {
        bcrypt.compare(
          password,
          checkUserPresentInDB.password,
          function (err, result) {
            if (err) {
              return res
                .status(403)
                .send({ message: er.message, success: false });
            }
  
            let data = {
              id: checkUserPresentInDB._id,
              email,
              password: checkUserPresentInDB.password,
            };
  
            const token = generateToken(data);
  
            return res
              .status(200)
              .cookie("token", token)
              .send({ message: "User logged in sucessfully..", success: true });
          }
        );
      }
  
      return res
        .status(403)
        .send({ message: "User not found...", success: false });
    } catch (er) {
      return res.status(403).send({ message: er.message, success: false });
    }
  };


module.exports = {CreateUser, verifyUserController, login, signup};


