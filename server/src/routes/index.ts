import express from "express"
import { getTransactions, seedDb, test } from "../controllers";

const router = express.Router()

router.get("/test-router-controller", test)
router.get("/seed-data", seedDb)
router.get("/get-transaction", getTransactions)

export { router };