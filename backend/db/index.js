const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://prrajpoot12234:HwRz2CJt4WrcWJuK@cluster0.4zk98.mongodb.net/payment_app_class')

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
 
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstname:{
        type:String,
        trim:true,
        required:true,
        maxLength:50
    },
    lastname:{
        type:String,
        trim:true,
        required:true,
        maxLength:50
    }
});


// const userSchema = mongoose.Schema({
//     username:String,
//     password:String,
//     firstname:String,
//     lastname:String
// })

const accountSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Account",accountSchema);


module.exports ={
    User,
    Account
}
