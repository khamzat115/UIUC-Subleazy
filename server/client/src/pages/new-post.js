import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const NewPost = () => {
    const userID = window.localStorage.getItem("userID");
    const navigate = useNavigate();
    const [post, setPosts] = useState({
        name: "",
        address: "",
        rent: "",
        description: "",
        image: "",
        contact: 0,
        userOwner: userID
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPosts({
            ...post,
            [name]: value // change an attribute of the post
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/posts", post);
            alert("Post created successfully");
            navigate("/"); // redirect to the home page
        } catch (error) {
            alert("Post creation failed");
            console.log(error);
        }
    };
    return (
        <div className = "new-post">
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange = {handleChange} />
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" onChange = {handleChange}/>
                <label htmlFor="rent">Rent</label>
                <input type="text" id="rent" name="rent" onChange = {handleChange}/>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" onChange = {handleChange}/>
                <label htmlFor="image">Image URL</label>
                <input type="text" id="image" name="image" onChange = {handleChange}/>
                <label htmlFor="contact">Contact</label>
                <input type="number" id="contact" name="contact" onChange = {handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
    };