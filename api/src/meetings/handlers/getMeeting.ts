import { getConnection } from "../../database"
import { getFullMeetingsDataQuery } from "./query/getFullRequestData";


export async function getMeeting() {
    const connection = await getConnection();
    const Meeting = await connection?.execute( getFullMeetingsDataQuery()+`ORDER BY 
    development.meetings.end_meeting DESC;`)
    const result = Meeting?.[0]
    return result
}