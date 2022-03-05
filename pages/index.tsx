import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useRouter } from "next/router";

import isEmpty from "lodash.isempty";
import {
  userIdFromLocalStorage,
  userAvatarFromLocalStorage,
  routing,
} from "@/src/utils/auth";
import { fetchAvatar } from "@/src/api/fetchAvatar";

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

  useEffect(() => {
    routing(router, userId as string);
  }, [userId]);

  // auth
  useEffect(() => {
    async function fetchData() {
      if (isEmpty(avatar) && !isEmpty(userId)) {
        const { thumbnail } = await fetchAvatar();
        userAvatarFromLocalStorage(thumbnail);
        setAvatar(thumbnail);
      }
    }

    fetchData();
  }, [userId, avatar]);

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
