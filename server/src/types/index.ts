import { z } from "zod";

export const MonthStatSchema = z.object({
    year: z.string().min(4).max(4),
    month: z.string().min(2).max(2)
})

export const ChartSchema = z.object({
    month: z.string().min(1).max(2)
})