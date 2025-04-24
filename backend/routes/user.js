const express = require('express')
// import {express} from 'express';

const router = express.Router();
const zod = require('zod');
const authMiddleware = require('../middleware/user')
const jwt = require('jsonwebtoken')

const { User } = require('../db');
const { Account } = require('../db');
const { JWT_SECRET } = require('../config');

const signupSchema = zod.object({
    username:zod.string(),
    password:zod.string(),
    firstname:zod.string(),
    lastname:zod.string()
});


router.post('/signup',async(req,res)=>{
    const body = req.body;
    //for validation
    const {success}  = signupSchema.safeParse(req.body);
    if(!success)
    {
        return res.json({
            message:'Email already taken /Incorrect inputs'
        })
    }
   
    
    const user =await User.findOne({
        username : body.username
    });
    
    
    if(user)
    {
        return res.json({
            message:'Email already taken /Incorrect inputs'
        })

    }

 
    
    const dbuser = await User.create(body);
 
    const userId = await User.findOne({
      username : body.username
  });
    

    
   
    await Account.create({
      userId:userId,
      balance: 1 + Math.random() * 10000
   })
    

    const token = jwt.sign({
        userId:dbuser._id
    },JWT_SECRET)
    res.json({
        message:"user created successfully",
        token:token
    })


})

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string()
})
router.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})


const updateUserSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
  });
router.put("/:id", authMiddleware, async (req, res) => {

    const { success, value } = updateUserSchema.safeParse(req.body);
    
    if (!success) {
      return res.status(400).json({
        message: "Error while updating information"
      });
    }
  
    await User.updateOne({ _id: req.params.id }, value);
    
  
    res.json({
      id: req.params.id,
      message: "Updated successfully"
    });
  });
  


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";



    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })
   
    

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    })
})

  
module.exports = router;