const express=require("express")
const controler=require("../controlers/album")
const validate=require("../validation/album")
const route=express.Router()
route.get('/',controler.pageQuery,controler.getAll)
route.get('/:id',validate.get,controler.getOne)
route.post('/',validate.post,controler.addOne)
route.delete("/:id",validate.delete,controler.deleteOne)
route.patch('/:id',validate.patch,controler.updateOne)

module.exports=route