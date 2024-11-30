//use express to create server and write code in shortest way
const express=require("express");
const cors=require("cors");
//koi api banaye aur dusre server se hit kri ,tab error aaye tab usko remove krne ke liye 

var app=express();
//server run krwane hai index.js file pr aur inko use bhi yehi krege
// app.use(cors());
//json parser to get some input/output in json format 
app.use(cors());
app.use(express.json());

const userRouter=require("./router/routerUser");
// to store different versions 
//userRouter is in-point ko call karege to run server
app.use("/user/api/v1",userRouter);
//app ke andar humara server run krega
module.exports=app;
