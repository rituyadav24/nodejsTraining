//require because catalyst pr kaam krna h 
const catalyst = require("zcatalyst-sdk-node");
//either use async/await or export to create function to provide it to server
exports.testcontroller=async(req,res)=>{
    try
    {
        res.status(201).json({success:true,message:"Successfully runned"});
    }   
    catch(error)
    {
        res.status(500).json({success:false,message:"it throws an error",error});

    }
}

exports.createuser=async(req,res)=>{
    try
    {
        const user=req.body;
        const userdata={
            Name:user.name,
            Email:user.Email,
            Password:user.Password,
            Mobile:user.Mobile,
            DOB:user.DOB
        }
        const catalystApp=catalyst.initialize(req,{scope:"admin"});
        const userresult=await catalystApp.datastore().table("test_table_user").insertRow(userdata);
        res.status(200).json({success:true,message:"user created ",data:userresult});

    }
    catch(error)
    {
        res.status(500).json({success:false,message:"user not created ",error});
    }
}


//select all users query
exports.getUsers=async(req,res)=>{
    try
    { 
       let query =`SELECT * FROM test_table_user`;
      let getdata= await zcql.executeZCQLQuery(query);   
      const catalystApp=catalyst.initialize(req,{scope:"admin"});
        res.status(200).json({success:true,message:"get all users response ",data:getdata});

    }
    catch(error)
    {
        res.status(500).json({success:false,message:"error in getting all users ",error});
    }
}

//delete user from table using rowId
exports.deleteUser=async(req,res)=>{
    const catalystApp=catalyst.initialize(req,{scope:"admin"});
    try
    {  
        const user2=req.params.id || req.body.id;
        console.log(user2);
        const deleteQuery =`DELETE  FROM test_table_user WHERE ROWID=${user2}`;
        console.log(deleteQuery);
        const deleteuser2= await catalystApp.zcql.executeZCQLQuery(deleteQuery);   
        res.status(200).json({success:true,message:"user deleted ",data:deleteuser2});

    }
    catch(error)
    {
        res.status(500).json({success:false,message:"error in deleting user ",error});
    }
}