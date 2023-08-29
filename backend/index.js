const express = require('express');
require('./db/config');
const UserModel = require('./db/users');
const cors = require("cors")             //fixing cors problem using cors module 

const ProductModel = require('./db/product');
const adminModel = require('./db/admin');
const profileModel = require('./db/profileModel');
const app = express();

const Jwt = require("jsonwebtoken");
const Jwtkey = "suji-programmer";

const multer = require("multer");

app.use(express.json());
app.use(cors());


app.post("/register", async (req, resp) => {
    let user = new UserModel(req.body);
    let result = await user.save()
    // delete password from returning data as the result 
    result = result.toObject();
    delete result.password;
    Jwt.sign({result},Jwtkey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            resp.send({result:"somthing went's wrong, please try after some time"})
        }
        resp.send({result,auth : token})
    })
    
})


app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {

        let User = await UserModel.findOne(req.body).select("-password");
        if (User) {
            Jwt.sign({User},Jwtkey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    resp.send({result:"somthing went's wrong, please try after some time"})
                }
                resp.send({User,auth : token})
            })
            
        } else {
            resp.send({ result: "No User Found" })
        }
    } else {
        resp.send({ result: "No User Found" });
    }

})

app.post('/add-product',verifyToken, async (req, resp) => {
    let productModel = new ProductModel(req.body);
    let result = await productModel.save();
    resp.send(result);
})

app.get('/products',verifyToken, async (req, resp) => {
    let products = await ProductModel.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No products found" })
    }
})

app.delete('/product/:id',verifyToken, async (req, resp) => {

    const result = await ProductModel.deleteOne({ _id: req.params.id });
    resp.send(result)


})

app.get("/product/:id",verifyToken, async (req, resp) => {
    let result = await ProductModel.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "No record found" })
    }
})

app.put("/product/:id",verifyToken, async (req, resp) => {
    // resp.send("Put is working")
    let result = await ProductModel.updateOne({ _id: req.params.id }, { $set: req.body })
    resp.send(result)
})

app.get("/search/:key",verifyToken,async (req, resp) => {
    let result = await ProductModel.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { catagory: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    })
    resp.send(result)
})

app.post('/admin',verifyToken,async(req,resp)=>{
    if(req.body.password && req.body.username){
        const result = await adminModel.findOne(req.body).select("-password");
       
        if(result)
        {
            delete result.password;
            resp.send(result)
        }else{
            resp.send({result:"Not valid admin"})
        }
    }else{
        resp.send({result:"Not valid admin"})
    }
   
    
})

function verifyToken(req,resp,next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        Jwt.verify(token,Jwtkey,(err,valid)=>{
            if(err){
                resp.status(401).send({result:"Please provide a valid token"})
            }else{
                next();
            }

        })
    }else{
        resp.status(403).send({result:"Please send a token with headers"})
    }
    // console.warn("middleware called",token);
    // next();
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "profileUpload")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
let upload = multer({storage:storage})

app.post("/api/profile",upload.single("profilePic"),(req,resp)=>{
    // resp.send("profile api working...")
    const u_name = req.body.u_name;
    const img_Url = req.file.path;
    const profileDtl = new profileModel({
        u_name:u_name,
        img_Url:img_Url
    })
    const result = profileDtl.save();
    resp.send(result);
    console.log(req.file.path);

})

app.post("/api/getpic",async(req,resp)=>{
    const result = await profileModel.findOne(req.body);
    console.log(req.body);
    resp.send(result.img_Url);
})




app.listen(5000);



