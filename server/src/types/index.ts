import { z } from "zod";

export const MonthStatSchema = z.string().max(2)

export const ChartSchema = z.string().max(2)
