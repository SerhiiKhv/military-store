import {model, models, Schema} from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String},
    phone: {type: String},
    image: {type: String},
    admin: {type: Boolean, default: false},
    resetToken: {type: String, required: false},
    resetTokenExpiry: {type: String, required: false}
}, {timestamps: true});

UserSchema.post('validate', function (user) {
    const notHashedPassword = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(notHashedPassword, salt);
})

export const User = models.User || model("User", UserSchema);
