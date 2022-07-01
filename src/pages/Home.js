import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, loadUsers } from '../redux/action';
import { useNavigate} from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
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

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];




const Home = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { users } = useSelector(state => state.data)

  useEffect(() => {
    dispatch(loadUsers());
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the card?")) {
      dispatch(deleteUser(id))
    }
  }
 
  const confirm = () =>{
    navigate("/addUser")
  }


  return (

    <div>
      <div className='btn'>
        <Button variant='contained' 
        color="primary" 
        onClick={confirm}>Back</Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>CardNumber</StyledTableCell>
              <StyledTableCell align="center">Owner Name</StyledTableCell>
              <StyledTableCell align="center">Exp Date</StyledTableCell>
              <StyledTableCell align="center">CVC</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.cardnumber}
                </StyledTableCell>
                <StyledTableCell align="center">{user.ownername}</StyledTableCell>
                <StyledTableCell align="center">{user.expdate}</StyledTableCell>
                <StyledTableCell align="center">{user.cvc}</StyledTableCell>
                 <StyledTableCell align="center">
                  <ButtonGroup variant="contained"
                    aria-label="contained primary button group">
                   <Button
                      style={{ marginRight: "5px" }}
                      onClick={() => handleDelete(user.id)}
                      color="secondary">Delete</Button>
                    {/* <Button color="primary">Edit</Button>  */}

                  </ButtonGroup>
                </StyledTableCell> 
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Home;