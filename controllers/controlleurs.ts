import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { HttpCode } from "../src/core/constants";
// import { Console } from "console";
import bcrypt  from  "bcrypt" ;
import nodemailer from "nodemailer"
import sendMailer from "../src/mail/sendmail";
const prisma = new PrismaClient()

const controllers = {
    getALLUser: async(req: Request, res: Response) =>{
        try {
            const tout = await prisma.users.findMany();
            res.json(tout).status(HttpCode.OK)
        } catch (error) {
           console.error(error) 
        }
    },
    getOneUser: async (req: Request, res: Response) =>{
        const {id} = req.params
        const facture = await prisma.users.findFirst({
            where: {
                user_id: id
            }
            
        })
        if (!id){
            await res.json().status(HttpCode.NOT_FOUND)
        }
        await res.json(facture).status(HttpCode.OK)
    },
     
   postuser: async ( req: Request, res: Response) =>{
        
            try {
            const {name, email, password, age }=req.body
            const crypt =   await bcrypt.hash ( password ,  10 ) ;
            const result= await prisma.users.create({
                data:{
                    name,
                    email ,
                    password :crypt,
                    age 
                }
            })
             await sendMailer(email,"bonjour", "Ceci est un e-mail de test envoyé à l'aide de Nodemailer pour votre bien être."  )
            
            
             await res.json(result).status(HttpCode.OK)
            } catch (error) {
               console.error(error) 
            }
        
    }, 
    putUser: async (req:Request, res:Response) =>{
        try {
            const { id } = req.params
            const {name, email, age, }=req.body
            const users = await prisma.users.update({
                where: { user_id: id},
                data: {
                   name,
                   email,
                   age
                }
            })
            await res.json(users).status(HttpCode.OK)
        } catch (error) {
            console.error(error);
            
        }
    },
    deleteUser: async (req:Request, res:Response) =>{
        try {
            const { id } = req.params
            const users = await prisma.users.delete({
                where: { user_id: id},

            })
            if (!id){
                 await res.json('id').status(HttpCode.NOT_FOUND);
                }
            await res.json("msg: l'user a étè supprimer"+ users).status(HttpCode.OK)
        } catch (error) {
            console.error(error);
            
        }
    },
    deleteAllUser: async (req:Request, res:Response) =>{
        try {
             await prisma.users.deleteMany()   
            res.json("tout le monde est partie")
           } catch (error) {
            console.error(error);
            
        }
    }

}


export default controllers