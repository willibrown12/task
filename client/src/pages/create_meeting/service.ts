import axios from "axios";
import { Dayjs } from "dayjs";


export type teamsApi = typeof templateTeams
export type teamsUI = {
    id: number,
    teams: string,
  
  }


  export async function SendtoapiTeams() {

    const url = `http://localhost:3000/teams`;
  
    const result = await axios.get<{ teams: teamsApi[] }>(url)
   

 
    const data = result?.data?.teams?.map(c => {
      return {
        id :c.id,
        teams: c.teams,
      }
    })

  
    return data;
  }




export type meeting = {

    teamsFilter: string,
    valuestart:Dayjs,
    valueEnd: Dayjs ,
     description: string,
     room: string,
  
  }


const BASE_URL = `http://localhost:3000/meetings`

export async function registerMeeting(meeting: meeting) {
const MeetingPost = {
  idteams : parseInt(meeting.teamsFilter),
  start_meeting:meeting.valuestart,
  end_meeting: meeting.valueEnd,
  description: meeting.description,
  room: meeting.room,

}

console.log(MeetingPost);

    const result = await axios.post(BASE_URL,
        MeetingPost,
        { headers: { "content-type": "application/json" } })
    return result
}







const templateTeams ={
    "id": 1,
    "teams": "super"
}
