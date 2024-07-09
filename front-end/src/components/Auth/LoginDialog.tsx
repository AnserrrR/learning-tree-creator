import React, { useCallback, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useLoginMutation } from '../../api/generated/graphql';
import { useNavigate } from 'react-router-dom';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void; // Callback to switch to Register dialog
}

const LoginDialog = ({ open, onClose, onSwitchToRegister }: LoginDialogProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginMutation] = useLoginMutation();

  const handleLogin = useCallback(async () => {
    const loginResult = await loginMutation({
      variables: {
        email: username,
        password: password,
      },
    });
    if (loginResult.errors || !loginResult.data) {
      console.error(loginResult.errors);
      return;
    }

    login(loginResult.data?.login);
    console.log(`Logging in with email: ${username} and password: ${password}`);
    onClose(); // Close dialog after login
    navigate('/tree/123'); // Navigate to home page after login
  }, [loginMutation, login, username, password, onClose]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleLogin} color="primary">
          Login
        </Button>
        <Button onClick={onSwitchToRegister} color="primary">
          Switch to Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
