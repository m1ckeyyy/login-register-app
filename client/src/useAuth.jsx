import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoadingScreen from './components/LoadingScreen';
import axios from 'axios';

export const useAuth = () => {
  const [authenticated, setAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = Cookies.get('access_token');
  console.log('cokies: ', document.cookie);
  const shouldLock = useRef(true);

  useEffect(() => {
    if (shouldLock.current) {
      shouldLock.current = false;
      console.log('fetching server from useAuth.jsx');
      axios
        .get('http://127.0.0.1:8080/auth', {
          // Adjust the URL as needed
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            return res.data;
          }
          throw new Error('Unauthorized');
        })
        .then((data) => {
          console.log('data:', data);
          setAuthentication(data.user);
          setIsLoading(false);
        })
        .catch((error) => {
          setAuthentication(false);
          setIsLoading(false);
          console.error(error);
        });
    }
  }, [cookies]);

  return { authenticated, setAuthentication, isLoading };
};
