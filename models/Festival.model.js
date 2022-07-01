//const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const festivalSchema = new mongoose.Schema({

// TODO: Please make sure you edit the user model to whatever makes sense in this case
//const festivalSchema = new Schema(
  //{
    name: String,
    date: String,
    location: String,
    station: String,
    image: String,
    price: Number, 
    description: String
  },
  // {
  //   timestamps: true,
  // }
);


festivalSchema.pre("save", function(next) {
  // console.log(this)

  const nameToUpper = this.name.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')

  this.name = nameToUpper

    next();
});


// const Character = model("Character", userSchema);
const Festival = mongoose.model("Festival", festivalSchema);
module.exports = Festival;
