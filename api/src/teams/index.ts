import express from "express"
import { getTeams } from "./handlers/getTeams"



const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const data = await getTeams()
        res.json({teams: data })
    } catch (error) {
        res.send("Something went wrong")
    }
})













export { router }