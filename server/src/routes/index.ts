import express from "express"
import { test } from "../controllers";

const router = express.Router()

router.get("/test-router-controller", test)

export { router };