// Necessary imports:
import react from "react";
import axios from "axios";
// Chakra UI imports:


// Components import:
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";


function Feed() {
  return (
    <>
    <CreatePost />
    <PostList />
    </>
  )
}

export default Feed;