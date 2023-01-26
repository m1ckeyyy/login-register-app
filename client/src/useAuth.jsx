import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoadingScreen from './components/LoadingScreen';

export const useAuth = () => {
  const [authenticated, setAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = Cookies.get('access_token');


  useEffect(() => {
    if (!Cookies.get('access_token')) {
      console.log('NO COOKIES = NO FETCHING');
      navigate('/login');
      setIsLoading(false);
      setAuthentication(false);
      return;
    }
    console.log('fetching server from useAuth.jsx');
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
      .then((res) => {
        console.log('authenticated changed: ', authenticated);
      })
      .catch((error) => {
        setAuthentication(false);
        setIsLoading(false);
        console.error(error);
      });
  }, [cookies]);

  return { authenticated, setAuthentication, isLoading };
};
