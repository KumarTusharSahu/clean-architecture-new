import mongoose, { Schema } from 'mongoose'


const UserSchema=new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }})

export const User = mongoose.model("User",UserSchema)