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