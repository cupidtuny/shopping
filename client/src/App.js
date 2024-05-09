import { userExists, userNotExists } from './redux/reducer/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Router, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Login from './compoenets/auth/login';
import { serverUrl } from "./constant/config";
import { Suspense, lazy, useEffect } from 'react';
import "toastr/build/toastr.css";
import axios from 'axios';
import './App.css';
import toastr from 'toastr';

// const Home = lazy(() => import('./compoenets/home/index'));
const SignUp = lazy(() => import("./compoenets/auth/signUp"));
const Dessert = lazy(() => import("./compoenets/dessert/index"));

function App() {
  const { user, logined } = useSelector((state) => state.auth);
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
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);

  return logined ? (
    <Login />
  ) : (
    <>
    </>
  )
}

export default App;
