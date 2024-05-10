import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState } from "react";
import api from "../../constant/api";
import toastr from 'toastr';

const App = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    })

    const handleLogin = async () => {
        if (data.username === ""
            || data.password === ""
            || data.confirmPassword === ""
        ) {
            toastr.error("Enter all info", "error");
            return;
        } else if (data.password !== data.confirmPassword) {
            toastr.error("Wrong two password", "error");
        } else {
            try {
                const respose = await api.post('/signup', {
                    email: data.username,
                    password: data.password,
                });

                if (respose.status === 200) {
                    toastr.success(respose.data);
                    navigate("/login");
                } else {
                    toastr.error(respose.data);
                }
            } catch (err) {
                toastr.error("Can't connect to server");
            }
            return;
        }
    }

    return (
        <>
            <div
                style={{
                    paddingLeft: "45%"
                }}
            >
                <div
                    className="flex items-center justify-center"
                >
                    <h1
                        style={{
                            fontSize: "70px",
                            paddingTop: "15vh"
                        }}
                    >
                        SignUp
                    </h1>
                </div>
                <div
                    className="flex items-center justify-center"
                >
                    <TextField
                        id="outlined-basic"
                        label="E-mail"
                        variant="outlined"
                        onChange={(e) => setData(data => {
                            return {
                                ...data,
                                username: e.target.value
                            }
                        }
                        )}
                        style={{ width: "20%" }}
                    />
                </div>

                <div
                    className="flex items-center justify-center"
                    style={{ paddingTop: "20px" }}
                >
                    <TextField
                        id="outlined-basic"
                        type="password"
                        label="Password"
                        variant="outlined"
                        style={{ width: "20%" }}
                        onChange={(e) => setData(data => {
                            return {
                                ...data,
                                password: e.target.value
                            }
                        }
                        )}
                    />
                </div>
                <div
                    className="flex items-center justify-center"
                    style={{
                        paddingTop: "20px"
                    }}
                >
                    <TextField
                        type="password"
                        id="outlined-basic"
                        label="ConfirmPassword"
                        variant="outlined"
                        style={{
                            width: "20%"
                        }}
                        onChange={(e) => setData(data => {
                            return {
                                ...data,
                                confirmPassword: e.target.value
                            }
                        }
                        )}
                    />
                </div>
                <div
                    className="flex items-center justify-center"
                    style={{
                        paddingTop:
                            "20px"
                    }}
                >
                    <Button
                        variant="contained"
                        style={{
                            width: "20%"
                        }}
                        onClick={() => handleLogin()}
                    >
                        sumit
                    </Button>
                </div>
                <div
                    className="flex items-center justify-center"
                    style={{
                        paddingTop: "20px"
                    }}
                >
                    <Button
                        variant="contained"
                        style={{
                            width: "20%"
                        }}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </>
    )
}

export default App;