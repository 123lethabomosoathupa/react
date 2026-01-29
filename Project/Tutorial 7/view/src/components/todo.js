import React, { Component } from 'react';
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
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ContentDiv = styled('div')({
  flexGrow: 1,
  padding: '20px'
});

const TitleTypography = styled(Typography)({
  marginLeft: '15px'
});

const SubmitButton = styled(Button)({
  display: 'block',
  color: 'white',
  textAlign: 'center',
  position: 'absolute',
  top: '14px',
  right: '10px'
});

const FloatingButton = styled(Button)({
  position: 'fixed',
  bottom: '0px',
  right: '0px',
  marginBottom: '30px',
  marginRight: '30px'
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

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      title: '',
      body: '',
      todoId: '',
      errors: {},
      open: false,
      uiLoading: true,
      buttonType: '',
      viewOpen: false
    };
  }

  componentDidMount = () => {
    // Simulate loading todos from localStorage
    // Replace this with actual API call when backend is ready
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    this.setState({
      todos: savedTodos,
      uiLoading: false
    });

    /* Uncomment this when you have a backend
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get('/todos')
      .then((response) => {
        this.setState({
          todos: response.data,
          uiLoading: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
    */
  };

  deleteTodoHandler = (todoId) => {
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    // Delete from localStorage
    const updatedTodos = this.state.todos.filter((todo) => todo.todoId !== todoId);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    this.setState({ todos: updatedTodos });

    /* Uncomment this when you have a backend
    axios
      .delete(`/todo/${todoId}`)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    */
  };

  handleEditClickOpen = (todo) => {
    this.setState({
      title: todo.title,
      body: todo.body,
      todoId: todo.todoId,
      buttonType: 'Edit',
      open: true
    });
  };

  handleViewOpen = (todo) => {
    this.setState({
      title: todo.title,
      body: todo.body,
      viewOpen: true
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userTodo = {
      title: this.state.title,
      body: this.state.body
    };

    let options = {};
    if (this.state.buttonType === 'Edit') {
      // Update existing todo in localStorage
      const updatedTodos = this.state.todos.map((todo) =>
        todo.todoId === this.state.todoId ? { ...todo, ...userTodo } : todo
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      this.setState({ todos: updatedTodos, open: false });

      /* Uncomment this when you have a backend
      options = {
        url: `/todo/${this.state.todoId}`,
        method: 'put',
        data: userTodo
      };
      */
    } else {
      // Add new todo to localStorage
      const newTodo = {
        ...userTodo,
        todoId: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      const updatedTodos = [newTodo, ...this.state.todos];
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      this.setState({ todos: updatedTodos, open: false });

      /* Uncomment this when you have a backend
      options = {
        url: '/todo',
        method: 'post',
        data: userTodo
      };
      */
    }

    /* Uncomment this when you have a backend
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios(options)
      .then(() => {
        this.setState({ open: false });
        window.location.reload();
      })
      .catch((error) => {
        this.setState({ open: true, errors: error.response.data });
        console.log(error);
      });
    */
  };

  handleClickOpen = () => {
    this.setState({
      title: '',
      body: '',
      buttonType: '',
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleViewClose = () => {
    this.setState({ viewOpen: false });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const DialogTitle2 = this.state.buttonType === 'Edit' ? 'Edit Todo' : 'Create a new Todo';
    const ButtonType = this.state.buttonType === 'Edit' ? 'Save' : 'Submit';

    if (this.state.uiLoading === true) {
      return (
        <ContentDiv>
          {this.state.uiLoading && <UiProgress size={150} />}
        </ContentDiv>
      );
    } else {
      return (
        <ContentDiv>
          <IconButton
            color="primary"
            aria-label="Add Todo"
            onClick={this.handleClickOpen}
            size="large"
          >
            <FloatingButton variant="contained" color="primary">
              Add Todo
            </FloatingButton>
          </IconButton>

          <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{DialogTitle2}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="todoTitle"
                label="Todo Title"
                type="text"
                fullWidth
                name="title"
                onChange={this.handleChange}
                value={this.state.title}
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
                onChange={this.handleChange}
                value={this.state.body}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                {ButtonType}
              </Button>
            </DialogActions>
          </Dialog>

          <Grid container spacing={2}>
            {this.state.todos.map((todo) => (
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
                    <Button size="small" color="primary" onClick={() => this.handleViewOpen(todo)}>
                      View
                    </Button>
                    <Button size="small" color="primary" onClick={() => this.handleEditClickOpen(todo)}>
                      <EditIcon />
                    </Button>
                    <Button size="small" color="secondary" onClick={() => this.deleteTodoHandler(todo.todoId)}>
                      <DeleteIcon />
                    </Button>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          <Dialog open={this.state.viewOpen} onClose={this.handleViewClose} fullWidth maxWidth="sm">
            <DialogTitle>View Todo</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="todoTitle"
                label="Todo Title"
                type="text"
                fullWidth
                name="title"
                value={this.state.title}
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
                value={this.state.body}
                InputProps={{
                  readOnly: true
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleViewClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </ContentDiv>
      );
    }
  }
}

export default Todo;