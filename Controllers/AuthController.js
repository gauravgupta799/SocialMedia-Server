const UserModel = require('../models/userModel.js');

const register = async(req,res)=>{
    const {username, password, firstname,lastname} = req.body;
    const newUser = new UserModel(username, password, firstname, lastname);
    try{
        await newUser.save();
        res.status(200).json(newUser);

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = register;