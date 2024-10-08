import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput,signinInput } from "@adarsh9977/medium-common";
export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET:   string
    }
}>();

userRouter.post('/signup', async(c)=>{
    console.log("signup pe a gye");
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    console.log(body);
    const {success}= signupInput.safeParse(body);
    if(!success){
        c.status(411)
        return  c.json({
            msg: "inputs are not correct"
        })
    }
    
    try {
        const user = await prisma.user.create({
            data:{
                email:    body.email,
                password: body.password,
                name:     body.name
            },
        }) 
    const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({
        token: jwt
    })
    } catch (error) {
        return c.json({error});
    }
})

userRouter.post('/signin', async(c) =>{
    console.log("hello dkjnbdf");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json() 
    console.log(body);
    
    const {success}= signinInput.safeParse(body);
    if(!success){
        c.status(411)
        return  c.json({
            msg: "inputs are not correct"
        })
    }
    const user= await prisma.user.findUnique({
      where:{
        email: body.email,
      }
    })
    if(!user){
      c.status(403);
      return c.json({
        msg: "user not found"
      })
    }
    const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({ jwt });
  })