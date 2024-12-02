import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();

        if (!users) {
            res.status(404).json({
                success: false,
                message: 'No users found.'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'List of all users.',
            data: users
        });

        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            data: error
        });
        return;
    }
}

// Get user by id
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {id: id }
        });

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found.'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'User found.',
            data: user
        });

        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            data: error
        });
        return;
    }
}

// Create user
export const createUser = async (req: Request, res: Response) => {
    const { email, firstName, lastName } = req.body;

    try {
        const exisitingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (exisitingUser) {
            res.status(400).json({
                success: false,
                message: 'User already exists.',
                data: exisitingUser
            });
            return;
        }

        // Generate 24 character hex string
        const userId = new ObjectId();

        const user = await prisma.user.create({
            data: {
                id: userId.toHexString(),
                email: email,
                firstName: firstName,
                lastName: lastName
            }
        });

        res.status(200).json({
            success: true,
            message: 'User created successfully.',
            data: user
        });

        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            data: error
        });
        return;
    }
}

// Update user
export const updateUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, firstName, lastName } = req.body;

    try {
        const user = await prisma.user.update({
            where: { id: id },
            data: {
                email: email,
                firstName: firstName,
                lastName: lastName
            }
        });

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found.'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully.',
            data: user
        });

        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            data: error
        });
        return;
    }
}

// Delete user
export const deleteUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.delete({
            where: { id: id }
        });

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found.'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully.',
            data: user
        });

        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            data: error
        });
        return;
    }
}
