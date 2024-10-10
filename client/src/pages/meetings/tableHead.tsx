import { styled, TableCell, tableCellClasses, TableHead, TableRow } from "@mui/material";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }));
  

export default function TableTHeadComp(props:any) {
    return (
        <TableHead>
            <TableRow key={1}>
                {props.columns.map((c:string) => (
                    <StyledTableCell key={c} style={{textAlign:"center"}}>
                        {c}
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}