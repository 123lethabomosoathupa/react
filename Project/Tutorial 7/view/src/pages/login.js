import React, { Component } from 'react';
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
  const [state, setState] = React.useState({
    email: '',
    password: '',
    errors: {},
    loading: false
  });

  React.useEffect(() => {
    if (localStorage.getItem('AuthToken')) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (event) => {
    setState(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setState(prev => ({ ...prev, loading: true }));
    const userData = {
      email: state.email,
      password: state.password
    };
    
    // For now, just simulate login with localStorage
    // Replace this with actual API call when backend is ready
    setTimeout(() => {
      if (userData.email && userData.password) {
        localStorage.setItem('AuthToken', `Bearer ${Date.now()}`);
        setState(prev => ({ ...prev, loading: false }));
        navigate('/');
      } else {
        setState(prev => ({
          ...prev,
          errors: { general: 'Please fill in all fields' },
          loading: false
        }));
      }
    }, 1000);

    /* Uncomment this when you have a backend
    axios
      .post('/login', userData)
      .then((response) => {
        localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
        setState(prev => ({ ...prev, loading: false }));
        navigate('/');
      })
      .catch((error) => {
        setState(prev => ({
          ...prev,
          errors: error.response.data,
          loading: false
        }));
      });
    */
  };

  const { errors, loading } = state;
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
        <StyledForm noValidate>
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
            helperText={errors.email}
            error={errors.email ? true : false}
            onChange={handleChange}
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
            helperText={errors.password}
            error={errors.password ? true : false}
            onChange={handleChange}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading || !state.email || !state.password}
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