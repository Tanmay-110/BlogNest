import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@tanmay01/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }, 
    Variables: {
        userId: string;
    }
}>();

// Authentication middleware for routes that require login
const authMiddleware = async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
        // @ts-ignore
        c.set("userId", user.id);
        await next();
    } else {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        });
    }
};

// Apply auth middleware only to routes requiring authentication
blogRouter.post('*', authMiddleware);
blogRouter.put('*', authMiddleware);
blogRouter.delete('*', authMiddleware);

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.update({
        where: {
            id: body.id
        }, 
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: blog.id
    })
})

// Delete a blog post - only the author can delete their own post
blogRouter.delete('/:id', async (c) => {
    const id = c.req.param("id");
    const userId = c.get("userId");
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        // First check if the blog exists and belongs to the current user
        const blog = await prisma.post.findFirst({
            where: {
                id: Number(id)
            }
        });
        
        if (!blog) {
            c.status(404);
            return c.json({
                message: "Blog post not found"
            });
        }
        
        // Check if the user is the author of the blog
        if (blog.authorId !== Number(userId)) {
            c.status(403);
            return c.json({
                message: "You can only delete your own blog posts"
            });
        }
        
        // Delete the blog post
        await prisma.post.delete({
            where: {
                id: Number(id)
            }
        });
        
        return c.json({
            message: "Blog post deleted successfully"
        });
    } catch (e) {
        c.status(500);
        return c.json({
            message: "Error while deleting blog post"
        });
    }
})

// Todo: add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
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

    return c.json({
        blogs: blogs.map(blog => ({
            ...blog,
            authorName: blog.author?.name || "BlogNest User"
        }))
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
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
        })
        
        return c.json({
            blog: blog ? {
                ...blog,
                authorName: blog.author?.name || "BlogNest User"
            } : null
        });
    } catch(e) {
        c.status(411); 
        return c.json({
            message: "Error while fetching blog post"
        });
    }
})