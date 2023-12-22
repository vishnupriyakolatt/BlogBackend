

    import express from 'express';
    import morgan from 'morgan'
    import router from './routes/user-router';
 import blogRouter from "./routes/blog-routes";
    const app=express();
    import dotenv from 'dotenv';
    import mongoose from 'mongoose';
    
    dotenv.config();
    app.use(express.json())
    
    app.use(morgan('dev'))
    
    
    
    
    
app.use('/api/user', router);
app.use('/api/blogs', blogRouter);
    
    
    mongoose.connect(process.env.MONGODB_URI, {
      }).then(() => {
        console.log("Connected to the database");
      }).catch((err) => {
        console.log("Error connecting to the database:", err);
      });
    
    app.listen('8000',()=>{
        console.log('server running')
    })