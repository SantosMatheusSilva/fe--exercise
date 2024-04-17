const express = require('express');
const router = express.Router();
const {isAuthenticated} =  require ("../middleware/jwt.middleware.js");
const db = require('../db.json'); 

// Posts routes bellow:

// Route to fetch all posts
router.get('/posts', (req, res) =>{
    return res.status(200).json(db.posts);
} );

// Route to fetch post by post ID
router.get('/posts/:postId', (req, res) =>{
    const postId = req.params.postId;
    const post = db.posts.find(post => post.postId === postId);
    try{
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "Post not found"});
        }
    } catch (error) {
        console.error('Error fetching post data:', error);
        res.status(500).json({message: "Error fetching post data"});
    }
})

// route to fetch posts by user ID
router.get("/users/:userId/posts",  (req, res) => {
    const userId = req.params.userId;
    const posts = db.posts.filter(post => post.userId === userId);
    try{
        if(posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({message: "Posts not found"});
        }
    } catch (error) {
        console.error('Error fetching post data:', error);
        res.status(500).json({message: "Error fetching post data"});
    }
})

// Route to create a new post
router.post("/users/:userId/posts", (req,res)=>{
    const {userId} = req.params;
    const {imageUrl, title, text} = req.body;
    try {
        // Creat a timestamp for when the post was created
        const postedAt = new Date().toISOString();

        // Check if required fields are provided
        if (!title || !text) {
            return res.status(400).json({ message: 'Missing required fields' }); 
        }

         // Generate a unique ID for the new post
         const postId = generateUniqueId();

         // Create a new post object
         const newPost = {
            id: postId,
            userId,
            imageUrl: imageUrl || "",
            title,
            text,
            postedAt
         };
         
         // Add the new post to the database
         db.posts.push(newPost);
         // Respond with the newly created post
         res.status(201).json({ message: 'Post created!', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post' });
    }
})

// Route to update a post
router.put("/users/:userId/posts/:postId", (req, res) => {
    const {userId, postId} = req.params;
    const {imageUrl, title, text} = req.body;
    try {
        // Find the index of the post in the database
        const postIndex = db.posts.findIndex(post => post.id === postId && post.userId === userId);
        // If the post is not found
        if (postIndex === -1) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Update the post with the new data
        if (title) db.posts[postIndex].title = title;
        if (text) db.posts[postIndex].text = text;
        if (imageUrl) db.posts[postIndex].imageUrl = imageUrl;

        // Respond with the updated post
        res.status(200).json({ message: 'Post updated', post: db.posts[postIndex] });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Error updating post' });
    }
})

// Route to delete a post
router.delete("/users/:userId/posts/:postId", (req, res) => {
    const {userId, postId} = req.params;
    try{
        // Find the index of the post to be deleted
        const postIndex = db.posts.findIndex(post => post.id === postId && post.userId === userId);
        if(postIndex === -1) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // Remove the post from the database
        db.posts.splice(postIndex, 1);
        // Respond with a success message
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Error deleting post' });
    }
})


/* -------------------------------    ROUTES FOR LIKES   ---------------------------- */

// Route to like a post
router.put('/users/:userId/posts/:postId/like', (req, res) => {
    const {userId, postId} = req.params;
    try {
        // Find the post in the db
        const post = db.posts.find(posts => post.id === postId);

        // Check if the post is found 
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user has already liked the post
        const alreadyLiked = post.likes.some(like => like.userId === userId);
        if (alreadyLiked) {
            return res.status(400).json({ message: 'User has already liked the post' });
        }

        // Add the like to the post like array in the db 
        post.like.push({
            id: generateUniqueId(),
            userId,
            likedAt: new Date().toISOString()
        })
        
        // Save the updated post in the db
        db.posts = db.posts.map(p => (p.id === postId ? post : p));

        // Return the updated post
        res.status(200).json({ message: 'Post liked', post });

    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Error liking post' });
    }
} )

// Route to undo the like 
router.delete('/users/:userId/posts/:postId/like', (req, res) => {
    const {userId, postId, likeId} = req.params;
    try {
        // Find the post in the db
        const post = db.posts.find(posts => post.id === postId);

        // If no post was found send erro
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // check if the user has already liked the post
        const alreadyLiked = post.likes.some(like => like.userId === userId);
        if(!alreadyLiked){
            return res.status(400).json({ message: 'User has not liked the post' });
        }
        // Find the like in the post like array
        const likeIndex = post.likes.findIndex(like => like.id === likeId);

        if (likeIndex === -1) {
            return res.status(404).json({ message: "Like not found" });
        }

        // Check if the user ID associated with the like matches the authenticated user's ID
        if (post.likes[likeIndex].userId !== userId) {
        return res.status(403).json({ message: "You are not authorized to remove this like" });
        }

        // Remove the like from the post's likes array
        post.likes.splice(likeIndex, 1);

        res.status(200).json({ message: "Like removed successfully" });
    } catch (error) {
        console.error('Error removing like:', error);
        res.status(500).json({ message: 'Error removing like' });
    }
})

/* -----------------------------    ROUTES FOR COMMENTS   ---------------------------- */
// Route for adding a comment to a post
router.post('/users/:userId/posts/:postId/comments', (req, res) => {
    const {userId, postId} = req.params;
    const {text} = req.body;
    try {
        // Find the post in the db
        const post = db.posts.find(posts => post.id === postId);
        // Check if the post is found
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // create a comment object
        const comment = {
            id: generateUniqueId(),
            userId,
            text,
            createdAt: new Date().toISOString()
        }
        // Push the new comment into the comments array in the db
        post.comments.push(comment);
        // Return the newly added comment
        res.status(201).json({ message: 'Comment added', comment });
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).json({ message: 'Error adding comment' });
    }
})

// Route to edit a comment
router.put('/users/:userId/posts/:postId/comments/:commentId', (req, res) => {
    const {userId, postId, commentId} = req.params;
    const {text} = req.body;
    try {
        // Find the post in the db
        const post = db.posts.find(posts => post.id === postId);
        // find the comment by its ID and check if it exists
        const comment = post.comments.find(comment => comment.id === commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        // Update the comment with the provided text value
        Object.assign(comment, { text });
        // Respond with updated comment
        res.status(200).json({ message: 'Comment updated', comment });
    } catch (err) {
        console.error('Error updating comment:', err);
        res.status(500).json({ message: 'Error updating comment' });
        }
})

// Route to delete a comment
router.delete('/users/:userId/posts/:postId/comments/:commentId', (req, res) => {
    const {userId, postId, commentId} = req.params;
    try {
        // Find the post in the db
            const post = db.posts.find(posts => post.id === postId);
            if(!post){
                return res.status(404).json({ message: 'Post not found' });
            }
           // Find the comment by its ID and check if it exists
            const commentIndex = post.comments.findIndex(comment => comment.id === commentId);
            if (commentIndex === -1) {
                return res.status(404).json({ message: 'Comment not found' });
            }

            // Remove the comment from the comments array
            const deletedComment = post.comments.splice(commentIndex, 1)[0];

            // Respond with deleted comment
            res.status(200).json({ message: 'Comment deleted', comment: deletedComment });
        } catch (err) {
        console.error('Error deleting comment:', err);
        res.status(500).json({ message: 'Error deleting comment' });
}
});

module.exports = router