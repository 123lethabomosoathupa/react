import React, { useState, useEffect } from 'react';
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
import axios from '../util/axiosConfig';

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
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    username: '',
    profilePicture: ''
  });
  const [renderAccount, setRenderAccount] = useState(false);
  const [uiLoading, setUiLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem('AuthToken');
    if (!authToken) {
      navigate('/login');
      return;
    }

    axios.defaults.headers.common = { Authorization: `${authToken}` };

    axios
      .get('/auth/user')
      .then((response) => {
        setUserData({
          firstName: response.data.userCredentials.firstName,
          lastName: response.data.userCredentials.lastName,
          email: response.data.userCredentials.email,
          phoneNumber: response.data.userCredentials.phoneNumber,
          country: response.data.userCredentials.country,
          username: response.data.userCredentials.username,
          profilePicture: response.data.userCredentials.imageUrl || ''
        });
        setUiLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        if (error.response && error.response.status === 403) {
          localStorage.removeItem('AuthToken');
          navigate('/login');
        }
        setUiLoading(false);
      });
  }, [navigate]);

  const loadAccountPage = () => setRenderAccount(true);
  const loadTodoPage = () => setRenderAccount(false);

  const logoutHandler = () => {
    localStorage.removeItem('AuthToken');
    navigate('/login');
  };

  if (uiLoading) {
    return (
      <RootDiv>
        <UiProgress size={150} />
      </RootDiv>
    );
  }

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
          <StyledAvatar src={userData.profilePicture} alt={userData.firstName} />
          <p>
            {userData.firstName} {userData.lastName}
          </p>
        </center>
        <Divider />
        <List>
          <ListItem onClick={loadTodoPage} sx={{ cursor: 'pointer' }}>
            <ListItemIcon>
              <NotesIcon />
            </ListItemIcon>
            <ListItemText primary="Todo" />
          </ListItem>

          <ListItem onClick={loadAccountPage} sx={{ cursor: 'pointer' }}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>

          <ListItem onClick={logoutHandler} sx={{ cursor: 'pointer' }}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </StyledDrawer>

      <ContentDiv>
        <ToolbarSpacer />
        {renderAccount ? <Account /> : <Todo />}
      </ContentDiv>
    </RootDiv>
  );
}

export default Home;