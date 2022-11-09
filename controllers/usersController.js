const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//model
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.listUsers = async (req, res) => {
  try {
    //code
    const user = await User.find({}).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.readUsers = async (req, res) => {
  try {
    //code
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.updateUsers = async (req, res) => {
  try {
    //code
    var { id, password } = req.body.values;
    // 1 gen salt
    const salt = await bcrypt.genSalt(10);
    //2 encrypt
    var enPassword = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
      { _id: id },
      { password: enPassword }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.removeUsers = async (req, res) => {
  try {
    //code
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.changeStatus = async (req, res) => {
  try {
    //code
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { enabled: req.body.enabled }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.changeRole = async (req, res) => {
  try {
    //code
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { role: req.body.role }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;

    let user = await User.findOne({ username: req.user.username }).exec();
    // create array[{1},{2}]
    let products = [];
    // check ตะกร้าสินค้าอันเก่า
    let cartOld = await Cart.findOne({ orderdBy: user._id }).exec();
    if (cartOld) {
      cartOld.remove();
    }
    //แต่งสินค้า
    for (let i = 0; i < cart.length; i++) {
      let object = {};

      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.price = cart[i].price;

      //{i}
      products.push(object);
    }
    // หาผลรวมของตะกร้า
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      //code
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderdBy: user._id,
    }).save();

    console.log(newCart);
    res.send("userCart ok!");
  } catch (err) {
    console.log(err);
    res.status(500).send("userCart Server Error");
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    let cart = await Cart.findOne({ orderdBy: user._id })
      .populate("products.product", "_id title price")
      .exec();

    const { products, cartTotal } = cart;
    res.json({ products, cartTotal });
  } catch (err) {
    res.status(500).send("getUserCart Server Error");
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    const empty = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();

    res.send(empty);
  } catch (err) {
    res.status(500).send("RemoveCart Server Error");
  }
};

exports.saveAddress = async (req, res) => {
  try {
    //code
    const { addressId } = req.body;

    let user = await User.findOneAndUpdate(
      { username: req.user.username },
      { $addToSet: { address: addressId } }
    ).exec();
    res.send(user);
    // const userAddress = await User.findOneAndUpdate(
    //   {username:req.user.username},
    //   {address:req.body.address}
    //   ).exec();

    // res.json({ok:true})
  } catch (err) {
    res.status(500).send("saveAddress Server Error");
  }
};

exports.saveOrder = async (req, res) => {
  try {
    //code
    let user = await User.findOne({ username: req.user.username }).exec();

    let userCart = await Cart.findOne({ orderdBy: user._id }).exec();

    const { addressId } = req.body;

    let order = await new Order({
      products: userCart.products,
      orderdBy: user._id,
      cartTotal: userCart.cartTotal,
      address: addressId,
    }).save();

    // + - products
    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });

    let updated = await Product.bulkWrite(bulkOption, {});

    res.send(updated);
  } catch (err) {
    res.status(500).send("saveOrder Server Error");
  }
};

exports.getOrder = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    let order = await Order.find({ orderdBy: user._id })
      .populate("products.product")
      .populate("address")
      .exec();

    res.json(order);
  } catch (err) {
    res.status(500).send("getOrder Server Error");
  }
};

exports.readOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id })
      .populate("products.product")
      .populate("address")
      .exec();

    res.send(order);
  } catch (err) {
    res.status(500).send("readOrder Error!!");
  }
};

exports.updateSlipOrder = async (req, res) => {
  try {
    
    const order = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();

    res.send(order);
  } catch (err) {
    res.status(500).send("Update Product Error!!");
  }
};

exports.addTowishList = async (req, res) => {
  try {
    //code
    const { productId } = req.body;
    let user = await User.findOneAndUpdate(
      { username: req.user.username },
      { $addToSet: { wishlist: productId } }
    ).exec();

    res.send(user);
  } catch (err) {
    res.status(500).send("addTowishList Server Error");
  }
};

exports.getWishList = async (req, res) => {
  try {
    //code
    let list = await User.findOne({ username: req.user.username })
      .select("wishlist")
      .populate("wishlist")
      .exec();

    res.json(list);
  } catch (err) {
    res.status(500).send("getWishList Server Error");
  }
};

exports.removeWishList = async (req, res) => {
  try {
    //code
    // https://localhost/user/WishList/45454545 (parameter from url)
    const { productId } = req.params;
    let user = await User.findOneAndUpdate(
      { username: req.user.username },
      { $pull: { wishlist: productId } }
    ).exec();

    res.send(user);
  } catch (err) {
    res.status(500).send("removeWishList Server Error");
  }
};

exports.getAddress = async (req, res) => {
  try {
    //code
    let list = await User.findOne({ username: req.user.username })
      .select("address")
      .populate("address")
      .exec();

    res.json(list);
  } catch (err) {
    res.status(500).send("getWishList Server Error");
  }
};

// exports.removeWishList = async(req,res)=>{
//   try {
//     //code
//     // https://localhost/user/WishList/45454545 (parameter from url)
//     const { productId } = req.params
//     let user = await User.findOneAndUpdate(
//       {username:req.user.username},
//       {$pull:{wishlist: productId}}
//     ).exec()

//     res.send(user)

//   } catch (err) {
//     res.status(500).send('removeWishList Server Error')
//   }
// }
