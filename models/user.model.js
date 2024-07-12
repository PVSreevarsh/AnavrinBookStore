import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    default: "Default1"
  },
  email:{
    type: String,
    required: true,
  },
  password:{
    type:String,
    required: true
  },
  cart:{
    type: Object,
    default: {},
    required: true
  }
});

export const User = mongoose.model('User',userSchema);
