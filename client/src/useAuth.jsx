import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoadingScreen from './components/LoadingScreen';

export const useAuth = () => {
  const [authenticated, setAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fnvzol-8080.preview.csb.app/auth', {
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Unauthorized');
      })
      .then((res) => {
        setAuthentication(res.user);
        setIsLoading(false);
      })
      .catch((error) => {
        setAuthentication(false);
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  
  return { authenticated, isLoading };
};

