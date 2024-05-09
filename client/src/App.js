import { userExists, userNotExists } from './redux/reducer/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './compoenets/auth/login';
import { serverUrl } from "./constant/config";
import { Suspense, lazy, useEffect } from 'react';
import "toastr/build/toastr.css";
import axios from 'axios';
import './App.css';

const SignUp = lazy(() => import("./compoenets/auth/signUp"));
const Dessert = lazy(() => import("./compoenets/dessert/index"));

function App() {
  const { user, logined } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(serverUrl);
    axios
      .post(`${serverUrl}/user/getToken`)
      .then(({ data }) => dispatch(userExists(data)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);

  return logined ? (
    <Login />
  ) : (
    <>
      <BrowserRouter>
        <Suspense fallback={<h1 className='text-center'>loading...</h1>} >
          <Routes>
            {/* when url is default */}
            <Route
              path='/'
              element={<Dessert />}
            />
            <Route
              path="/dessert"
              element={<Dessert />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signUp"
              element={<SignUp />}
            />
            <Route
              path='*'
              element={<h1 className='text-center'>Not Pages</h1>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App;
