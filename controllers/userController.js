const User = require('../models/User');
const { StatusCodes }= require('http-status-codes');
const CustomError = require('../errors');
const {createTokenUser} = require('../utils/index');
const {attachCookiesToResponse,checkPermissions} = require('../utils');



//For admin route gets all user(Users admin middleware)
const getAllUser = async(req,res)=>{
    const users = await User.find({role:'user'}).select('-password');

    res.status(StatusCodes.OK).json({users});
}


//Gets single user
const getSingleUser = async(req,res)=>{
    const user = await User.findOne({_id:req.params.id}).select('-password');
    if(!user){
        throw new CustomError.NotFoundError(`No user with id ${req.params.id}`);
    }
    checkPermissions(req.user, user._id)
    res.status(StatusCodes.OK).json({user})
}


//Shows current user 
const showCurrentUser = async(req,res)=>{
    res.status(StatusCodes.OK).json({user: req.user})
}


//updating user 
const updateUser = async(req,res)=>{
    const {email, name} = req.body;
    if(!email||!name){
        throw new CustomError.BadRequestError('Enter every fields');

    }
    const user = await User.findOneAndUpdate({_id:req.user.userId},{email,name},{new:true, runValidator:true});
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({user:tokenUser})

}


//updates the users password
const updateUserPassword = async(req,res)=>{
    const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError('Enter every fields');
    }
    const user = await User.findOne({_id:req.user.userId});
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if(!isPasswordCorrect){
        throw new CustomError.BadRequestError('Please enter your correct password');
    }
    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({msg:'Success! Password Updated'});
    

}

module.exports = {
    getAllUser,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
}