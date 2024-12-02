import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();

    res.status(200).json({
        success: true,
        message: 'List of all users.',
        data: users
    });
}

// Get user by id
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
        where: {id: id }
    });

    res.status(200).json({
        success: true,
        message: 'User found.',
        data: user
    });
}

// Create user
export const createUser = async (req: Request, res: Response) => {
    const { email, firstName, lastName } = req.body;

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
}

// Update user
export const updateUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, firstName, lastName } = req.body;

    const user = await prisma.user.update({
        where: { id: id },
        data: {
            email: email,
            firstName: firstName,
            lastName: lastName
        }
    });

    res.status(200).json({
        success: true,
        message: 'User updated successfully.',
        data: user
    });
}

// Delete user
export const deleteUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.delete({
        where: { id: id }
    });

    res.status(200).json({
        success: true,
        message: 'User deleted successfully.',
        data: user
    });
}
