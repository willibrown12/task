import { useEffect, useState } from "react"




import { Button, InputLabel, MenuItem, Select, SelectChangeEvent, Table, TableContainer, } from "@mui/material";
import { MeetingUI, Sendtoapimeetings, SendtoapiFilter, SendtoapiTeams, teamsUI } from "./service";


import Paper from '@mui/material/Paper';
import TableTHeadComp from "./tableHead";
import TableBodyComp from "./tableBody";

export type RowType = {
    id: number,
    "Teams": string,
   "Start meeting":string,
    "End meeting": string,
    "Description": string,
    "Room": string,
}



export function Meetings() {




const [teams, setTeams] = useState<Array<teamsUI>>([]);
const [teamsFilter, setTeamsFilter] = useState<string>("");
 const [meetings, setMeetings] = useState<Array<MeetingUI>>([])
  const [isLoading, setIsLoading] = useState(true)



  useEffect(() => {
    let isSetState = true
    async function tableStart() {
      try {
        setIsLoading(true)
        const status: any = await Sendtoapimeetings()
        const selectData: any = await  SendtoapiTeams()
        if (isSetState) {

            
        setTeams(selectData)
        setMeetings(status)
       
        }

      } catch (error) {
        alert(error)
      } finally {
        setIsLoading(false)
      }
    }
    tableStart()
    return () => {
      isSetState = false;
    }
  }, [])







  function createData(
    id: number,
    teams: string,
   start_meeting:string,
    end_meeting: string,
    description: string,
    room: string,
   
  ): RowType {
    return {
        id: id,
        "Teams": teams,
       "Start meeting":start_meeting,
        "End meeting": end_meeting,
        "Description": description,
        "Room": room,
    };
  }


  const rows: Array<RowType> = []

  meetings?.map((c) => {
    rows.push(
      createData(
        c.id,
        c.teams,
        c.start_meeting,
        c.end_meeting,
        c.description,
        c.room,
      )
    )
  });




  const handleChange = (event: SelectChangeEvent) => {
    setTeamsFilter(event.target.value as string);
};



  return (
    <div>
      <h1>Table Meetings</h1>
      <div style={{display:"flex", justifyContent:"center", gap:"10px", alignItems:"center", marginBottom:"20px"}}>
    
                    <Select
                       style={{width:"250px"}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={teamsFilter}
                        label="category"
                        onChange={handleChange}
                    >
                        {teams.map((c) => (
                            <MenuItem key={c.id+"Aaaaaasdasda"} value={c.teams}>
                                {c.teams}
                            </MenuItem>
                        ))}


                    </Select>
                    <InputLabel id="demo-simple-select-label">teams</InputLabel>
     <Button  variant="contained"      onClick={async () => {      
  try {
    const result: any = await SendtoapiFilter(teamsFilter);
    setMeetings(result);
  } catch (error) {
    console.error("Error fetching issues:", error);
  }
}}>filter</Button>
  <Button   variant="contained"  color="error" onClick={async () => {
  try {
    const result: any = await Sendtoapimeetings();
    setMeetings(result);
  } catch (error) {
    console.error("Error fetching issues:", error);
  }
}}>reset</Button>
</div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : rows.length > 0 ? (
        <TableContainer component={Paper}>
          <Table  aria-label="customized table">
            <TableTHeadComp columns={Object.keys(rows[0])} />
            <TableBodyComp data={rows} />
          </Table>
        </TableContainer>
      ) : (
        <h2>No data available</h2>
      )}
    </div>
  )
}
















