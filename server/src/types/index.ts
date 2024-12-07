import { z } from "zod";

export const MonthStatSchema = z.object({
    month: z.string().max(2)
})

export const ChartSchema = z.object({
    month: z.string().max(2)
})