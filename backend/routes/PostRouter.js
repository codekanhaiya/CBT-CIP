const { post, getPost, delPost, cmt, getCmt, delCmt, mypost} = require('../controllers/AuthController');
const myRouter = require('express').Router();

// myRouter.post('/newpost',(req,res) => {
//     res.send('post success');
// });
myRouter.post('/newpost',post);
myRouter.post('/myposts',getPost);
myRouter.post('/',getPost);
myRouter.delete('/post',delPost);

myRouter.post('/msg',cmt);
myRouter.post('/mymsgs',getCmt);
myRouter.delete('/msgs',delCmt);

myRouter.post('/get',mypost)

module.exports=myRouter;