import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoadingScreen from './components/LoadingScreen';

export const useAuth = () => {
  const [authenticated, setAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();
  // const location = useLocation();
  const cookies = Cookies.get('access_token');
  //we use 'shoudLock' because of React 18 new functionality of useEffect which runs twice.
  const shouldLock = useRef(true);
  useEffect(() => {
    if (shouldLock.current) {
      shouldLock.current = false;

      // if (!cookies) {
      //   console.log('NO COOKIES = NO FETCHING');
      //   setIsLoading(false);
      //   setAuthentication(false);
      //   return;
      // }
      console.log('fetching server from useAuth.jsx');
      fetch('https://qhc5nx-8080.preview.csb.app/auth', {
        //https://qhc5nx-8080.preview.csb.app/auth
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
          console.log('res:', res);
          setAuthentication(res.user);
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
