import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useRouter } from "next/router";
import isEmpty from "lodash.isempty";
import {
  UserInfo,
  signin,
  routing,
  userIdFromLocalStorage,
} from "@/src/utils/auth";

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

export default function SignIn() {
  const [error, setError] = useState<boolean | string>(false);
  const router = useRouter();
  const userId = userIdFromLocalStorage();

  useEffect(() => {
    routing(router, userId);
  }, [userId]);

  try {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // authorize
      const id = data.get("id");
      const password = data.get("password");
      if (
        isEmpty(id) ||
        isEmpty(password) ||
        !signin({ id, password } as UserInfo)
      ) {
        setError("Invalid Id or password");
        return;
      }

      router.replace("/");
    };

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
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <FormatListNumberedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="id"
                label="ID"
                name="id"
                autoComplete="id"
                autoFocus
                color={error ? "error" : undefined}
                error={error ? true : undefined}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color={error ? "error" : undefined}
                error={error ? true : undefined}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    );
  } catch (e) {
    console.warn("Error loading SignIn component");
  }
}
