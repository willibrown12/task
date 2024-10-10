
import { MeetingType } from "..";
import { getConnection } from "../../database"


export async function createMeeting(request: MeetingType) {

    console.log(request);
    
    const query = `INSERT INTO development.meetings (idteams, start_meeting, end_meeting, description, room) VALUES (?, ?, ?, ?, ?)`
    const connection = await getConnection();
    const result = await connection?.execute(query,
        [request.idteams, new Date(request.start_meeting),new Date(request.end_meeting), request.description, request.room])


    // @ts-ignore
    return result[0]
}



;


