import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", ""); //clear the cookie
        window.localStorage.clear();
        navigate("/auth");
      };

    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/my-posts">My Posts</Link>
            <Link to="/new-post">New Post</Link>
            {!cookies.access_token ? (
            <Link to="/auth">Login/Register</Link>
            ) : (
            <button onClick={logout}> Logout </button>
        )}
        </div>
    )};
