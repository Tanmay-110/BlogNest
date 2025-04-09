import { signupInput, signinInput } from "@tanmay01/medium-common";
import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const body = req.body;
    const { success } = signupInput.safeParse(body);
    
    if (!success) {
      return res.status(411).json({
        message: "Inputs not correct"
      });
    }
    
    const prisma = new PrismaClient({
      datasourceUrl: (req as any).env.DATABASE_URL,
    });
    
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      }
    });
    
    const token = jwt.sign({
      id: user.id
    }, (req as any).env.JWT_SECRET);
    
    return res.json({
      jwt: token,
      userId: user.id
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error signing up');
  }
});

userRouter.post('/signin', async (req, res) => {
  try {
    const body = req.body;
    const { success } = signinInput.safeParse(body);
    
    if (!success) {
      return res.status(411).json({
        message: "Inputs not correct"
      });
    }
    
    const prisma = new PrismaClient({
      datasourceUrl: (req as any).env.DATABASE_URL,
    });
    
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      }
    });
    
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    const token = jwt.sign({
      id: user.id
    }, (req as any).env.JWT_SECRET);
    
    return res.json({
      jwt: token,
      userId: user.id
    });
  } catch (error) {
    console.error(error);
    return res.status(411).send('Invalid');
  }
});