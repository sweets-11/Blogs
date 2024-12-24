import { Router } from 'express';
import { createBlog, allBlogs, getSingleBlog } from '../controllers/blogs.js';
import { isAuthenticated } from '../middleware/auth.js';
import { upload } from '../middleware/imageUpload.js';
import { Blog } from '../models/blogs.js';
const route = Router();

// static routes
route.get('/', (req, res) => {
  res.render('createBlogs');
});

route.get('/all', allBlogs);

route.get('/:id', getSingleBlog);

route.post(
  '/createBlog',
  isAuthenticated,
  upload.single('fileImage'),
  createBlog,
);

export default route;
