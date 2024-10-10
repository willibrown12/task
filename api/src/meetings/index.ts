import express from "express"
import { getMeeting,  } from "./handlers/getMeeting"
import {  createMeeting,  } from "./handlers/createMeeting"
import { z, ZodError } from "zod"
import { filterMeeting, FilterQueryParams } from "./handlers/filterMeeting"





const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const data = await getMeeting ()
        res.json({meetings: data })
    } catch (error) {
        res.send("Something went wrong")
    }
})


router.get("/filter", async (req, res, next) => {
    try {
        const queryParams = req.query
        const { filter } = queryParams
         const data = await filterMeeting(filter as FilterQueryParams)
       res.json({ meetings: data })
    } catch (error) {
        console.log(error)
        res.send("Something went wrong")
    }
})


router.post("/", async (req, res, next) => {

    try {newRequestSchema.parse(req.body)
       
        const newMeeting: MeetingType = extractMeeting(req.body)
        
        
        
        const result = await createMeeting(newMeeting)
        
        
        res.status(201).json({ result });
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            return res.status(400).json("Something went wrong" );
        }
        return res.status(500).json("Something went wrong" );
    }
})


function extractMeeting(body: any): MeetingType {
    const { idteams ,start_meeting,end_meeting, description, room } = body;
    return { idteams ,start_meeting,end_meeting, description, room};
}


export type MeetingType = {

    idteams: number,
    start_meeting: string,
    end_meeting: string,
    description: string,
    room: string
  
}

const idteamsScheme = z.number()
const  startScheme = z.string().datetime();
const  endScheme = z.string().datetime();
const descriptionScheme = z.string().min(5).max(100)
const roomscheme = z.string().min(1).max(10)

const newRequestSchema = z.object({
    
    idteams: idteamsScheme,
    start_meeting: startScheme,
    end_meeting: endScheme,
    description: descriptionScheme,
    room: roomscheme
})





export { router }

