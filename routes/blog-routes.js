import express from "express";
const blogRouter=express.Router()
import verifyToken from '../middlewares/verifyToken.js'


import { getAllBlogs ,getById,updateBlog,likeBlog} from "../controllers/blogController.js";
 blogRouter.get("/",getAllBlogs)
// blogRouter.post("/add",addBlog)
blogRouter.get("/find/:id",verifyToken,getById)
blogRouter.put("/update/:id",verifyToken,updateBlog)
blogRouter.put("/like/:id",verifyToken,likeBlog)
//  blogRouter.delete("/delete/:id",deleteBlog)
//  blogRouter.get('/user/:id',getByUserId)

export default blogRouter;