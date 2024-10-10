import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import { CircularProgress, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { z } from "zod"
import { registerMeeting, SendtoapiTeams, teamsUI } from './service';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';




// const  startScheme = z.string().datetime();
// const  endScheme = z.string().datetime();
const descriptionSchema = z.string().min(5).max(100)
const roomscheme = z.string().min(1).max(10)



export const CreateMeeting = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState({ isError: false, errorMessage: "" });

    const [teams, setTeams] = useState<Array<teamsUI>>([]);
    const [teamsFilter, setTeamsFilter] = useState("1");

    const [room, setRoom] = useState('');
    const [RoomError, setRoomError] = useState({ isError: false, errorMessage: "" });

    const [valuestart, setValueStart] = useState<Dayjs>(dayjs());
    const [valueEnd, setValueEnd] = useState<Dayjs>(dayjs());




    useEffect(() => {
        let isSetState = true
        async function sendtoapi() {
            try {
                setIsLoading(true)
                const status: any = await SendtoapiTeams()
               

                if (isSetState) {
                    setTeams(status)
                   
                }

            } catch (error) {
                alert(error)
            } finally {
                setIsLoading(false)
            }
        }
        sendtoapi()
        return () => {
            isSetState = false;
        }
    }, [])

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const result = await registerMeeting({ teamsFilter, room, valuestart, valueEnd, description })
           alert("success affected Rows = "+result.data.result.affectedRows);
           


        } catch (error) {
            console.log(error, "error")
            alert(error)
        } finally {
            setIsLoading(false)
        }
        // Handle form submission here, e.g., send data to an API
    };

    function isSubmitDisabled(): boolean {
        if (!description || !teams || !room || !valuestart || !valueEnd) {
            return true
        }
        if (descriptionError.isError) {
            return true
        }
        if (RoomError.isError) {
            return true
        }
        return false;
    }

    function isDescriptionValid() {
        const result = descriptionSchema.safeParse(description);
        if (result.success) {
            setDescriptionError({ isError: false, errorMessage: "" })
        } else {
            const errors = result?.error?.issues.map(e => e.message)
            setDescriptionError({ isError: true, errorMessage: errors.join(", ") })
        }
    }


    function isRoomValid() {
        const result = roomscheme.safeParse(room);
        console.log(result);

        if (result.success) {
            setRoomError({ isError: false, errorMessage: "" })
        } else {
            const errors = result?.error?.issues.map(e => e.message)
            setRoomError({ isError: true, errorMessage: errors.join(", ") })
        }
    }






    const handleChange = (event: SelectChangeEvent) => {
        setTeamsFilter(event.target.value as string);
    };


    return (


    
<div>
            <h1>Create Meetings</h1>

            <form style={{ display: 'flex', flexDirection:"row", gap: '15px',flexWrap:"wrap", justifyContent:"center", alignItems:"center", }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer  components={['DateTimePicker']}>
                    <DateTimePicker label="start meeting" value={valuestart} 
                        onChange={(newValue) => {
                            if (newValue !== null) {
                              setValueStart(newValue);
                            }
                          }} />
                </DemoContainer>
            </LocalizationProvider>
            <>➟</>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker label="end meeting" value={valueEnd}
                        onChange={(newValue) => {
                            if (newValue !== null) {
                                setValueEnd(newValue);
                            }
                          }} />
                </DemoContainer>
            </LocalizationProvider>
            <InputLabel id="demo-simple-select-label">teams</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={teamsFilter}
                label="category"
                onChange={handleChange}
            >
                {teams.map((c) => (
                    <MenuItem key={c.id + "Aaaaaasdasda"} value={c.id}>
                        {c.teams}
                    </MenuItem>
                ))}

            </Select>
            
            <TextField style={{ width: "500px" }} onBlur={isDescriptionValid} helperText={descriptionError.errorMessage} error={descriptionError.isError} label="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <TextField  onBlur={isRoomValid} helperText={RoomError.errorMessage} error={RoomError.isError} label="room" value={room} onChange={(e) => setRoom(e.target.value)
            } />
            {isLoading ? <LoadingLogin /> : <Button disabled={isSubmitDisabled()} variant="contained" onClick={handleSubmit} color="primary" type="button">Submit</Button>}


        </form>
        </div>

    );
};

function LoadingLogin() {
    return <span> <CircularProgress /> Please wait ...  </span>
}



