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
  marginTop: theme.spacing(3)
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

function Signup() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    country: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    
    const newUserData = {
      firstName: state.firstName,
      lastName: state.lastName,
      phoneNumber: state.phoneNumber,
      country: state.country,
      username: state.username,
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword
    };

    // Simple validation
    if (newUserData.password !== newUserData.confirmPassword) {
      setState(prev => ({
        ...prev,
        errors: { confirmPassword: 'Passwords do not match' },
        loading: false
      }));
      return;
    }

    // For now, just simulate signup with localStorage
    // Replace this with actual API call when backend is ready
    setTimeout(() => {
      localStorage.setItem('AuthToken', `Bearer ${Date.now()}`);
      setState(prev => ({ ...prev, loading: false }));
      navigate('/');
    }, 1000);

    /* Uncomment this when you have a backend
    axios
      .post('/signup', newUserData)
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
          Sign up
        </Typography>
        <StyledForm noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                helperText={errors.firstName}
                error={errors.firstName ? true : false}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                helperText={errors.lastName}
                error={errors.lastName ? true : false}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                helperText={errors.username}
                error={errors.username ? true : false}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                pattern="[7-9]{1}[0-9]{9}"
                helperText={errors.phoneNumber}
                error={errors.phoneNumber ? true : false}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={errors.email}
                error={errors.email ? true : false}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="country"
                label="Country"
                name="country"
                autoComplete="country"
                helperText={errors.country}
                error={errors.country ? true : false}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            Sign Up
            {loading && <ProgressStyle size={30} />}
          </StyledButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
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

export default Signup;