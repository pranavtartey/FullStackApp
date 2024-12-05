import { Request, Response } from "express"

export const test = (req: Request, res: Response) => {
    res.status(200).json({
        message: "This is the controller so this app is working fine"
    })
}