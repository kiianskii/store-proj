import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { registerThunk } from "../../redux/auth/operations";

interface signUpProps {
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<signUpProps> = ({ setSignUp }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(registerThunk({ username, email, password }));
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} width="100%">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                },
                outline: "none",
              },
            }}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                },
                outline: "none",
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                },
                outline: "none",
              },
            }}
          />
          <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "48%" }}
            >
              Sign Up
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              sx={{ width: "48%" }}
              onClick={() => setSignUp(false)}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;