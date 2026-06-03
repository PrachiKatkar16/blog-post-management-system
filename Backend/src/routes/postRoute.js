const express=require('express')
const {createPost,getPosts,getPostById,updatePost,deletePost,searchPosts,exportPostsToCsv}=require('../controllers/postController')

const router=express.Router();

router.post('/',createPost);
router.get("/", getPosts);
router.get("/search", searchPosts);
router.get("/export", exportPostsToCsv);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
