import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const loginNotify = () => {
  toast('🔓 Logged in');
};

export const registerNotify = () => {
  toast('🎉 Successfully registered');
};

export const logoutNotify = () => {
  toast('⬅ Logged out');
};
