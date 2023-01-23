// import React from 'react';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import LoadingScreen from './components/LoadingScreen';

// const useAuth = () => {
//   const [authenticated, setAuthentication] = useState('auth-not-yet-set');
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch('http://localhost:8080/auth', {
//       mode: 'cors',
//       headers: {
//         Authorization: `Bearer ${Cookies.get('access_token')}`,
//       },
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         throw new Error('Unauthorized');
//       })
//       .then((res) => {
//         setAuthentication(res);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         setAuthentication(false);
//         setIsLoading(false);
//         console.error(error);
//       });
//   }, []);
//   return { authenticated, isLoading };
// };
