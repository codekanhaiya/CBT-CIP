const MyMongoose = require('mongoose');
const MySchema = MyMongoose.Schema;

const CommentSchema = new MySchema({
    comment:{
        type:String,
        required:true,
    },
    sender_id:{
        type:String,
        required:true,
    },
    post_id:{
        type:String,
        required:true,
    },
}, {timestamps:true})

const CommentModel = MyMongoose.model('comments',CommentSchema);
module.exports = CommentModel;