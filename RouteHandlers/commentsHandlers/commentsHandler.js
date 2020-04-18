const Article = require("../../models/ArticleModels/Article");
const Comments = require("../../models/commentsModel/CommentsModel");

// creating a comment

const addComment = async (req, res) => {
  const { comment } = req.body;

  const articleToComment = await Article.findById(req.params.articleId);
  if (articleToComment) {
    try {
      const newComment = new Comments({
        comment,
        commentedAt: new Date(),
      });

      await newComment.save();
      articleToComment.comments.push(newComment);
      await articleToComment.save();
      res.status(201).json({ newComment, message: "commented" });
    } catch (err) {
      res.json({ message: "Error commenting on this post" });
    }
  } else {
    res.json({ message: "Problem finding article" });
  }
};

// edit comment

const editComment = async (req, res) => {
  const commentIsAvailable = await Comments.findById(req.params.commentId);
  if (commentIsAvailable) {
    const { comment } = req.body;
    const editedComment = await Comments.updateOne(
      { _id: req.params.commentId },
      { $set: { comment } }
    );
    res.status(201).json({ editedComment, message: "Comment edited" });
  } else {
    res.json({
      message: "The comment you are trying to edit is not available",
    });
  }
};

// delete comment

const deleteComment = async (req, res) => {
  const commentExists = await Comments.findById(req.params.commentId);
  if (commentExists) {
    await Comments.deleteOne({ _id: req.params.commentId });
    res.status(200).json({ message: "Comment deleted" });
  } else {
    res.json({ message: "Problem finding this comment" });
  }
};
module.exports = { addComment, editComment, deleteComment };
