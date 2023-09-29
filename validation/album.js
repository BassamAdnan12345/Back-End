const express=require("express")
const validate={
    requireId:(req,res,next)=>{
        let id=req.params.id
        let regex=/^[1-9][0-9]{0,3}?/
        if(regex.test(id)){
            next()
        }else{
            next({
                err:"id",
                type:typeof(id),
                fix:"you should add a number"
            })
        }
    },
    checkId:(req,res,next)=>{
        let id=req.body.id
        if(id){
            if(/^[1-9][0-9]{0,3}?/.test(id)){
                next()
            }else{
                res.status(404).json({
                    err:"id",
                    type:typeof(id),
                    fix:"id should be a number between 1-9999"

                })
            }
        }
    }
}
module.exports={
    get:[validate.requireId],
    patch:[validate.requireId,validate.checkId],
    delete:[validate.requireId],
    post:[validate.checkId]
}