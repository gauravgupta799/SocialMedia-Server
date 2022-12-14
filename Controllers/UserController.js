const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

// Get All Users
const getAllUsers = async(req,res)=>{
  try {
    let users = await User.find();
    users = users.map((user)=>{
        const {password, ...otherDetails} = user._doc
        return otherDetails
    });
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error.message);
  }
}

// Get a User
const getUser = async (req, res) => {
    const id = req.params.id;
    const user =await User.findById(id);
    if(user){
        const {password, ...info} = user._doc;
        res.status(200).json(info);
    }else{
        res.status(404).json({ message: "User does not exist!"})
    }
}
// Update a user
const updateUser = async (req, res) => {
    const id = req.params.id;
    const {_id, isAdmin, password} = req.body;
    if(id === _id || isAdmin){
        try{
            if(password){
                const salt =await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }
            const updatedUser = await User.findByIdAndUpdate(id,req.body, {new:true})   
            const token = jwt.sign({username:updatedUser.username, id:updatedUser._id}, process.env.Security_key ,{expiresIn:'24h'});            
            res.status(200).json({updatedUser, token});
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json({ message: "Access denied!You can update only your account" })
    }
}

// Delete a user
const deleteUser = async (req, res) => {
    const id = req.params.id;
    const {_id, isAdmin} = req.body;
    if(id === _id || isAdmin) {
        try{
           await User.findByIdAndDelete(id);
                res.status(200).json("User has been deleted...");
        }catch(err){
            res.status(500).json(err);
        }
    }else {
        res.status(403).json("You can delete only your account.")
    }
}
// Follow a user
const followUser = async(req, res) => {
    const id = req.params.id;
    const {_id } = req.body;
    if(id === _id){
        res.status(403).json({msg:"Action forbidden"})
    }else{
        try{
            const followUser = await User.findById(id);
            const followingUser =await User.findById(_id);

            if(!followUser.followers.includes(_id)){
                await followUser.updateOne({
                    $push: { followers:_id}
                });
                await followingUser.updateOne({
                    $push: { following:id}
                });
                res.status(200).json({msg :"User followed!"})
            }else{
                res.status(403).json({msg:"User is already followed by you."})
            }
        }catch (err) {
            res.status(500).json({ message: err.message})
        }
    }
}
// Unfollow a user
const UnfollowUser = async (req, res) => {
    const id = req.params.id;
    const {_id } = req.body;
    if(id === _id){
        res.status(403).json({msg:"Action forbidden"})
    }else{
        try{
            const followUser = await User.findById(id);
            const followingUser =await User.findById(_id);

            if(followUser.followers.includes(_id)){
                await followUser.updateOne({
                    $pull: { followers:_id}
                });
                await followingUser.updateOne({
                    $pull: { following:id}
                });
                res.status(200).json({msg :"User unfollowed!"})
            }else{
                res.status(403).json({msg:"User is not followed by you."})
            }
        }catch (err) {
            res.status(500).json({ message: err.message})
        }
    }
}

module.exports = {getUser, updateUser,deleteUser,followUser,UnfollowUser, getAllUsers};