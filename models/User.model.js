const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "Username is required."],
 
  },

  email: {
    type: String,
    required: [true, "Mail is required."],
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: [true, "Password is required."],
  },
  favorites: [
    // {
    //   type: Schema.Types.ObjectId,
    //   ref: "Festivals",
    // },
  ],
  //referencias de la bd characrters
});

const User = model("User", userSchema);

module.exports = User;
