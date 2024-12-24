import { Request, Response } from 'express';
import { Comment } from '../models/comments.js';
import { Blog } from '../models/blogs.js';
export const createComment = async (req: Request, res: Response) => {
  try {
    const { comment } = req.body;
    const { id } = req.params;
    if (!comment || comment.trim() === '') {
      res
        .status(400)
        .json({ success: false, messege: 'Please fill required fiels' });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
    }

    console.log('====================================');
    console.log('comment', comment, 'blog', blog, id, req.user?._id);
    console.log('====================================');
    Comment.create({
      comment,
      blogId: id,
      createdBy: req.user?._id,
    });
    res.redirect(`/blog/${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
