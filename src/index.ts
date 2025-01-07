import express, { Request, Response } from 'express';
import { getUsers, getUserById, createUser, updateUserById, deleteUserById } from './controllers/user.route';
import { rateLimiter } from './middleware/rateLimiter';
import cors from "cors";

const app = express();

// Add origins to allow CORS
const allowedOrigins = ['http://localhost:10000', 'https://rest-crud-api.onrender.com', 'https://remix-users-app.vercel.app'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());

/**
 * ---------------------------
 * ROOT
 * ---------------------------
**/

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to cal-dev-lab\'s REST API 🚀',
    });
});

/**
 * ---------------------------
 * USERS
 * ---------------------------
**/

app.get('/users', rateLimiter, getUsers);
app.get('/users/:id', rateLimiter, getUserById);
app.post('/users', rateLimiter, createUser);
app.put('/users/:id', rateLimiter, updateUserById);
app.delete('/users/:id', rateLimiter, deleteUserById);

/**
 * ---------------------------
 * PORT
 * ---------------------------
**/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server active on port: ${PORT}`);
});

// TODO:
/**
 * Add user roles
 * Add middleware validation with Zod
 */
