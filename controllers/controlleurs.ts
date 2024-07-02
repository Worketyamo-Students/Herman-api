import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { HttpCode } from "../src/core/constants";
// import { Console } from "console";

const prisma = new PrismaClient()

const controllers = {
    getALLProjet: async(req: Request, res: Response) =>{
        try {
            const tout = await prisma.projets.findMany();
            res.json(tout).status(HttpCode.OK)
        } catch (error) {
           console.error(error) 
        }
    },
    getAoneProjet: async (req: Request, res: Response) =>{
        const {id} = req.params
        const facture = await prisma.projets.findFirst({
            where: {
                projet_id: id
            }
            
        })
        if (!id){
            await res.json().status(HttpCode.NOT_FOUND)
        }
        await res.json(facture).status(HttpCode.OK)
    },
     
    postProjet: async ( req: Request, res: Response) =>{
        
            try {
                 const {title, description} = req.body;
                 const result = await prisma.projets.create({
            data: {
                title,
                description
            }
            })
            await res.json(result).status(HttpCode.OK)
            } catch (error) {
               console.error(error) 
            }
        
    },
    putProjet: async (req:Request, res:Response) =>{
        try {
            const { id } = req.params
            const { title,description} = req.body
            const projets = await prisma.projets.update({
                where: { projet_id: id},
                data: {
                    title,
                    description
                }
            })
            await res.json(projets).status(HttpCode.OK)
        } catch (error) {
            console.error(error);
            
        }
    },
    deleteProjet: async (req:Request, res:Response) =>{
        try {
            const { id } = req.params
            const projets = await prisma.projets.delete({
                where: { projet_id: id},

            })
            if (!id){
                 await res.json('id').status(HttpCode.NOT_FOUND);
                }
            await res.json("msg: le projet a étè supprimer"+ projets).status(HttpCode.OK)
        } catch (error) {
            console.error(error);
            
        }
    }

}


export default controllers