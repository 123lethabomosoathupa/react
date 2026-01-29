import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

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

const DetailsDiv = styled('div')({});

const LocationText = styled('div')({
  paddingLeft: '15px'
});

const ButtonDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

const UploadButton = styled(Button)({
  marginLeft: '8px',
  marginTop: '8px'
});

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      username: '',
      country: '',
      profilePicture: '',
      uiLoading: true,
      buttonLoading: false,
      imageError: ''
    };
  }

  componentDidMount = () => {
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    // Simulate loading user data from localStorage
    // Replace this with actual API call when backend is ready
    setTimeout(() => {
      this.setState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        username: 'johndoe',
        country: 'USA',
        uiLoading: false,
        profilePicture: ''
      });
    }, 500);

    /* Uncomment this when you have a backend
    axios
      .get('/user')
      .then((response) => {
        this.setState({
          firstName: response.data.userCredentials.firstName,
          lastName: response.data.userCredentials.lastName,
          email: response.data.userCredentials.email,
          phoneNumber: response.data.userCredentials.phoneNumber,
          username: response.data.userCredentials.username,
          country: response.data.userCredentials.country,
          uiLoading: false
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          this.props.history.push('/login');
        }
        console.log(error);
        this.setState({ errorMsg: 'Error in retrieving the data' });
      });
    */
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleImageChange = (event) => {
    this.setState({
      image: event.target.files[0]
    });
  };

  profilePictureHandler = (event) => {
    event.preventDefault();
    this.setState({
      uiLoading: true
    });

    // Simulate image upload
    // Replace this with actual API call when backend is ready
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        profilePicture: reader.result,
        uiLoading: false
      });
    };
    if (this.state.image) {
      reader.readAsDataURL(this.state.image);
    }

    /* Uncomment this when you have a backend
    const authToken = localStorage.getItem('AuthToken');
    let form_data = new FormData();
    form_data.append('image', this.state.image);
    form_data.append('content', this.state.content);
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .post('/user/image', form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          this.props.history.push('/login');
        }
        console.log(error);
        this.setState({
          uiLoading: false,
          imageError: 'Error in posting the data'
        });
      });
    */
  };

  updateFormValues = (event) => {
    event.preventDefault();
    this.setState({ buttonLoading: true });

    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    const formRequest = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      country: this.state.country
    };

    // Simulate update - just show success
    // Replace this with actual API call when backend is ready
    setTimeout(() => {
      this.setState({ buttonLoading: false });
      alert('Profile updated successfully!');
    }, 1000);

    /* Uncomment this when you have a backend
    axios
      .post('/user', formRequest)
      .then(() => {
        this.setState({ buttonLoading: false });
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          this.props.history.push('/login');
        }
        console.log(error);
        this.setState({
          buttonLoading: false
        });
      });
    */
  };

  render() {
    if (this.state.uiLoading === true) {
      return (
        <ContentDiv>
          {this.state.uiLoading && <UiProgress size={150} />}
        </ContentDiv>
      );
    } else {
      return (
        <ContentDiv>
          <ToolbarDiv />
          <Card>
            <CardContent>
              <DetailsDiv>
                <LocationText variant="h4">Personal Details</LocationText>
                <br />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="firstName"
                      label="First Name"
                      variant="outlined"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      variant="outlined"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email"
                      variant="outlined"
                      name="email"
                      value={this.state.email}
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
                      value={this.state.phoneNumber}
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
                      value={this.state.username}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="country"
                      label="Country"
                      variant="outlined"
                      name="country"
                      value={this.state.country}
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
              </DetailsDiv>
              <ButtonDiv>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.updateFormValues}
                  disabled={
                    this.state.buttonLoading ||
                    !this.state.firstName ||
                    !this.state.lastName ||
                    !this.state.country
                  }
                  style={{ marginTop: '20px' }}
                >
                  Save details
                  {this.state.buttonLoading && <CircularProgress size={30} />}
                </Button>
              </ButtonDiv>
            </CardContent>
          </Card>
          <br />
          <Card>
            <CardContent>
              <LocationText variant="h4">Profile Picture</LocationText>
              <br />
              <input type="file" onChange={this.handleImageChange} />
              {this.state.imageError ? (
                <div style={{ color: 'red', marginTop: '10px' }}>
                  Wrong Image Format || Supported Format are PNG and JPG
                </div>
              ) : null}
            </CardContent>
            <CardActions>
              <UploadButton
                variant="contained"
                color="primary"
                component="span"
                onClick={this.profilePictureHandler}
                disabled={this.state.buttonLoading}
                startIcon={<CloudUploadIcon />}
              >
                Upload Photo
              </UploadButton>
            </CardActions>
          </Card>
        </ContentDiv>
      );
    }
  }
}

export default Account;