const express = require("express")
const router = express.Router()
require("../database/conn")
const User = require("../models/registerschema")
const transferAmount = require("../models/transfer")


// router.post("/register",async (req,res)=>{
//     try {
//         const {name,email,balance} = req.body

//         if (!name || ! email || ! balance ) {
//             return res.status(422).json({error:"please filled the field"})    
//         }

//         const userExist = await User.findOne({email:email})

//         if (userExist) {
//             return res.status(422).json({error:"User already exist"})
//         }

//         const user = new User({name,email,balance})

//         const userRegister = await user.save()
//         console.log(userRegister);

//         return res.status(201).json({message:"successfully registered"})
            
//     } catch (err) {
//         console.log(err)
//     }
// })

const updateAmt = async (id,currbalance) => {
  try {
    const result = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          balance: currbalance,
        }
      },{
        new:true,
        useFindAndModify:false
      }
    );
  } catch (error) {
    console.log(error);
  }
};


router.post("/transfer",async (req,res)=>{
    try {
     
        let {senderemail,recieveremail,balance} = req.body
        balance = parseInt(balance)
        
        if (!senderemail || ! recieveremail || ! balance ) {
            return res.status(422).json({message:"please filled the field"})    
        }
        if (balance < 0) {
          return res.status(422).json({message:"Balance can not be Negative"})     
        }
 
        const sender = await User.findOne({email:senderemail})
        const recv = await User.findOne({email:recieveremail})

        if (sender.balance<balance) {
            return res.status(201).json({message:"Insuffiecient balance"})
        }

        let sdvAmt = sender.balance - balance;
        let recvAmt = recv.balance + balance;

        updateAmt(sender._id,sdvAmt);
        updateAmt(recv._id,recvAmt);

        const transfer = new transferAmount({senderemail,recieveremail,balance})

        const transAmt = await transfer.save()


        return res.status(201).json({message:"Successfully transfered"})
            
    } catch (err) {
        console.log(err)
    }
})


router.get("/gethistory",async (req,res)=>{
  try {
      const data = await transferAmount.find().select({_id:0,__v:0})
      return res.status(201).json(data)
          
  } catch (err) {
      console.log(err)
  }
})

router.get("/getdata",async (req,res)=>{
  try {
      const data = await User.find().select({_id:0,__v:0})
      return res.status(201).json(data)
          
  } catch (err) {
      console.log(err)
  }
})

module.exports = router