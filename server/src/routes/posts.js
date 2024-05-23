import express from 'express';
import mongoose from 'mongoose';
import { PostModel } from '../models/post.js';
import { UserModel } from '../models/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try { // try to get all posts
        const posts = await PostModel.find();
        res.json(posts);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.post('/', async (req, res) => { // create a new post and add to database
    const post = req.body; // get the post from the request body
    const newPost = new PostModel(post);
    try {
        await newPost.save();
        res.json(newPost);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.put("/", async (req, res) => { // to attribute a post to a user (bookmark)
    const post  = await PostModel.findById(req.body.post_id); // find the post to attribute
    const user = await UserModel.findById(req.body.user_id);
    try{
        user.bookmarks.push(post);
        await user.save();
        res.json ({bookmarks: user.bookmarks}); // return updated bookmarks to the user
    } catch (err) {
        res.json(err);
    }
});

router.get("/bookmarks/ids/:user_id", async (req, res) => { // get all bookmarks(only ids) of a user
    try{
        const user = await UserModel.findById(req.params.user_id);
        res.json({bookmarks: user?.bookmarks});
    } catch (err) {
        res.json(err);
    }

});

router.get("/bookmarks/:user_id", async (req, res) => { // get all bookmarks(details) of a user
    try{
        const user = await UserModel.findById(req.params.user_id);
        const bookmarks = await PostModel.find({_id: {$in: user.bookmarks}});
        res.json({bookmarks});
    } catch (err) {
        res.json(err);
    }
});

export { router as PostRouter};