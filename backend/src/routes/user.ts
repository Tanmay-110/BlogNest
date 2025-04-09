import { signupInput, signinInput } from "@tanmay01/medium-common";
import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
      c.status(411);
      return c.json({
          message: "Inputs not correct"
      })
  }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
      const user = await prisma.user.create({
        data: {
          username: body.username,
          password: body.password,
          name: body.name,
        }
      })
      const jwt = await sign({
        id: user.id
      }, c.env.JWT_SECRET);
  
      return c.json({ 
        jwt,
        userId: user.id 
      });
    } catch (error) {
      console.error(error)
      return c.text('Error signing up', 500)
    }
  })
  userRouter.post('/signin',async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: body.username,
          password: body.password,
        }
      })
      if (!user) {
        return c.text('User not found', 404)
      }
      const jwt = await sign({
        id: user.id
      }, c.env.JWT_SECRET);
  
      return c.json({ 
        jwt,
        userId: user.id 
      });
    } catch (error) {
      console.error(error)
      return c.text('Invalid', 411)
    }
  })