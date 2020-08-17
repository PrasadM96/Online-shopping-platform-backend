const User = require("../models/user");
const Product = require("../models/products");
const Seller = require("../models/seller");
const Orders = require("../models/orders");

exports.getProducts = (req, res, next) => {
  res.status(200).json("Success");
};

exports.getUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users.length) {
      return res.status(404).json({ success: false, error: `users not found` });
    }
    return res.status(200).json({ success: true, data: users });
  }).catch((err) => console.log(err));
};

exports.getProductList = async (req, res) => {
  await Product.find({}, (err, products) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!products.length) {
      return res
        .status(404)
        .json({ success: false, error: `products not found` });
    }
    return res.status(200).json({ success: true, data: products });
  }).catch((err) => console.log(err));
};

exports.getSellerList = async (req, res) => {
  await Seller.find({}, (err, sellers) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!sellers.length) {
      return res
        .status(404)
        .json({ success: false, error: `sellers not found` });
    }
    return res.status(200).json({ success: true, data: sellers });
  }).catch((err) => console.log(err));
};

exports.getOrders = async (req, res) => {
  await Orders.find({}, (err, orders) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!orders.length) {
      return res
        .status(404)
        .json({ success: false, error: `orders not found` });
    }
    return res.status(200).json({ success: true, data: orders });
  }).catch((err) => console.log(err));
};

exports.getProductCount = (req,res)=> {
    
  
  Product.countDocuments({} ,function( err, count){
    if(err){
      console.log(err);

    }
    else{
        return res.status(200).json({ success: true, data: count })
    }
})  
}

exports.getUserCount = (req,res)=> {
    
  
  User.countDocuments({} ,function( err, count){
    if(err){
      console.log(err);

    }
    else{
        return res.status(200).json({ success: true, data: count })
    }
})  
}

exports.getOrderCount = (req,res)=> {
    
  
  Orders.countDocuments({} ,function( err, count){
    if(err){
      console.log(err);

    }
    else{
        return res.status(200).json({ success: true, data: count })
    }
})  
}

exports.getSellerCount = (req,res)=> {
    
  
  Seller.countDocuments({} ,function( err, count){
    if(err){
      console.log(err);

    }
    else{
        return res.status(200).json({ success: true, data: count })
    }
})  
}

/*exports.removeOrders=(req,res) =>{
  console.log(req);
  Orders.findByIdAndDelete(
   { _id: req._id},
   (err,newOrder)=>{
     if(err){
       return res.status(400).json({success:false,error:err});

     }
     if(!newOrder){
       return res.status(404).json({success:false,error:"not found order"})
     }
     return res.status(200).json({success:true,data:newOrder});

   }

  ).catch((err)=>console.log(err));
}*/
exports.removeSellers = (req, res, next) => {
  const seller_id = req.body.seller_id;
  console.log(seller_id);

  Seller.deleteOne({
    _id: seller_id,
   
  })
    .then((response) => {
      res.status(200).send("success");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.removeUsers = (req, res, next) => {
  const user_id = req.body.user_id;
  console.log(user_id);

  User.deleteOne({
    _id: user_id,
   
  })
    .then((response) => {
      console.log(response);
      res.status(200).send("success");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};