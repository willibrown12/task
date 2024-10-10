export function getFullMeetingsDataQuery(): string {
    const query = ` SELECT 
      development.meetings.id, 
      development.meetings.description, 
     development.meetings.start_meeting ,
    development.meetings.end_meeting,
      development.meetings.room,
        development.teams.teams
FROM 
    development.meetings
JOIN 
     development.teams 
ON 
     development.meetings.idteams =  development.teams.id

`
    return query;
}