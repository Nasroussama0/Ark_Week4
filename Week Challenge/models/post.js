const fs = require('fs');

function getAllPosts(){
    let posts = JSON.parse(fs.readFileSync('./models/posts.json'));
    return posts;
}

function createPost(post){
    const posts = getAllPosts()
    posts.push(post);
    fs.writeFileSync('./models/posts.json', JSON.stringify(posts));
    return posts
}

function updatePost(upd,bod){
    posts = getAllPosts();
  let postToUpdate = posts.find((x) => x.title === upd);
  const index = posts.indexOf(postToUpdate);
  let updatedPost = Object.assign(postToUpdate, bod);
  posts[index] = updatedPost;
  fs.writeFileSync("./models/posts.json", JSON.stringify(posts));
  return posts;
}

function postToDelete(title){
    posts = getAllPosts();
  let postToUpdate = posts.find((x) => x.title === title);
  const index = posts.indexOf(postToUpdate);
  posts.splice(index, 1);
  fs.writeFileSync("./models/posts.json", JSON.stringify(posts));
  return posts;
}

module.exports = { getAllPosts, createPost, updatePost, postToDelete };