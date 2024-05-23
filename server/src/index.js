import express from 'express'; // to create API
import cors from 'cors'; // to communicte btwn frontend and backend
import mongoose from 'mongoose';
// nodemon (using start script) to automatically 
// restart the server when changes are made

import {UserRouter} from './routes/users.js';
import {PostRouter} from './routes/posts.js';

const app = express();

app.use (express.json());
app.use(cors());

app.use("/auth", UserRouter); // any route that starts with /auth will be redirected to UserRouter
app.use("/posts", PostRouter); // any route that starts with /posts will be redirected to PostRouter

//make password hidden
mongoose.connect("mongodb+srv://kahmilh115:Akinlawon115.@subleazy.xjdkln3.mongodb.net/subleazy?retryWrites=true&w=majority");

app.listen(3001, () => console.log('Server is running on port 3001')); 