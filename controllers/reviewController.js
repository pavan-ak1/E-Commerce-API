const Review = require('../models/Review');
const Product = require('../models/Product');
const CustomError = require('../errors');
const {StatusCodes} = require('http-status-codes')
const {attachCookiesToResponse,checkPermissions} = require('../utils');



const createReviews = async(req,res)=>{
    const {product: productId} = req.body;
    const isValidProduct = await Product.findOne({_id:productId});
    if(!isValidProduct){
        throw new CustomError.NotFoundError('No product with this is');

    }
    const alreadySubmitted = await Review.findOne({
        product:productId, user:req.user.userId
    })
    if(alreadySubmitted){
        throw new CustomError.BadRequestError('Already submitted the review');

    }

    req.body.user = req.user.userId;
    const review  = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({review})
}

const getAllReviews = async(req,res)=>{
    const reviews = await Review.find({}).populate({path:'product', select:'name company price'});
    res.status(StatusCodes.OK).json({reviews, count:reviews.length})

}



const getSingleReviews = async (req, res) => {
    const { id: reviewId } = req.params;
    const review = await Review.findOne({ _id: reviewId });
    if (!review) {
        throw new CustomError.NotFoundError('Review not found');
    }
    res.status(StatusCodes.OK).json({ review });
};

const updateReviews = async(req,res)=>{
    const {id:reviewId} = req.params;
    const {rating,title,comment} = req.body;
    const review = await Review.findOne({ _id: reviewId });
    if (!review) {
        throw new CustomError.NotFoundError('Review not found');
    }
    checkPermissions(req.user, review.user);
    review.rating = rating;
    review.comment = comment;
    review.title = title;
    await review.save();

    res.status(StatusCodes.OK).json({ review });
  
}


const deleteReviews = async(req,res)=>{
   const {id:reviewId} = req.params;
   const review = await Review.findOne({_id:reviewId});
   if(!review){
    throw new CustomError.NotFoundError('Review Not Found');
   }
   checkPermissions(req.user, review.user);

   await Review.findOneAndDelete(review)
    res.status(StatusCodes.OK).json({ msg:"Deleted Review" });
   
}


const getSingleProductReview = async (req, res) => {
    const { id: productId } = req.params;
  
    const productExists = await Product.findOne({ _id: productId });
    if (!productExists) {
      throw new CustomError.NotFoundError(`No product with id: ${productId}`);
    }
  
    const reviews = await Review.find({ product: productId });
    res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
  };
  


module.exports = {getSingleProductReview,createReviews, getAllReviews, getSingleReviews, updateReviews, deleteReviews}