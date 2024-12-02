import express, { Request, Response } from 'express';
import { getUsers, getUserById, createUser, updateUserById, deleteUserById } from './controllers/user.route';

const app = express();

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

app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.post('/users', createUser);
app.put('/users/:id', updateUserById);
app.delete('/users/:id', deleteUserById);

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
