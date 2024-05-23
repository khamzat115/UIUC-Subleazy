import React, { useEffect, useState } from "react";
import axios from "axios";

export const MyPosts = () => {
    const [savedPosts, setSavedPosts] = useState([]);
    const user_id = window.localStorage.getItem("userID");

    useEffect(() => { // to get all posts everytime the page is loaded
        const fetchSavedPosts = async () => { // to get all saved posts of a user
            try{
                const response = await axios.get(`http://localhost:3001/posts/bookmarks/${user_id}`);
                setSavedPosts(response.data.bookmarks);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSavedPosts();
    }, []);
    return (
        <div>
            <h1>Bookmarks</h1>
            <ul>
                {savedPosts.map((post) => (
                    <li key={post._id}>
                        <h2>{post.name}</h2>
                        <p>{post.address}</p>
                        <p>Rent: {post.rent}</p>
                        <p>{post.description}</p>
                        <img src={post.image} alt="apartment image" />
                        <p>Phone Number: {post.contact}</p>
                    </li>
                ))}
            </ul>

        </div>
    );
    }