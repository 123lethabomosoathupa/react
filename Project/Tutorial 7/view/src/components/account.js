import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from '../util/axiosConfig'; // Import configured axios instance

const ContentDiv = styled('div')({
  flexGrow: 1,
  padding: '20px'
});

const UiProgress = styled(CircularProgress)({
  position: 'fixed',
  zIndex: 1000,
  height: '31px',
  width: '31px',
  left: '45%',
  top: '35%'
});

const ToolbarDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

const LocationText = styled('div')({
  paddingLeft: '15px',
  fontSize: '1.5rem',
  fontWeight: 'bold'
});

const ButtonDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

const UploadButton = styled(Button)({
  marginLeft: '8px',
  marginTop: '8px'
});

function Account() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    username: '',
    country: '',
    profilePicture: ''
  });
  const [image, setImage] = useState(null);
  const [uiLoading, setUiLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    // Real API call to fetch user data
    axios
      .get('/user')
      .then((response) => {
        console.log('Account data fetched:', response.data);
        setFormData({
          firstName: response.data.userCredentials.firstName,
          lastName: response.data.userCredentials.lastName,
          email: response.data.userCredentials.email,
          phoneNumber: response.data.userCredentials.phoneNumber,
          username: response.data.userCredentials.username,
          country: response.data.userCredentials.country,
          profilePicture: response.data.userCredentials.imageUrl || ''
        });
        setUiLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching account data:', error);
        setUiLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setImageError('');
  };

  const profilePictureHandler = (event) => {
    event.preventDefault();
    
    if (!image) {
      setImageError('Please select an image first');
      return;
    }

    setUiLoading(true);

    // Real API call to upload profile picture
    const authToken = localStorage.getItem('AuthToken');
    const formDataToSend = new FormData();
    formDataToSend.append('image', image);
    
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .post('/user/image', formDataToSend, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then(() => {
        console.log('Profile picture uploaded successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error uploading profile picture:', error);
        setUiLoading(false);
        setImageError('Error uploading image. Please use PNG or JPG format.');
      });
  };

  const updateFormValues = (event) => {
    event.preventDefault();
    setButtonLoading(true);

    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    const updateData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      country: formData.country
    };

    console.log('Updating user profile:', updateData);

    // Real API call to update user details
    axios
      .post('/user', updateData)
      .then(() => {
        console.log('Profile updated successfully');
        setButtonLoading(false);
        alert('Profile updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        setButtonLoading(false);
        alert('Error updating profile');
      });
  };

  if (uiLoading) {
    return (
      <ContentDiv>
        <UiProgress size={150} />
      </ContentDiv>
    );
  }

  return (
    <ContentDiv>
      <ToolbarDiv />
      <Card>
        <CardContent>
          <LocationText>Personal Details</LocationText>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                label="First Name"
                variant="outlined"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="phone"
                label="Phone Number"
                variant="outlined"
                name="phoneNumber"
                disabled
                value={formData.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="username"
                label="Username"
                variant="outlined"
                name="username"
                disabled
                value={formData.username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="country"
                label="Country"
                variant="outlined"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <ButtonDiv>
            <Button
              variant="contained"
              color="primary"
              onClick={updateFormValues}
              disabled={
                buttonLoading ||
                !formData.firstName ||
                !formData.lastName ||
                !formData.country
              }
              style={{ marginTop: '20px' }}
            >
              Save details
              {buttonLoading && <CircularProgress size={30} style={{ marginLeft: '10px' }} />}
            </Button>
          </ButtonDiv>
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardContent>
          <LocationText>Profile Picture</LocationText>
          <br />
          <input 
            type="file" 
            onChange={handleImageChange}
            accept="image/png, image/jpeg, image/jpg"
          />
          {imageError && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {imageError}
            </div>
          )}
        </CardContent>
        <CardActions>
          <UploadButton
            variant="contained"
            color="primary"
            component="span"
            onClick={profilePictureHandler}
            disabled={uiLoading}
            startIcon={<CloudUploadIcon />}
          >
            Upload Photo
          </UploadButton>
        </CardActions>
      </Card>
    </ContentDiv>
  );
}

export default Account;