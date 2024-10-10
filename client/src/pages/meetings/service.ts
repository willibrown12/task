import axios from "axios";


export type MeetingApi = typeof template

export type MeetingUI = {
    id: number,
    teams: string,
   start_meeting:string,
    end_meeting: string,
    description: string,
    room: string,
   
}

export type teamsApi = typeof templateTeams
export type teamsUI = {
    id: number,
    teams: string,
  
  }

export async function Sendtoapimeetings() {
   
  const url = `http://localhost:3000/meetings`;
    const result = await axios.get<{ meetings: MeetingApi[] }>(url)
    const data = result?.data?.meetings.map(c => {
      return {
     id: c.id,
      teams: c.teams,
      start_meeting:new Date(c.start_meeting).toLocaleString(),
      end_meeting: new Date(c.end_meeting).toLocaleString(),
      description: c.description,
       room: c.room,
      }})
     ;
     
      
      return data;
     }

     export async function SendtoapiFilter(input:string,) {
   
      const urlFilter= `http://localhost:3000/meetings/filter?filter=${input}`;
      const result = await axios.get<{ meetings: MeetingApi[] }>(urlFilter);
      console.log(result);
      
        const data = result?.data?.meetings.map(c => {
          return {
            id: c.id,
            teams: c.teams,
            start_meeting:new Date(c.start_meeting).toLocaleString(),
            end_meeting: new Date(c.end_meeting).toLocaleString(),
            description: c.description,
             room: c.room,
          }})
         
          
          return data;
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



    

const template = {
    "id": 2,
    "description": "sss",
    "start_meeting":"2024-10-09T12:46:32.000Z",
    "end_meeting": "2024-10-09T12:46:32.000Z",
    "room": "ss",
    "teams": "best"
}

const templateTeams ={
    "id": 1,
    "teams": "super"
}