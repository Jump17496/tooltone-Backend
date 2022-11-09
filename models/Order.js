const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const OrderSchema = mongoose.Schema(
  {
    products:[
      {
        product:{
          type: ObjectId,
          ref:'product'
        },
        count: Number,
        price: Number
      }
    ],
    cartTotal: Number,
    orderstatus:{
      type:String,
      default:'Not Process'
    },
    orderdBy:{
      type: ObjectId,
      ref:'users'
    },
    address:{
      type: ObjectId,
      ref:'locations'
    },
    slipImage: {
      type: Array,
    }
  },
  { timestamps: true }
);

module.exports = Order = mongoose.model("order", OrderSchema);
