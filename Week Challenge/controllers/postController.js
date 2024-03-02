const {getAllPosts, createPost ,updatePost , postToDelete} = require('../models/post');


const getPost = (req,res)=>{
    posts = getAllPosts() ;
    res.send(posts)
};

const addPost = (req, res) => {
    const newpost = req.body;
    let post = createPost(newpost)
    res.status(201).send(post);
};

const patchPost = (req, res) => {
  let bod = req.body;
  let name = req.params.name;
  let post = updatePost(name , bod)
  res.status(201).send(post);
  
};
const deletePost = (req, res) => {
  let title = req.params.name;
  let post = postToDelete(title);
  res.status(201).send(post);
}

module.exports = { getPost, addPost, patchPost ,deletePost};