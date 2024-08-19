const UserModel = require('../models/user_schema');
const PostModel = require('../models/post_schema');
const CommentModel = require('../models/comment_schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ Message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                Message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                Message: "Internal server error",
                success: false
            })
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errMsg = 'Authentication failed! email or password is wrong.';
        if (!user) {
            return res.status(403)
                .json({ Message: errMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ Message: errMsg, success: false });
        }
        const jwtToken = jwt.sign({ email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        res.status(200)
            .json({
                Message: "Login successfully",
                success: true,
                jwtToken,
                email,
                name: user.name,
                id:user._id
            })
    } catch (err) {
        res.status(500)
            .json({
                Message: "Internal server error",
                success: false
            })
    }
};

const newPass = async(req, res)=>{
    try {
        const { email, newPassword } = req.body;
        const user = await UserModel.findOne({ email });
        const errMsg = 'Authentication failed! email is wrong.';
        if (!user) {
            return res.status(403)
                .json({ Message: errMsg, success: false });
        }
        
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200)
            .json({
                Message: "Password updated successfully",
                success: true,
            })
    } catch (err) {
        res.status(500)
            .json({
                Message: "Internal server error!",
                success: false
            });
    }
};

const post = async (req, res) => {
    try {
        const { title, description, author_id, image } = req.body;
        const postModel = new PostModel({ title, description, author_id, image });
        await postModel.save();
        res.status(201)
            .json({
                message: "New post created successfully!",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error.",
                success: false
            })
    }
};

const getPost = async (req, res) => {
    try {
        // Assume the username is passed in the request body
        const { userId } = req.body;
        // username="Rajanyadav";
        // Find all posts that match the given userId
        const posts = await PostModel.find({ author_id: userId });
        // Send the found posts back to the frontend
        res.status(200).json(posts);
        // console.log(posts);
    } catch (error) {
        // Handle any errors that occur during the request
        res.status(500).json({ message: " retrieving posts !", error });
    }
};

const mypost = async(req, res)=>{
    try {
        // Assume the post is passed in the request body
        const { postId } = req.body;
        // Find specific post that match the given postId
        const post = await PostModel.findOne({ _id: postId });
        // Send the found posts back to the frontend
        res.status(200).json(post);
        // console.log(post);
    } catch (error) {
        // Handle any errors that occur during the request
        res.status(500).json({ message: " retrieving post !", error });
    }
};

const delPost = async (req, res) => {
    try {
        // Extract the postId from the request parameters
        const { postId } = req.body;
        // console.log("hey: ", postId);
        // Find and delete the post with the given postId
        const deletedPost = await PostModel.findByIdAndDelete({_id : postId});

        if (deletedPost) {
            // If the post was successfully deleted, send a success response
            res.status(200).json({ message: "Post deleted successfully", deletedPost });
        } else {
            // If no post was found with the given postId, send a 404 response
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        // Handle any errors that occur during the request
        res.status(500).json({ message: "Error deleting post", error });
    }
};

const getUsers = async (req, res) => {
    try {
        // Assume the username is passed in the request body
        const { username } = req.body;
        // console.log(username);
        // Find all posts that match the given username
        const users = await UserModel.find({ name: { $ne: username } }); // $ne (not equal) operator
        // Send the found posts back to the frontend
        res.status(200).json(users);
        // console.log(users);
    } catch (error) {
        // Handle any errors that occur during the request
        res.status(500).json({ message: " retrieving users !", error });
    }
};




const cmt = async (req, res)=>{
    try {
        const { comment, sender_id, post_id } = req.body;
        const cmtModel = new CommentModel({ comment, sender_id, post_id});
        await cmtModel.save();
        res.status(201)
            .json({
                message: "Comment successfully!",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error.",
                success: false
            })
    }
};

const getCmt = async (req, res) => {
    try {
        // Assume the username is passed in the request body
        const { userId, postId } = req.body;
        // username="Rajanyadav";
        // Find all posts that match the given userId
        const msgs = await CommentModel.find({ sender_id: userId, post_id: postId });
        // Send the found posts back to the frontend
        res.status(200).json(msgs);
        // console.log(msgs);
    } catch (error) {
        // Handle any errors that occur during the request
        res.status(500).json({ message: " retrieving comments !", error });
    }
};

const delCmt = async (req, res) => {
    try {
        // Extract the postId from the request parameters
        const { msgId } = req.body;
        // console.log("hey: ", msgId);
        // Find and delete the post with the given postId
        const deletedMsg = await CommentModel.findByIdAndDelete({_id : msgId});

        if (deletedMsg) {
            // If the post was successfully deleted, send a success response
            res.status(200).json({ message: "Comment deleted successfully", deletedMsg });
        } else {
            // If no post was found with the given postId, send a 404 response
            res.status(404).json({ message: "Comment not found" });
        }
    } catch (error) {
        // Handle any errors that occur during the request
        res.status(500).json({ message: "Error deleting comment", error });
    }
};


module.exports = {
    signup,
    login,
    newPass,
    post,
    getPost,
    mypost,
    delPost,
    getUsers,
    cmt,
    getCmt,
    delCmt,
}