import React, { useState } from 'react';
import toastr from 'toastr';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { userExists } from '../../redux/reducer/authReducer';
import api from '../../constant/api';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        username: '',
        password: '',
    });

    const handleLogin = async () => {
        if (data.username === '' || data.password === '') {
            toastr.error('Enter all info', 'error');
        } else {
            try {
                const response = await api.post('/login', {
                    email: data.username,
                    password: data.password,
                });
                if (response.status === 200) {
                    localStorage.setItem('token', `${response.data.token}`);
                    const token = jwtDecode(response.data.token);
                    dispatch(userExists(token));
                    toastr.success('Success to login');
                    navigate('/');
                } else {
                    toastr.error(response.data);
                }
            } catch (err) {
                toastr.error("Can't connect to server");
            }
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div
                style={{
                    paddingLeft: '40%',
                }}
            >
                <div className="flex items-center justify-center  ">
                    <h1
                        style={{
                            fontSize: '100px',
                            paddingTop: '25vh',
                        }}
                    >
                        Login
                    </h1>
                </div>
                <div className="flex items-center justify-center">
                    <TextField
                        id="outlined-basic"
                        label="E-mail"
                        variant="outlined"
                        onChange={(e) =>
                            setData((value) => ({
                                ...value,
                                username: e.target.value,
                            }))
                        }
                        style={{ width: '20%' }}
                    />
                </div>
                <div
                    className="flex items-center justify-center"
                    style={{
                        paddingTop: '20px',
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        type="password"
                        label="Password"
                        variant="outlined"
                        style={{ width: '20%' }}
                        onChange={(e) =>
                            setData((value) => ({
                                ...value,
                                password: e.target.value,
                            }))
                        }
                    />
                </div>
                <div
                    className="flex items-center justify-center"
                    style={{
                        paddingTop: '20px',
                    }}
                >
                    <Button
                        variant="contained"
                        style={{
                            width: '20%',
                        }}
                        onClick={() => handleLogin()}
                    >
                        Login
                    </Button>
                </div>
                <div
                    className="flex items-center justify-center"
                    style={{
                        paddingTop: '20px',
                    }}
                >
                    <Button
                        variant="contained"
                        style={{
                            width: '20%',
                        }}
                        onClick={() => navigate('/signup')}
                    >
                        SignUp
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
