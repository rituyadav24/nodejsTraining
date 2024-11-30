//require because catalyst pr kaam krna h 
const catalyst = require("zcatalyst-sdk-node");
const bcrypt =require("bcrypt");
// const jwt=require("jsonwebtoken");
// require("dotenv").config();
//either use async/await or export to create function to provide it to server
exports.testcontroller=async(req,res)=>{
    try
    {
        res.status(201).json({success:true,message:"Successfully run"});
    }   
    catch(error)
    {
        res.status(500).json({success:false,message:"it throws an error",error});

    }
}
exports.login=async(req,res)=>{
    const catalystApp=catalyst.initialize(req,{scope:"admin"});
    try{
        const formdata=req.body;
        const userEmail= `SELECT * FROM test_table_user WHERE Email = '${formdata.Email}'`;
        console.log("user Email response --- ",userEmail);
        const user= await catalystApp.zcql().executeZCQLQuery(userEmail);
        console.log("--user query --",user);
        if(!user.length>0)
        {
            return res.status(401).json({success:true,message:"Invalid user id"});
        }
        const userPwd=user[0]?.test_table_user?.Password;
        const comparePassword=await bcrypt.compare(formdata.Password,userPwd);
        if(!comparePassword)
        {
            res.status(401).json({success:true,message:"invalid password"});
        }
        res.status(200).json({success:true,message:"user successfully login"});
    }
    catch(error)
    {
        res.status(409).json({success:true,message:"Something went wrong",error:error.message});
    }
}

//------create user function ------
exports.createuser=async(req,res)=>{
    const catalystApp=catalyst.initialize(req,{scope:"admin"});
    try
    {
        const user=req.body;
        const encodePwd=await bcrypt.hash(user.Password,10);
        const userdata={
            Name:user.name,
            Email:user.Email,
            Password:encodePwd,
            Mobile:user.Mobile,
            DOB:user.DOB
        }
        const userEmail= `SELECT * FROM test_table_user WHERE Email = '${userdata.Email}'`;
        console.log("user Email response ",userEmail);
        const checkUser= await catalystApp.zcql().executeZCQLQuery(userEmail);
        console.log("check if it exists",checkUser);
        if(checkUser.length>0)
        {
            res.status(203).json({success:true,message:"email id already exists"});
        }
        const userresult=await catalystApp.datastore().table("test_table_user").insertRow(userdata);
        res.status(200).json({success:true,message:"user created ",data:userresult});

    }
    catch(error)
    {
        res.status(500).json({success:false,message:"user not created ",error:error.message});
    }
}


// //select all users query
// exports.getUsers=async(req,res)=>{
//     try
//     {
//         const catalystApp=catalyst.initialize(req,{scope:"admin"});
//        const query =`SELECT * FROM test_table_user order by CREATEDTIME DESC`;
//       const getdata= await catalystApp.zcql().executeZCQLQuery(query);   
//         res.status(200).json({success:true,message:"get all users response ",data:getdata});

//     }
//     catch(error)
//     {
//         res.status(500).json({success:false,message:"error in getting all users ",error});
//     }
// }

// //delete user from table using rowId
// exports.deleteUser=async(req,res)=>{
//     const catalystApp=catalyst.initialize(req,{scope:"admin"});
//     try
//     {  
//         const user2=req.params.id || req.body.id;
//         console.log(user2);
//         const deleteQuery =`DELETE  FROM test_table_user WHERE ROWID=${user2}`;
//         console.log(deleteQuery);
//         const deleteuser2= await catalystApp.zcql.executeZCQLQuery(deleteQuery);   
//         res.status(200).json({success:true,message:"user deleted ",data:deleteuser2});

//     }
//     catch(error)
//     {
//         res.status(500).json({success:false,message:"error in deleting user ",error});
//     }
// }