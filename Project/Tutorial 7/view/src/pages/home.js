import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Account from '../components/account';
import Todo from '../components/todo';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CircularProgress from '@mui/material/CircularProgress';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotesIcon from '@mui/icons-material/Notes';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const RootDiv = styled('div')({
  display: 'flex'
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}));

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box'
  }
});

const ContentDiv = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3)
}));

const StyledAvatar = styled(Avatar)({
  height: 110,
  width: 100,
  flexShrink: 0,
  flexGrow: 0,
  marginTop: 20
});

const UiProgress = styled(CircularProgress)({
  position: 'fixed',
  zIndex: 1000,
  height: '31px',
  width: '31px',
  left: '50%',
  top: '35%'
});

const ToolbarSpacer = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar
}));

function Home() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    render: false,
    firstName: '',
    lastName: '',
    profilePicture: '',
    uiLoading: true,
    imageLoading: false
  });

  const loadAccountPage = () => {
    setState(prev => ({ ...prev, render: true }));
  };

  const loadTodoPage = () => {
    setState(prev => ({ ...prev, render: false }));
  };

  const logoutHandler = () => {
    localStorage.removeItem('AuthToken');
    navigate('/login');
  };

  React.useEffect(() => {
    const authToken = localStorage.getItem('AuthToken');
    if (!authToken) {
      navigate('/login');
      return;
    }

    axios.defaults.headers.common = { Authorization: `${authToken}` };

    // Simulate loading user data
    // Replace this with actual API call when backend is ready
    setTimeout(() => {
      setState({
        render: false,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        country: 'USA',
        username: 'johndoe',
        uiLoading: false,
        profilePicture: ''
      });
    }, 1000);

    /* Uncomment this when you have a backend
    axios
      .get('/user')
      .then((response) => {
        setState({
          render: false,
          firstName: response.data.userCredentials.firstName,
          lastName: response.data.userCredentials.lastName,
          email: response.data.userCredentials.email,
          phoneNumber: response.data.userCredentials.phoneNumber,
          country: response.data.userCredentials.country,
          username: response.data.userCredentials.username,
          uiLoading: false,
          profilePicture: response.data.userCredentials.imageUrl
        });
      })
      .catch((error) => {
        if(error.response && error.response.status === 403) {
          navigate('/login');
        }
        console.log(error);
        setState(prev => ({ ...prev, errorMsg: 'Error in retrieving the data' }));
      });
    */
  }, [navigate]);

  if (state.uiLoading === true) {
    return (
      <RootDiv>
        {state.uiLoading && <UiProgress size={150} />}
      </RootDiv>
    );
  } else {
    return (
      <RootDiv>
        <CssBaseline />
        <StyledAppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap>
              TodoApp
            </Typography>
          </Toolbar>
        </StyledAppBar>
        <StyledDrawer variant="permanent">
          <ToolbarSpacer />
          <Divider />
          <center>
            <StyledAvatar src={state.profilePicture} />
            <p>
              {' '}
              {state.firstName} {state.lastName}
            </p>
          </center>
          <Divider />
          <List>
            <ListItem button key="Todo" onClick={loadTodoPage}>
              <ListItemIcon>
                <NotesIcon />
              </ListItemIcon>
              <ListItemText primary="Todo" />
            </ListItem>

            <ListItem button key="Account" onClick={loadAccountPage}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>

            <ListItem button key="Logout" onClick={logoutHandler}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </StyledDrawer>

        <ContentDiv>
          <ToolbarSpacer />
          {state.render ? <Account /> : <Todo />}
        </ContentDiv>
      </RootDiv>
    );
  }
}

export default Home;