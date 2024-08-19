const { signup, login, getUsers, newPass} = require('../controllers/AuthController');
const { signupValidation, loginValidation } = require('../middlewares/AuthValidation');

const myRouter = require('express').Router();

// myRouter.post('/login',(req,res) => {
//     res.send('login success');
// });
myRouter.post('/signup',signupValidation, signup);
myRouter.post('/login',loginValidation, login);
myRouter.post('/password',newPass);
myRouter.post('/users', getUsers);
module.exports=myRouter;