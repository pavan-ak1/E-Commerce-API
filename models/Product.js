const mongoose = require("mongoose");


const SingleCartItemsSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  Image:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  amount:{
    type:Number,
    required:true,
  },
  product:{
    type:mongoose.Schema.ObjectId,
    ref:'Product',
    required:true,
  }
})

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide product name"],
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide a desciption for the product"],
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    images: {
      type: String,
      default: "/uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "Please provide product company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews:{
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON:{virtuals:true}, toObject:{virtuals:true} }
);

ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
});

// Corrected pre hook:
ProductSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  const Review = mongoose.model('Review');
  await Review.deleteMany({ product: this._id });
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
