import axios from "axios"
import { Request, Response } from "express"
import prisma from "../db"
import { ChartSchema, MonthStatSchema } from "../types"


export const test = (req: Request, res: Response) => {
    res.status(200).json({
        message: "This is the controller so this app is working fine"
    })
}

export const seedDb = async (req: Request, res: Response) => {
    try {
        const { data } = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
        // Sir/ma'am I would have put this in the .env file but then there would be no data to seed as I have not defined any data for seeding and just used the values provided by the company

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
        console.log("This is your req.body : ", req.body)
        console.log("This is the query you are lookin for : ", req.query)
        const search = (req.query.search as string) || " ";
        const month = req.query.month as string || "3"
        const take = 10;
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * take
        const results = await prisma.item.findMany({
            skip,
            take,
            where: {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    {
                        description: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    {
                        price: {
                            contains: search,
                            mode: "insensitive"
                        },
                    }
                ],
                dateOfSale: {
                    contains: `-${month.padStart(2, "0")}-`
                }
            }

        })
        res.status(200).json(results)

    } catch (e) {
        console.error("Something went wrong in the getTransactions controller : ", e)

        res.status(400).json({
            message: "Something wet wrong in the getTransactions controller"
        })
    }
}


export const monthStats = async (req: Request, res: Response) => {

    try {
        // console.log("Your req.body : ", req.body)
        const month = (req.query.month as string) || "3" 
        const parsedData = MonthStatSchema.safeParse(month);
        if (!parsedData.success) {
            res.status(400).json({
                message: "zodd validatin failed in monthStats controller",
                parsedData
            })
            return;
        }

        if (!month) {
            res.status(400).json({ message: "Month and year are required." });
            return;
        }
        let totalAmount = 0;
        let soldItemsCount = 0;
        let unSoldItemsCount = 0;

        const results = await prisma.item.findMany({
            where: {
                dateOfSale: {
                    contains: `-${month.padStart(2, "0")}-`
                },
            },
        });

        results.forEach(item => {
            totalAmount += Number(item.price!)
            if (item.sold) soldItemsCount++
            else unSoldItemsCount++
        })

        res.status(200).json({
            totalAmount,
            soldItemsCount,
            unSoldItemsCount
        });
    } catch (e) {
        console.error("Something went wrong in the monthStats controller:", e)

        res.status(400).json({
            message: "Something went wrong in the monthStats controller",
        });
    }

}

export const getBarChartForMonth = async (req: Request, res: Response) => {

    try {
const month = (req.query.month as string) || "3"
        const parsedData = ChartSchema.safeParse(month);
        if (!parsedData.success) {
            res.status(400).json({
                message: "zod validation failed in getBarChartForMonth controller"
            })
            return
        }

        

        const items = await prisma.item.findMany({
            where: {
                dateOfSale: {
                    contains: `-${month.padStart(2, "0")}-`
                }
            }
        });

        const priceRanges = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: Infinity },
        ];

        const barChartRange = priceRanges.map(range => {
            const count = items.filter(item => {
                return Number(item.price) >= range.min && Number(item.price) <= range.max
            }).length

            return { range: range.max === Infinity ? "> 900" : `${range.min} - ${range.max}`, count }

        })

        res.status(200).json(
            {
                items,
                barChartRange
            }
        );

    } catch (e) {
        console.error("Something went wrong in getBarChartMonth : ", e)
    }


}

export const getPieChartForMonth = async (req: Request, res: Response) => {
    try {
        const month = (req.query.month as string) || "3"
        const parsedData = ChartSchema.safeParse(month);
        if (!parsedData.success) {
            res.status(400).json({
                message: "zod validation failed in getPieChartForMonth controller"
            })
            return
        }

        const items = await prisma.item.findMany({
            where: {
                dateOfSale: {
                    contains: `-${month.padStart(2, "0")}-`
                }
            }
        });

        const categoryMap = new Map<string, number>()

        items.forEach(item => {
            const currentCount = categoryMap.get(item.category) || 0
            categoryMap.set(item.category, currentCount + 1)
        })

        const result = Array.from(categoryMap, ([category, count]) => ({
            category,
            count,
        }));

        console.log("This is your map : ", categoryMap)

        res.status(200).json(
            {
                result,
                items
            }
        )
    } catch (e) {
        console.error("Something went wrong in the getPieChartForMonth controller : ", e)
    }

}