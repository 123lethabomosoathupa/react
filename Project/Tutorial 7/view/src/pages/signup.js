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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    country: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('AuthToken')) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors({}); // Clear previous errors

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    // Log the data being sent (for debugging)
    console.log('Attempting signup with data:', {
      ...formData,
      password: '***',
      confirmPassword: '***'
    });

    // Real API call to Firebase backend
    axios
      .post('/signup', formData)
      .then((response) => {
        console.log('Signup successful:', response.data);
        localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.error('Signup error:', error);
        console.error('Error response:', error.response);
        
        if (error.response) {
          // Server responded with an error
          setErrors(error.response.data || { general: 'Signup failed. Please try again.' });
        } else if (error.request) {
          // Request was made but no response received
          setErrors({ 
            general: 'Cannot connect to server. Please check your API URL in axiosConfig.js' 
          });
        } else {
          // Something else happened
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
          Sign up
        </Typography>
        <StyledForm noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                helperText={errors.firstName}
                error={!!errors.firstName}
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
                autoComplete="family-name"
                value={formData.lastName}
                helperText={errors.lastName}
                error={!!errors.lastName}
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
                value={formData.username}
                helperText={errors.username}
                error={!!errors.username}
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
                autoComplete="tel"
                value={formData.phoneNumber}
                helperText={errors.phoneNumber}
                error={!!errors.phoneNumber}
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
                value={formData.email}
                helperText={errors.email}
                error={!!errors.email}
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
                value={formData.country}
                helperText={errors.country}
                error={!!errors.country}
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
                autoComplete="new-password"
                value={formData.password}
                helperText={errors.password}
                error={!!errors.password}
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
                autoComplete="new-password"
                value={formData.confirmPassword}
                helperText={errors.confirmPassword}
                error={!!errors.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
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
