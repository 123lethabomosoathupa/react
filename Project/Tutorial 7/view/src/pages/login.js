import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1)
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2)
}));

const CustomError = styled(Typography)({
  color: 'red',
  fontSize: '0.8rem',
  marginTop: 10
});

const ProgressStyle = styled(CircularProgress)({
  position: 'absolute'
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('AuthToken')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors({}); // Clear previous errors
    
    const userData = {
      email,
      password
    };
    
    console.log('Attempting login with email:', email);

    // Real API call to Firebase backend
    axios
      .post('/login', userData)
      .then((response) => {
        console.log('Login successful');
        localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.error('Login error:', error);
        console.error('Error response:', error.response);
        
        if (error.response) {
          setErrors(error.response.data || { general: 'Login failed. Please try again.' });
        } else if (error.request) {
          setErrors({ 
            general: 'Cannot connect to server. Please check your API URL in axiosConfig.js' 
          });
        } else {
          setErrors({ general: error.message });
        }
        setLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <StyledContainer>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <StyledForm noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            helperText={errors.email}
            error={!!errors.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            helperText={errors.password}
            error={!!errors.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading || !email || !password}
          >
            Sign In
            {loading && <ProgressStyle size={30} />}
          </StyledButton>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {errors.general && (
            <CustomError variant="body2">
              {errors.general}
            </CustomError>
          )}
        </StyledForm>
      </StyledContainer>
    </Container>
  );
}

export default Login;
