import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/action';




const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



const AddUser = () => {
  // const classes = useStyles();


  const [state, setState] = useState({
    name: "",
    cardnumber: "",
    ownername: "",
    expdate: "",
    cvc: "",
  });

  const [error, setError] = useState("");
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const { cardnumber, ownername, expdate, cvc } = state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardnumber || !ownername || !expdate || !cvc) {
      setError("Please input all input field")
    } else {
      dispatch(addUser(state));
      navigate("/");
      setError("");
    }

  }

  return (
    <div>
    <section>
    <div className='container'>
      <div className='left'></div>
      <div className='right'>
        <div className='content'>
        <h2>Add a new Card</h2>
        {error && <h3 style={{ color: 'red' }}>{error}</h3>}

        <form  noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            className='txtField'
            id="standard-basic"
            label="Card number"
            value={cardnumber}
            name="cardnumber"
            type="number"
            onChange={handleInputChange}
          />

          <br />
          <TextField 
          className='txtField'
          id="standard-basic"
            label="Owner name"
            name="ownername"
            value={ownername}
            type='text'
            onChange={handleInputChange} />
          <br />

          <TextField 
          className='txtField'
          id="standard-basic"
            label="Exp date"
            name="expdate"
            value={expdate}
            type=''
            onChange={handleInputChange} />
          <br />

          <TextField 
          className='txtField'
          id="contained-basic"
          
            label="CVC"
            name="cvc"
            value={cvc}
            type='password'
            onChange={handleInputChange} />
          <br /><br/>
          <Button
          className="btn"
            style={{ width: "100px" }}
            variant='contained'
            type="submit"
            color="primary"
            onChange={handleInputChange}
            
          >
            Save
          </Button>
        </form>
        
      </div>
    </div>
    </div>
    </section>
    </div>
  )
}

export default AddUser;