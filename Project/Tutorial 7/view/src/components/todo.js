import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import axios from '../util/axiosConfig'; // Import configured axios instance
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ContentDiv = styled('div')({
  flexGrow: 1,
  padding: '20px'
});

const FloatingButton = styled(Button)({
  position: 'fixed',
  bottom: '30px',
  right: '30px'
});

const UiProgress = styled(CircularProgress)({
  position: 'fixed',
  zIndex: 1000,
  height: '31px',
  width: '31px',
  left: '45%',
  top: '35%'
});

const StyledCard = styled(Card)({
  minWidth: 275,
  marginBottom: '20px'
});

const CardPos = styled(Typography)({
  marginBottom: 12
});

function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [todoId, setTodoId] = useState('');
  const [open, setOpen] = useState(false);
  const [uiLoading, setUiLoading] = useState(true);
  const [buttonType, setButtonType] = useState('');
  const [viewOpen, setViewOpen] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    // Real API call to fetch todos
    axios
      .get('/todos')
      .then((response) => {
        console.log('Todos fetched successfully:', response.data);
        setTodos(response.data);
        setUiLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching todos:', err);
        setUiLoading(false);
      });
  }, []);

  const deleteTodoHandler = (id) => {
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    console.log('Deleting todo:', id);

    // Real API call to delete todo
    axios
      .delete(`/todo/${id}`)
      .then(() => {
        console.log('Todo deleted successfully');
        window.location.reload();
      })
      .catch((err) => {
        console.error('Error deleting todo:', err);
      });
  };

  const handleEditClickOpen = (todo) => {
    setTitle(todo.title);
    setBody(todo.body);
    setTodoId(todo.todoId);
    setButtonType('Edit');
    setOpen(true);
  };

  const handleViewOpen = (todo) => {
    setTitle(todo.title);
    setBody(todo.body);
    setViewOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userTodo = {
      title,
      body
    };

    let options = {};
    if (buttonType === 'Edit') {
      console.log('Updating todo:', todoId, userTodo);
      // Real API call to update todo
      options = {
        url: `/todo/${todoId}`,
        method: 'put',
        data: userTodo
      };
    } else {
      console.log('Creating new todo:', userTodo);
      // Real API call to create todo
      options = {
        url: '/todo',
        method: 'post',
        data: userTodo
      };
    }

    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios(options)
      .then(() => {
        console.log('Todo operation successful');
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error with todo operation:', error);
        setOpen(true);
      });
  };

  const handleClickOpen = () => {
    setTitle('');
    setBody('');
    setButtonType('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewClose = () => {
    setViewOpen(false);
  };

  const dialogTitle = buttonType === 'Edit' ? 'Edit Todo' : 'Create a new Todo';
  const submitButtonText = buttonType === 'Edit' ? 'Save' : 'Submit';

  if (uiLoading) {
    return (
      <ContentDiv>
        <UiProgress size={150} />
      </ContentDiv>
    );
  }

  return (
    <ContentDiv>
      <FloatingButton 
        variant="contained" 
        color="primary"
        onClick={handleClickOpen}
      >
        Add Todo
      </FloatingButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="todoTitle"
            label="Todo Title"
            type="text"
            fullWidth
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextField
            margin="dense"
            id="todoDetails"
            label="Todo Details"
            type="text"
            fullWidth
            name="body"
            multiline
            rows={4}
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {submitButtonText}
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={2}>
        {todos.map((todo) => (
          <Grid item xs={12} sm={6} key={todo.todoId}>
            <StyledCard variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {todo.title}
                </Typography>
                <CardPos color="textSecondary">
                  {dayjs(todo.createdAt).fromNow()}
                </CardPos>
                <Typography variant="body2" component="p">
                  {todo.body.substring(0, 65)}
                  {todo.body.length > 65 ? '...' : ''}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleViewOpen(todo)}>
                  View
                </Button>
                <Button size="small" color="primary" onClick={() => handleEditClickOpen(todo)}>
                  <EditIcon />
                </Button>
                <Button size="small" color="secondary" onClick={() => deleteTodoHandler(todo.todoId)}>
                  <DeleteIcon />
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Dialog open={viewOpen} onClose={handleViewClose} fullWidth maxWidth="sm">
        <DialogTitle>View Todo</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="todoTitle"
            label="Todo Title"
            type="text"
            fullWidth
            name="title"
            value={title}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            margin="dense"
            id="todoDetails"
            label="Todo Details"
            type="text"
            fullWidth
            name="body"
            multiline
            rows={4}
            value={body}
            InputProps={{
              readOnly: true
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ContentDiv>
  );
}

export default Todo;