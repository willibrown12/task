
import { styled, TableBody, TableCell, tableCellClasses, TableRow } from "@mui/material";
import { RowType } from ".";



const StyledTableCell = styled(TableCell)(({  }) => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));





export default function TableBodyComp(data:any) {
    console.log(data);
    
    return (
        <TableBody>
            {data.data.map((row:RowType)=>(
                <StyledTableRow
                key={row.id}>
                {Object.values(row).map((c:any) => (
                    <StyledTableCell
                    style={{textAlign:"center"}}
                    key={c+Math.random()}>
                        {c}
                    </StyledTableCell>
                ))}
            </StyledTableRow>

            ))}
            
        </TableBody>
    );
}




