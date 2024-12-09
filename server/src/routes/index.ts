import express from "express"
import { getBarChartForMonth, getPieChartForMonth, getTransactions, monthStats, test } from "../controllers";

const router = express.Router()

router.get("/test-router-controller", test)
// router.get("/seed-data", seedDb)
router.get("/get-transaction", getTransactions)
router.get("/month-stats", monthStats)
router.get("/month-bar-chart", getBarChartForMonth);
router.get("/month-pie-chart", getPieChartForMonth);

export { router };