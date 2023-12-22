import Blog from '../models/Blog';



export const getAllBlogs=async(req,res)=>{
    try {
        const blogs=await Blog.find({}).populate('userId','-password')
      return res.status(200).json(blogs)  
    } catch (error) {
       return res.status(500).json(error) 
    }
}
export const getById=async(req,res)=>{
    try {
        const blog=await Blog.findById(req.params.id).populate('userId','-password')
   blog.views+=1
   await blog.save()
   return res.status(200).json(blog)
   
    } catch (error) {
       return res.status(500).json(error) 
    }
}

export const updateBlog=async(req,res)=>{
    try {
        const blog=await Blog.findById(req.params.id)
       console.log(blog.userId,req.user.id)
        if(blog.userId.toString()!==req.user.id.toString()){
            throw new Error("You can only update your own data")
        }
        const updateBlog=await Blog.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true}).populate('userId','-password')
   return res.status(200).json(updateBlog)
   
    } catch (error) {
        return res.status(500).json(error.message)
    }
}



export const likeBlog=async(req,res)=>{
try {
   const blog=await Blog.findById(req.params.id)
   if(blog.likes.includes(req.user.id)){
    blog.likes=blog.likes.filter((userId)=>userId !==req.user.id)
await blog.save()   
return res.status(200).json({msg:"successfully unliked this blog"})

} else{
blog.likes.push(req.user.id)
await blog.save()
return res.status(200).json({msg:'successfully liked the blog'})
}
} catch (error) {
 return res.status(500).json(error)   
}
}
