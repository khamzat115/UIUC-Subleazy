import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Home} from "./pages/home";
import {Auth} from "./pages/auth";
import {NewPost} from "./pages/new-post";
import {MyPosts} from "./pages/my-posts";
import {Navbar} from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/auth" element = {<Auth/>} />
          <Route path = "/new-post" element = {<NewPost/>} />
          <Route path = "my-posts" element = {<MyPosts/>} />
        </Routes>
      </Router>
    </div>
  );
}



export default App;
