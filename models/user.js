import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

// As in the next js we are using lambda function so route will be created every time it is called, which ,
// means it can duplicate the models every time it create a new one, here we can take advantage of "models"
// which stores all the registered models and that's we can make a check "models.User"
const User = models.User || model("User", UserSchema);

export default User;
