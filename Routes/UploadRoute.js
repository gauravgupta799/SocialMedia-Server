const router = require('express').Router();
const multer = require('multer');

 const Storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "public/images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
 });

const upload = multer({storage:Storage})

router.post('/', upload.single("file"), (req, res)=>{
    try {
        return res.status(200).json({msg:"File uploaded succesfully!"})
    } catch (error) {
        console.log(error)
    }
})

module.exports =  router;