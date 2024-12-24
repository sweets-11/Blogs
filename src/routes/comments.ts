import { Router } from 'express';
import { createComment } from '../controllers/comments.js';
import { isAuthenticated } from '../middleware/auth.js';
const route = Router();

// static routes
route.post('/create/:id', isAuthenticated, createComment);

export default route;
