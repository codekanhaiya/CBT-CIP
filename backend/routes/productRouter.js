const ensureAuthenticated = require('../middlewares/AuthProduct');

const myRouter = require('express').Router();

myRouter.get('/',ensureAuthenticated,(req,res)=>{
    console.log('---------Logged in user deatils-------',req.user);
    res.status(200).json([
        {
            name:"mobile",
            price:1000
        },
        {
            name:"laptop",
            price:40000
        },
    ])
});

module.exports=myRouter;