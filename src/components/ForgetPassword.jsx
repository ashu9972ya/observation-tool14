import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import {useDispatch} from 'react-redux';
import {forgetPassword} from "../actions/auth";




function ForgotPassword() {
  const [email, setEmail] = React.useState('');
  const dispatch=useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(forgetPassword(email))
    .then(()=>{
      alert('Email sent successfully')
    })
    .catch(()=>{
      console.log("email did't send")
    })
    console.log(email)
  };

  return (
    <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Forgot your password?
          </Typography>
          <Typography variant="body2" align="center">
            {"Enter your email address below and we'll " +
              'send you a link to reset your password.'}
          </Typography>
          <form onSubmit={handleSubmit}>
        
            <Box sx={{ mt: 6 }}>
              <TextField sx={{ maxWidth:'50%', marginLeft:'300px'}}  
              fullWidth
                label="Email"
                name="email"
                size="large"
                value={email}
                onInput={e=>setEmail(e.target.value)}
              />
             
              <Button
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                size="large"
                color="secondary"
                fullWidth
                // onClick={()=> navigate("/") }
              >
                SEND RESET LINK
              </Button>
            </Box>
            </form>
    </React.Fragment>
  );
}


export default ForgotPassword;