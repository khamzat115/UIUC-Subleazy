import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }],
    userposts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }]
});

export const UserModel = mongoose.model("users", userSchema);