dotEnv.config()
import dotEnv from "dotenv";
import express from "express"
import { router } from "./routes";

const app = express();

const PORT = process.env.PORT ?? 8080

app.use("/api/v1", router);

app.all("*", (req, res) => {
    res.status(200).json({
        message: "I guess this is the catch all route!!"
    })
})

app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
})