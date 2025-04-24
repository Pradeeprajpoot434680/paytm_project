// mongoose.connect('mongodb+srv://prrajpoot12234:HwRz2CJt4WrcWJuK@cluster0.4zk98.mongodb.net/course_selling_app2');
const express = require('express');
const app = express();
const cors= require('cors');
const PORT = 8080;
app.use(cors());
app.use(express.json());
const mainRounter = require('./routes/index')
app.use('/api/v1',mainRounter)


// app.use('/api/v2',v2Routers)

app.listen(PORT,()=>{
    console.log(`app  is listening at port ${PORT}`);
    
})
// api/v1/user/amount
// api/v1/user/account-no
// api/v1/user/..
// api/v1/user/..


// api/v1/account/amount
// api/v1/account/xjkf
// api/v1/account/xbhd
