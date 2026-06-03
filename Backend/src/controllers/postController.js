const Post=require('../models/post.model')
const { Parser } = require("json2csv");

async function createPost(req,res){
    try {
        const post=await Post.create(req.body)
        res.status(201).json({
            message:"Post created sucessfully",
            post
        })
    } catch (error) {
       res.status(400).json({
        message:error.message,
       }) 
    }
}
async function getPosts(req,res){
    try {
        const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
        limit,
      },
    });
    } catch (error) {
      res.status(500).json({
      message: error.message,
    });
  
    }
}
async function getPostById(req,res) {
    try {
        const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      message:"post fetched sucessfully",
      data: post,
    });
        
    } catch (error) {
      res.status(500).json({
      message: error.message,
    });
    }
}
async function updatePost(req,res){
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );
   if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}
async function deletePost(req,res){
  try {
     const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }
    res.status(200).json({
      message: "Post deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}
async function searchPosts(req, res) {
  try {
    const keyword = req.query.keyword || "";
    const category = req.query.category || "";
    const status = req.query.status || "";

    let query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { authorName: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ];
    }

    if (category) {
      query.category = {
        $regex: `^${category}$`,
        $options: "i",
      };
    }

    if (status) {
      query.status = {
        $regex: `^${status}$`,
        $options: "i",
      };
    }

    const posts = await Post.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
async function exportPostsToCsv(req,res){
  try {
    const keyword = req.query.keyword || "";

    const filter = keyword
      ? {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { authorName: { $regex: keyword, $options: "i" } },
            { category: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const posts = await Post.find(filter);
    const fields = [
      "title",
      "authorName",
      "authorEmail",
      "category",
      "status",
      "thumbnailUrl",
      "shortDescription",
      "content",
      "createdAt",
      "updatedAt",
    ];

    const parser = new Parser({ fields });

    const csv = parser.parse(posts);

    res.header("Content-Type", "text/csv");
    res.attachment("posts.csv");

    return res.send(csv);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
module.exports={createPost,getPosts,getPostById,updatePost,deletePost,searchPosts,exportPostsToCsv}