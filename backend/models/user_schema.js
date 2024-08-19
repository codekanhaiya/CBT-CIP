const MyMongoose = require('mongoose');
const MySchema = MyMongoose.Schema;

const UserSchema = new MySchema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const UserModel = MyMongoose.model('users',UserSchema);
module.exports = UserModel;