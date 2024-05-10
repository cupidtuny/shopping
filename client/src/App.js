import { userExists, userNotExists } from './redux/reducer/authReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import serverUrl from "./constant/config";
import "toastr/build/toastr.css";
import toastr from 'toastr';
import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .post(`${serverUrl}/refresh`, {
        token: token
      })
      .then(({ response }) => {
        if (response.status === 200) {
          dispatch(userExists(response.data))
        } else {
          localStorage.removeItem("token");
          dispatch(userNotExists())
          toastr.error(response.data);
        }
      })
      .catch(() => dispatch(userNotExists()));
  }, [dispatch]);

  return (
    <>
      <div></div>
    </>
  )
}

export default App;
