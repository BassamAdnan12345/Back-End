const express=require("express")
const route=require("./routes/album")
let port=8000
const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.status(200).json({message:"hello to our website"})
})
app.use("/albums",route)
app.use((err,req,res,next)=>{
    res.status(400).json({Error:err})
})
app.listen(port,()=>{
    console.log(`The server start on http://localhost:${port}`)
})