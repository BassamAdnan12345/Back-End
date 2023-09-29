const express=require("express")
const album=require("../data/data")
const controlers={
    getAll:(req,res)=>{
        res.status(200).json({albums:album})
    },
    getOne:(req,res)=>{
        let id=req.params.id
        if(id){
            let picture=album.find((ele)=>ele.id===parseInt(id))
            if(picture){
                res.status(200).json({album:picture})
            }else{
                res.status(404).json({message:"album not found"})
            }
        }
    },
    addOne:(req,res)=>{
        let element=req.body
        if(element.id ||element.id===0){
            let findId=album.find((ele)=>ele.id===element.id)
            if(findId || element.id===0){
                element.id=album.length+1
                album.push(element)
                res.status(201).json({"added element":element})
                return
            }else{
                album.push(element)
                res.status(201).json({"added picture":element})
                return
            }
        }else{
            element.id=album.length+1
            album.push(element)
            res.status(201).json({"added album":element})
        }
    },
    deleteOne:(req,res)=>{
        let id=req.params.id
        let findAlbum=album.findIndex((ele)=>ele.id===parseInt(id))
        if(findAlbum!==-1){
            let deletedAlbum=album.splice(album.findIndex,1)
            res.status(200).json({"deleted album":deletedAlbum})
        }else{
            res.status(404).json({message:"album not found"})
        }
    },
    updateOne:(req,res)=>{
        let reqId=req.params.id
        findAlbum=album.findIndex((ele)=>ele.id===parseInt(reqId))
        album[findAlbum].id=req.body.id?req.body.id:album[findAlbum].id
        album[findAlbum].albumId=req.body.albumId?req.body.albumId:album[findAlbum].albumId
        album[findAlbum].title=req.body.title?req.body.title:album[findAlbum].title
        album[findAlbum].url=req.body.url?req.body.url:album[findAlbum].url
        album[findAlbum].thumbnailUrl=req.body.thumbnailUrl?req.body.thumbnailUrl:album[findAlbum].thumbnailUrl
        res.status(200).json({"updated":album[findAlbum]})


    },
    pageQuery:(req,res,next)=>{
        let query=req.query.page
        let numberOfAlbums=50
        if(query){
            let startIndex=(query-1)*numberOfAlbums
            let endIndex=startIndex+numberOfAlbums
            res.status(200).send(album.slice(startIndex,endIndex))
            return
        }
        next()
    }
}
module.exports=controlers 