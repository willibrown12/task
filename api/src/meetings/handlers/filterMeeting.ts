import { getConnection } from "../../database"
import { getFullMeetingsDataQuery} from "./query/getFullRequestData";

export type FilterQueryParams = {
    filter: string;
};

export async function filterMeeting(filter: FilterQueryParams) {
    const connection = await getConnection();
    
    const issues = await connection?.execute(`${ getFullMeetingsDataQuery()}
where teams = ? ORDER BY 
    development.meetings.end_meeting DESC;`, [filter])
    const result = issues?.[0]
    return result
}