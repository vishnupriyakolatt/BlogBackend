

    import express from 'express';
    import morgan from 'morgan'
    import mongoose from 'mongoose';
    import router from './routes/user-router';
    import blogRouter from "./routes/blog-routes";
    const app=express();
    import dotenv from 'dotenv';
  
  
    dotenv.config();
    app.use(express.json())
    
    app.use(morgan('dev'))
    
    
    
    
    
app.use('/api/user', router);
app.use('/api/blogs', blogRouter);
    
    //connect database
    mongoose.set('strictQuery',false)
    mongoose.connect(process.env.MONGODB_URI, {
      }).then(() => {
        console.log("Connected to the database");
      }).catch((err) => {
        console.log("Error connecting to the database:", err);
      });
    
      //connect to your server
    app.listen('8000',()=>{
        console.log('server running')
    })