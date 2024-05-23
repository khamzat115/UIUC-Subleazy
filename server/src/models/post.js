import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    rent: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    contact: { type: Number, required: true },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export const PostModel = mongoose.model('posts', postSchema);