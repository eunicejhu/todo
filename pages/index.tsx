import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import isEmpty from "lodash.isempty";
import { v4 as uuidv4 } from "uuid";

import { useRouter } from "next/router";

import SortSelect, {
  SelectChangeEvent,
  Option,
} from "@/src/components/SortSelect";

import {
  userIdFromLocalStorage,
  userAvatarFromLocalStorage,
  routing,
} from "@/src/utils/auth";
import {
  todosFromLocalStorage,
  iTodos,
  iTodo,
  sortCompletedFirst,
  sortNonCompletedFirst,
  sortDateDsc,
  sortDateAsc,
} from "@/src/utils/todo";
import { fetchAvatar } from "@/src/api/fetchAvatar";

export const options: Option<iTodo>[] = [
  {
    value: "date_dsc",
    text: "Date From Latest",
    sort: sortDateDsc,
  },
  {
    value: "date_asc",
    text: "Date From Oldest",
    sort: sortDateAsc,
  },
  {
    value: "completed_first",
    text: "Completed first",
    sort: sortCompletedFirst,
  },
  {
    value: "not_completed_first",
    text: "Non-Completed first",
    sort: sortNonCompletedFirst,
  },
];

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Zuoqin
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function Index() {
  const router = useRouter();
  let userId = userIdFromLocalStorage();
  let [avatar, setAvatar] = useState(userAvatarFromLocalStorage());
  let [todos, setTodos] = useState<iTodos>(todosFromLocalStorage());
  let [sort, setSort] = useState<string>("date_dsc");

  //auth
  useEffect(() => {
    routing(router, userId as string);
  }, [userId]);

  // fetch data
  useEffect(() => {
    async function fetchData() {
      if (isEmpty(avatar) && !isEmpty(userId)) {
        const { thumbnail } = await fetchAvatar();
        userAvatarFromLocalStorage(thumbnail);
        setAvatar(thumbnail);
        setTodos(todosFromLocalStorage());
      }
    }
    fetchData();
  }, [userId, avatar]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = uuidv4();
    const todo = {
      id,
      text: "",
      completed: false,
      date: Date.now(),
    };

    const updatedTodos = { ...todos };
    updatedTodos[id] = todo;

    setTodos(updatedTodos);
    todosFromLocalStorage(updatedTodos);
  };

  const onEditTodo = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const { id, value } = event.currentTarget;

    const updatedTodos = { ...todos };
    updatedTodos[id] = { ...updatedTodos[id], text: value };
    setTodos(updatedTodos);
    todosFromLocalStorage(updatedTodos);
  };

  const onCompleteTodo = (event: React.FormEvent<HTMLInputElement>) => {
    const { id, checked } = event.currentTarget;

    const updatedTodos = { ...todos };
    updatedTodos[id] = { ...updatedTodos[id], completed: checked };
    setTodos(updatedTodos);
    todosFromLocalStorage(updatedTodos);
  };

  const onDeleteTodo = (event: React.FormEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;

    const updatedTodos = { ...todos };
    delete updatedTodos[id];
    setTodos(updatedTodos);
    todosFromLocalStorage(updatedTodos);
  };

  // sort
  const onChangeSort = (event: SelectChangeEvent) => {
    const sort = event.target.value;
    setSort(sort);
  };

  try {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} src={avatar}>
              <FormatListNumberedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              To-do list
            </Typography>
            <Grid
              component="form"
              onSubmit={handleSubmit}
              container
              spacing={2}
              sx={{ textAlign: "center" }}
            >
              <Grid item xs={12}>
                <IconButton type="submit" aria-label="add" size="large">
                  <AddCircleOutlineOutlinedIcon
                    color="primary"
                    sx={{ fontSize: 48 }}
                  />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <SortSelect
                  sort={sort}
                  options={options}
                  onChange={onChangeSort}
                ></SortSelect>
              </Grid>
            </Grid>

            <Grid container sx={{ alignItems: "center" }}>
              {options
                .filter((option) => option.value == sort)[0]
                .sort(Object.values(todos))
                .map((todo, index) => (
                  <Grid key={index} item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        id={todo.id}
                        checked={todo.completed}
                        sx={{ mr: 1, my: 0.5 }}
                        onChange={onCompleteTodo}
                      />
                      <TextField
                        fullWidth
                        id={todo.id}
                        value={todo.text}
                        variant="standard"
                        onChange={onEditTodo}
                        multiline={true}
                        inputProps={{
                          style: {
                            textDecoration: todo.completed
                              ? "line-through"
                              : "none",
                          },
                        }}
                      ></TextField>
                      <IconButton
                        type="button"
                        aria-label="comlete"
                        size="small"
                        id={todo.id}
                        onClick={onDeleteTodo}
                      >
                        <DeleteForeverRoundedIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    );
  } catch (e) {
    console.warn("Error loading Index component");
    return null;
  }
}

export default Index;
