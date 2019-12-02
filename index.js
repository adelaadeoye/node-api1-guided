// console.log("Run server by me")
const express = require("express"); //CommonJs Modules


const server= express();
server.get("/",(req,res)=>{
    res.send({api: "up and running"})
})
const port= 6000
server.listen(port,()=>console.log(`\n ** API on port${port}**\n`))