import axios from "axios"
import { Request, Response } from "express"
import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const test = (req: Request, res: Response) => {
    res.status(200).json({
        message: "This is the controller so this app is working fine"
    })
}

export const seedDb = async (req: Request, res: Response) => {
    try {
        const { data } = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json")

        const dbData = await prisma.item.createMany({
            data
        })

        res.status(200).json({
            dbData
        })

    } catch (e) {
        console.error("Something went wrong in the seedDb controller", e)
        res.status(400).json({
            message: "Something went wrong in the seedDb controller"
        })
    }
}

export const getTransactions = async (req: Request, res: Response) => {
    try {
        console.log("This is the query you are lookin for : ", req.query)
        const take = 10;
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * take
        const results = await prisma.item.findMany({
            skip,
            take
        })
        res.status(200).json(results)

    } catch (e) {
        console.error("Something went wrong in the getTransactions controller : ", e)

        res.status(400).json({
            message: "Something wet wrong in the getTransactions controller"
        })
    }
}