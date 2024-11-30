
const express=require("express");
//to create express's router
const userRouter=express.Router();
//to call our controller function and provide filepath of that file
const {testcontroller,createuser,login}=require("../controller/controllerUser");
// to get data from user 
userRouter.get("/test-connection",testcontroller);
userRouter.post("/create-user",createuser);
// userRouter.get("/get-users",getUsers);
// userRouter.delete("/delete-user/:id?",deleteUser);
userRouter.post("/login-user",login);
module.exports=userRouter;

