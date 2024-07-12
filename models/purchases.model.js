import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    default: "Default1"
  },
  email:{
    type: String,
    required: true,
  },
  purchased:{
    type: Object,
    default: {},
    required: true
  }
}, {timestamps: true});

export const Purchase = mongoose.model('Purchases',purchaseSchema);
