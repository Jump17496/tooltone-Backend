const Order = require("../models/Order");

exports.changeOderStatus = async (req, res) => {
  try {
    const {orderId, orderstatus} = req.body
    let orderUpdate = await Order.findByIdAndUpdate(
        orderId,
        {orderstatus},
        {new: true}
    )
        res.send(orderUpdate)
  } catch (err) {
    res.status(500).send("UpdateStatus Error!!");
  }
};

exports.getOrderAdmin = async(req,res)=>{
  try {
    
    let order = await Order.find()
    .populate('products.product')
    .populate('orderdBy',"username address")
    .populate('address')
    .exec();

    res.json(order)

  } catch (err) {
    res.status(500).send('getOrder Server Error')
  }
}