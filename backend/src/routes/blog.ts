import express from 'express';
import { PrismaClient } from '@prisma/client';
import { createBlogInput, updateBlogInput } from "@tanmay01/medium-common";
import jwt from 'jsonwebtoken';

export const blogRouter = express.Router();

// Authentication middleware for routes that require login
const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization || "";
    
    if (!authHeader) {
      return res.status(403).json({
        message: "Authorization header missing"
      });
    }
    
    const verified = jwt.verify(authHeader, req.env.JWT_SECRET);
    if (verified) {
      req.userId = (verified as any).id;
      next();
    } else {
      return res.status(403).json({
        message: "You are not logged in"
      });
    }
  } catch (error) {
    return res.status(403).json({
      message: "Invalid token"
    });
  }
};

// Apply auth middleware to routes requiring authentication
blogRouter.post('/', authMiddleware);
blogRouter.put('/', authMiddleware);
blogRouter.delete('/:id', authMiddleware);

blogRouter.post('/', async (req: any, res: any) => {
  try {
    const body = req.body;
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      return res.status(411).json({
        message: "Inputs not correct"
      });
    }
    
    const authorId = req.userId;
    const prisma = new PrismaClient({
      datasourceUrl: req.env.DATABASE_URL,
    });

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId)
      }
    });

    return res.json({
      id: blog.id
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    return res.status(500).json({
      message: "Error creating blog post"
    });
  }
});

blogRouter.put('/', authMiddleware, async (req: any, res: any) => {
  try {
    const body = req.body;
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      return res.status(411).json({
        message: "Inputs not correct"
      });
    }

    const prisma = new PrismaClient({
      datasourceUrl: req.env.DATABASE_URL,
    });

    const blog = await prisma.post.update({
      where: {
        id: body.id
      }, 
      data: {
        title: body.title,
        content: body.content
      }
    });

    return res.json({
      id: blog.id
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return res.status(500).json({
      message: "Error updating blog post"
    });
  }
});

// Delete a blog post - only the author can delete their own post
blogRouter.delete('/:id', async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    
    const prisma = new PrismaClient({
      datasourceUrl: req.env.DATABASE_URL,
    });

    // First check if the blog exists and belongs to the current user
    const blog = await prisma.post.findFirst({
      where: {
        id: Number(id)
      }
    });
    
    if (!blog) {
      return res.status(404).json({
        message: "Blog post not found"
      });
    }
    
    // Check if the user is the author of the blog
    if (blog.authorId !== Number(userId)) {
      return res.status(403).json({
        message: "You can only delete your own blog posts"
      });
    }
    
    // Delete the blog post
    await prisma.post.delete({
      where: {
        id: Number(id)
      }
    });
    
    return res.json({
      message: "Blog post deleted successfully"
    });
  } catch (e) {
    console.error('Error deleting blog:', e);
    return res.status(500).json({
      message: "Error while deleting blog post"
    });
  }
});

// Get all blogs
blogRouter.get('/bulk', async (req: any, res: any) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: req.env.DATABASE_URL,
    });
    
    const blogs = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    });

    return res.json({
      blogs: blogs.map(blog => ({
        ...blog,
        authorName: blog.author?.name || "BlogNest User"
      }))
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({
      message: "Error fetching blogs"
    });
  }
});

// Get a single blog
blogRouter.get('/:id', async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const prisma = new PrismaClient({
      datasourceUrl: req.env.DATABASE_URL,
    });

    const blog = await prisma.post.findFirst({
      where: {
        id: Number(id)
      },
      include: {
        author: {
          select: {
            name: true
          }
        }
      }
    });
    
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }
    
    return res.json({
      blog: {
        ...blog,
        authorName: blog.author?.name || "BlogNest User"
      }
    });
  } catch(e) {
    console.error('Error fetching blog:', e);
    return res.status(411).json({
      message: "Error while fetching blog post"
    });
  }
});