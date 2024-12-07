import { z } from "zod";

export const TransactionSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    sold: z.boolean(),
    image: z.string()
})

export const BarChartSchema = z.object({
    range: z.string(),
    count: z.number()
})

export const PieChartSchema = z.object({
    category: z.string(),
    count: z.number()
})