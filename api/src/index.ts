import express from "express"
import  { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"
import { router as meetingsRouter } from "./meetings"
import { router as teamsRouter } from "./teams"

import bodyParser from "body-parser"
import cors from "cors"
dotenv.config()
const app = express()
console.log("Application Start")
app.use(cors())
app.use(bodyParser.json())

app.get("/health-check", (req:Request, res:Response, next) => {
    return res.json({ message: "Server is up" })
})

app.use("/meetings",  meetingsRouter)
app.use("/teams", teamsRouter)



app.use((error: Error, req: Request, res: Response, next: NextFunction) => {

    console.log(error.message, res.getHeader("x-request-id"))
    res.status(500).send("Something went wrong!")
})


app.listen(process.env.PORT, () => {
    console.log(`Application Listen to Port: ${process.env.PORT}`)
})