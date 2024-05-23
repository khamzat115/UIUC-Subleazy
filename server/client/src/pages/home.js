import React, { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]); // to keep track of saved posts
    const user_id = window.localStorage.getItem("userID");
    useEffect(() => { // to get all posts everytime the page is loaded
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3001/posts");
                setPosts(response.data); // return the posts from the database
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchSavedPosts = async () => { // to get all saved posts of a user
            try{
                const response = await axios.get(`http://localhost:3001/posts/bookmarks/ids/${user_id}`);
                setSavedPosts(response.data.bookmarks);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPosts();
        fetchSavedPosts();
    }, []);
    const savePost = async (post_id) => { // to save a post to the user's bookmarks
        try{
            const response = await axios.put("http://localhost:3001/posts", {user_id, post_id});
            console.log(response);
            setSavedPosts(response.data.savedPosts); //? add the post to the saved posts
        } catch (error) {
            console.log(error);
        }
    };
    
    const isBookmarked = (post_id) => savedPosts.includes(post_id); // to check if a post is bookmarked

    return (
        <div>
            <h1>Listings</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <h2>{post.name}</h2>
                        <button onClick={() => savePost(post._id)} 
                            disabled= {isBookmarked(post._id)}>
                                {isBookmarked(post._id) ? "Bookmarked" : "Bookmark"}  {/*change button text based on bookmark status*/}
                                </button> 
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