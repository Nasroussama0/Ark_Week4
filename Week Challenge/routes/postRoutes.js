const router = require('express').Router();
const log = require('../middleware/middleware');
const {getPost , addPost , patchPost ,deletePost} = require('../controllers/postController');



router.get("/",getPost).post("/", addPost).patch("/:name" , patchPost ).delete("/:name" ,deletePost);

module.exports = router;