const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

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
    const {currentUserId, isAdmin, password} = req.body;
    if(id === currentUserId || isAdmin){
        try{
            if(password){
                const salt =await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }
            const updatedUser = await User.findByIdAndUpdate(id,
                {
                    $set: req.body,
                },{new:true})               
               res.status(200).json(updatedUser);
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
    const {currentUserId, isAdmin} = req.body;
    if(id === currentUserId || isAdmin) {
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
module.exports = {getUser, updateUser,deleteUser };