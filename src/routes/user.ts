import { Router } from 'express';
import { register, login, logout } from '../controllers/user.js';
const route = Router();

// static routes
route.get('/register', (req, res) => res.render('register'));
route.get('/login', (req, res) => res.render('login'));

route.post('/register', register);
route.post('/login', login);

route.get('/logout', logout);
export default route;
