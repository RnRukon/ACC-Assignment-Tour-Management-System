const Mongoose = require("mongoose");

//schema design
const tourSchema = Mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this data."],
    trim: true,
    unique: [true, "Name must be unique"],
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: [100, "Name is to large"]

  },
  description: {
    type: String,
    required: [true, "please provide a description for this tour"]
  },
  image: {
    type: String,
    required: [true, "please provide a image for this tour"]
  },
  price: {
    type: Number,
    required: [true, "Price must be unique"],
    min: [0, "Please can't be negative"],
  },
  view: {
    type: Number,
    min: [0, "Please can't be negative"],
    default: 0
  }

},
  {
    timestamps: true,
  })

// /model  ----------------
const Tour = Mongoose.model('Tour', tourSchema);

module.exports = Tour