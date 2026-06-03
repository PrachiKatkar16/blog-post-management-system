const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },

    authorName: {
      type: String,
      required: [true, "Author name is required"],
    },

    authorEmail: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },

    tags: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
      required: true,
    },

    thumbnailUrl: {
      type: String,
      required: [true, "Thumbnail URL is required"],

    },

    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      maxlength: [300, "Short description cannot exceed 300 characters"],
    },

    content: {
      type: String,
      required: [true, "Post content is required"],
      minlength: [20, "Content must be at least 20 characters"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);