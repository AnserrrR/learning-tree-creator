import React, { useCallback, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useLoginMutation, useRegisterMutation } from '../../api/generated/graphql';
import { useNavigate } from 'react-router-dom';

interface RegisterDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void; // Callback to switch to Login dialog
}

const RegisterDialog= ({ open, onClose, onSwitchToLogin }: RegisterDialogProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, userId } = useAuth();
  const navigate = useNavigate();
  const [registerMutation] = useRegisterMutation();

  const handleRegister = useCallback(async () => {
    const registerResult = await registerMutation({
      variables: {
        email: username,
        password: password,
      },
    });
    if (registerResult.errors || !registerResult.data) {
      console.error(registerResult.errors);
      return;
    }

    login(registerResult.data?.register);
    console.log(`Registration with email: ${username} and password: ${password}`);
    onClose(); // Close dialog after login
    navigate(`/my-trees`); // Navigate to home page after login
  }, [registerMutation, login, username, password, onClose]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register</DialogTitle>
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
        <TextField
          margin="dense"
          label="Confirm Password"
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleRegister} color="primary">
          Register
        </Button>
        <Button onClick={onSwitchToLogin} color="primary">
          Switch to Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterDialog;
