const PostRepository = require("../repositories/post.repository");

exports.getPost = async (id) => {
  const post = await PostRepository.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

exports.getPostsByUser = async (userId, page, limit) => {
  return await PostRepository.findByUserId(userId, page, limit);
};

exports.getAllPosts = async (page, limit) => {
  return await PostRepository.findAll(page, limit);
};

exports.createPost = async (userId, postData) => {
  return await PostRepository.create({ userId, ...postData });
};

exports.updatePost = async (id, userId, updateData) => {
  const post = await PostRepository.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }
  if (post.userId !== userId) {
    throw new Error("Unauthorized to update this post");
  }
  const updated = await PostRepository.updateById(id, updateData);
  if (!updated) {
    throw new Error("Update failed");
  }
  return await PostRepository.findById(id);
};

exports.deletePost = async (id, userId) => {
  const post = await PostRepository.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }
  if (post.userId !== userId) {
    throw new Error("Unauthorized to delete this post");
  }
  const deleted = await PostRepository.deleteById(id);
  if (!deleted) {
    throw new Error("Delete failed");
  }
  return { message: "Post deleted" };
};
