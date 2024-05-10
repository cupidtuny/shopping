import { userExists, userNotExists } from './redux/reducer/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, lazy, useEffect } from 'react';
import Login from './compoenets/auth/login';
import serverUrl  from "./constant/config";
import "toastr/build/toastr.css";
import toastr from 'toastr';
import axios from 'axios';
import './App.css';

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
