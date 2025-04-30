const CustomError = require('../errors');
const {StatusCodes} = require('http-status-codes')
const Order = require('../models/Order');
const Product = require('../models/Product');
const {attachCookiesToResponse,checkPermissions} = require('../utils');
const fakeStripeApi = async({amount,currency})=>{
    const client_secret = 'someRandomValue';
    return {client_secret, amount}
}

const getAllOrders = async(req,res)=>{
const orders = await Order.find({});
res.status(StatusCodes.OK).json({orders,count:orders.length});

}

const getSingleOrder = async(req,res)=>{
    const {id:orderId} = req.params;
    const order = await Order.findOne({_id:orderId});
    if(!order){
        throw new CustomError.NotFoundError('The above order is not found')
    }
    checkPermissions(req.user,order.user)
    res.status(StatusCodes.OK).json({order});


}

const getCurrentUserOrder = async(req,res)=>{
    const orders = await Order.find({user:req.user.userId});
    res.status(StatusCodes.OK).json({orders, count:orders.length});

}

const createOrder = async (req, res) => {
    const { items: cartItems, tax, shippingFee } = req.body;

    if (!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No cart items provided');
    }

    if (tax === undefined || shippingFee === undefined) {
        throw new CustomError.BadRequestError('Please provide tax and shipping fee');
    }

    let orderItems = [];
    let subTotal = 0;

    for (const item of cartItems) {
        const dbProduct = await Product.findOne({ _id: item.product });
        if (!dbProduct) {
            throw new CustomError.NotFoundError(`No product with id ${item.product}`);
        }

        const { name, price, images, _id } = dbProduct;
        const singleOrderItem = {
            amount: item.amount,
            name,
            price,
            image:images,
            product: _id,
        };

        orderItems.push(singleOrderItem);
        subTotal += item.amount * price;
    }

    const total = tax + shippingFee + subTotal;

    const paymentIntent = await fakeStripeApi({
        amount: total,
        currency: 'usd',
    });

    const order = await Order.create({
        orderItems,
        total,
        subTotal,
        tax,
        shippingFee,
        clientSecret: paymentIntent.client_secret,
        user: req.user.userId,
    });

    res.status(StatusCodes.CREATED).json({ order, clientSecret: order.clientSecret });
};


const updateOrder = async (req, res) => {
    const { id: orderId } = req.params;
    const { paymentIntentId } = req.body;
  
    const order = await Order.findOne({ _id: orderId });
  
    if (!order) {
      throw new CustomError.NotFoundError('The specified order was not found');
    }
  
    // Ensure the current user has the right permissions
    checkPermissions(req.user, order.user);
  
    // Update fields
    order.paymentIntentId = paymentIntentId;
    order.status = 'paid';
  
    // Save the updated document
    await order.save(); // ✅ save on the document instance
  
    res.status(StatusCodes.OK).json({ order });
  };
  

module.exports = {getAllOrders,getSingleOrder,getCurrentUserOrder,createOrder,updateOrder}
