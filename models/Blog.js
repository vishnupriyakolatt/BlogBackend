import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  photo:{
type:String,
required:true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  views:{
    type:Number,
    default:0
  },
  likes:{
    type:[String],
    default:[]
  }
},
{timestamps:true});

export default mongoose.model('Blog', blogSchema);

