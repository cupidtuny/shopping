import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'toastr/build/toastr.css';
import './index.css';
import reportWebVitals from './reportWebVitals';

const Login = lazy(() => import('./compoenets/auth/login'));
const SignUp = lazy(() => import('./compoenets/auth/signUp'));
const Dessert = lazy(() => import('./compoenets/dessert/index'));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Dessert />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/dessert" element={<Dessert />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
