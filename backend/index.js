const express=require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');   // client-server port connection
const authRouter = require('./routes/AuthRouter');
const productRouter =require('./routes/productRouter');
const postRouter =require('./routes/PostRouter');

require('dotenv').config();
require('./models/db');


const PORT = process.env.PORT || 8080;

// ......................................................................
// app.get('/ping',(req, res)=>{
//     res.send('PONG');
// })
// ____________only for checking the server is response correctly or not._____________________________________________________________

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',authRouter);
app.use('/products',productRouter);
app.use('/mypost',postRouter);
app.use('/allpost',postRouter);
app.use('/delpost',postRouter);
app.use('/usersallpost',postRouter);
app.use('/alluser',authRouter);

app.use('/comment',postRouter);
app.use('/allmsg',postRouter);
app.use('/delmsg',postRouter);

app.use('/sppost',postRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})