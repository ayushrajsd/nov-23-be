const mongoose = require("mongoose"); // commonjs module
/**
 * require vs imports -> 
 * import is ES6 module
 * require is commonjs module
 * import is done at compilation time
 * require is done at runtime
 */

/** schemas */

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
      minlength: 10,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    confirmPassword: {
      type: String,
      minlength: 8,
      validate: {
        validator: function () {
          return this.password === this.confirmPassword;
        },
        message: "Password and confirm password should be same",
      },
     
    },
    token: String,
    otpExpiry: Date,
  });

  userSchema.pre("save",function(){
    this.confirmPassword = undefined;
  })
  
  
  /** models */
  const User = mongoose.model("User", userSchema);

  module.exports = User;

