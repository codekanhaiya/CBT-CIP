const MyMongoose = require('mongoose');
const MySchema = MyMongoose.Schema;

const PostSchema = new MySchema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    author_id:{
        type:String,
        required:true,
    },
    image:{
        type:String
    }
}, {timestamps:true})

const PostModel = MyMongoose.model('posts',PostSchema);
module.exports = PostModel;