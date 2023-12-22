const mongoose = require("mongoose"); // commonjs module
const bcrypt = require("bcrypt");
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
      // validate: {
      //   validator: function () {
      //     return this.password === this.confirmPassword;
      //   },
      //   message: "Password and confirm password should be same",
      // },
     
    },
    token: String,
    otpExpiry: Date,
    role:{
      type:String,
      default:"user"
    },
    bookings:{
      type:[mongoose.Schema.ObjectId],
      ref:"Booking"
    }
  });

  const validRoles = ["admin","user","sales"];

  userSchema.pre("save",async function(next){
    console.log("cf", this.confirmPassword)
    console.log("password",this.password)
    if(this.password !== this.confirmPassword){
      next(new Error("Password and confirm password should be same"));
    }

    this.confirmPassword = undefined;
    /** hash the password */
    const hashedPassword = await bcrypt.hash(this.password, 12);
    console.log("hashedPassword", hashedPassword);
    this.password = hashedPassword;

    if(this.role){
      console.log(this.role);
      const isValid = validRoles.includes(this.role);
      if(!isValid){
       throw new Error(`Invalid role ${this.role}`);
      }else{
        next();
      }

    }else {
      this.role = "user";
    }
  })
  
  
  /** models */
  const User = mongoose.model("User", userSchema);

  module.exports = User;

