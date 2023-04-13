import React, { useState } from 'react';
import List from './list';
import Form from './form';
import { AppBar, Toolbar, Typography, Grid, Button, Table, TableHead, TableBody, TableCell, TableRow, Container } from '@mui/material';
import { Menu as MenuIcon, AddCircle as AddCircleIcon } from '@mui/icons-material';
import moment from 'moment';

function TodoList() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const toggleTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleAddClick = () => {
    setOpen(true);
    setAddOpen(true);
    setTitle('');
    setDescription('');
    setDeadline(moment().format('YYYY-MM-DD'));
    setPriority('Low');
  };

  return (
    <Container>
      <Form
        open={open}
        setOpen={setOpen}
        todos={todos}
        setTodos={setTodos}
        addOpen={addOpen}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        deadline={deadline}
        setDeadline={setDeadline}
        priority={priority}
        setPriority={setPriority}
      />
      <AppBar position="static">
        <Toolbar style={{ alignItems: 'center', background: '#1666bf' }}>
          <Typography component={'span'} align="center" sx={{ width: '100%' }}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <MenuIcon />
              </Grid>
              <Grid item>FRAMEWORKS</Grid>
            </Grid>
          </Typography>
          <Button variant="contained" sx={{ width: '20%' }} onClick={handleAddClick}>
            <AddCircleIcon fontSize="small" />
            &nbsp;Add
          </Button>
        </Toolbar>
      </AppBar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Deadline</TableCell>
            <TableCell align="center">Priority</TableCell>
            <TableCell align="center">Is Complete</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => (
            <List
              key={todo.id}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              todo={todo}
              setOpen={setOpen}
              setAddOpen={setAddOpen}
              setTitle={setTitle}
              setDescription={setDescription}
              setDeadline={setDeadline}
              setPriority={setPriority}
            />
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default TodoList;
