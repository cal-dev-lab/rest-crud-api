import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to cal-dev-lab\'s REST API 🚀',
    });
});

app.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json({
        message: 'List of all users.',
        data: users,
    });
});

app.post('/users', async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const userId = new ObjectId();
    const user = await prisma.user.create({
        data: {
            id: userId.toHexString(),
            name: name,
            email: email
        }
    });
    res.json({
        message: 'User created successfully.',
        data: user,
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server active: http://localhost:${PORT}`);
});

// TODO:
/**
 * Add user roles
 * Add middleware
 * Add validation
 */
