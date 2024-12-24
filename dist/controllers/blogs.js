import { Blog } from '../models/blogs.js';
import { Comment } from '../models/comments.js';
import path from 'path';
export const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        console.log(path.resolve('public', 'uploads'), title);
        // Ensure the user is authenticated
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'You must be logged in to create a blog',
            }); // Stop further execution
        }
        console.log(req.file);
        // Create a new blog post
        const newBlog = await Blog.create({
            title,
            content,
            imagePath: `/uploads/${req.file?.filename}`,
            createdBy: req.user?._id,
        });
        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            data: newBlog,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the blog',
        });
    }
};
export const allBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('createdBy');
        res.render('allBlogs', { blogs });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
export const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blogs = await Blog.findById({ _id: id });
        if (!blogs) {
            res.status(404).json({
                success: false,
                message: `Blog with id ${id} doesn't exist`,
            });
            return; // Stop further execution
        }
        console.log('====================================');
        console.log(blogs);
        console.log('====================================');
        const comments = await Comment.find({ blogId: id }).populate('createdBy');
        console.log('====================================');
        console.log(comments);
        console.log('====================================');
        res.render('home', { blogs, comments });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
