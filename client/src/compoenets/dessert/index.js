import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import api from '../../constant/api';
import Box from '@mui/material/Box';
import toastr from 'toastr';
import {
    getList,
    dessertAdd,
    dessertDelete,
    dessertUpdate
} from '../../redux/reducer/dessertReducer';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const Dessert = () => {
    const dispatch = useDispatch();
    const { dessertList } = useSelector(
        (state) => state.dessert
    );

    const [temp, setTemp] = useState({
        open: false,
        id: "",
        state: 0
    });

    const [data, setData] = useState({
        dessert: "",
        calory: 0,
        fat: 0,
        carb: 0,
        protein: 0,
    })

    const handleOpen = () => {
        setTemp(data => {
            return {
                ...data,
                open: true,
                state: 0
            }
        })
    }

    const handleClose = () => {
        setTemp(data => {
            return {
                ...data,
                open: false
            }
        })
    }

    const handleChange = (v) => {
        setTemp(data => {
            return {
                ...data,
                open: true,
                state: 1,
                id: dessertList[v]._id
            }
        })
    }

    const handleUpdate = async (v) => {
        try {
            if (data.dessert === ""
                && data.calory === ""
                && data.fat === ""
                && data.carb === ""
                && data.protein === "") {
                toastr.error("Enter all info");
            } else if (data.dessert === "") {
                toastr.error("Enter dessert info");
            } else if (data.calory === "") {
                toastr.error("Enter calory info");
            } else if (data.fat === "") {
                toastr.error("Enter fat info");
            } else if (data.carb === "") {
                toastr.error("Enter carb info");
            } else if (data.protein === "") {
                toastr.error("Enter protein info");
            } else {
                const dessertData = {
                    _id: temp.id,
                    protein: data.protein,
                    calory: data.calory,
                    dessert: data.dessert,
                    carb: data.carb,
                    fat: data.fat,
                    index: v,
                }
                const response = await api.post('/update', {
                    data: dessertData
                });
                if (response.status === 200) {
                    setTemp(data => {
                        return {
                            ...data,
                            open: false
                        }
                    })
                    toastr.success("Successed!");
                    dispatch(dessertUpdate(dessertData));
                } else {
                    toastr.error(response.data.message);
                }
            }
        } catch (err) {
            toastr.error("Can't connect to server");
        }
    }


    const handleDelete = async (v) => {
        try {
            const data = await api.post('/delete', {
                _id: dessertList[v]._id
            });
            if (data.status === 200) {
                toastr.success("Successed!");
                dispatch(dessertDelete(dessertList[v]._id));
            } else {
                toastr.error("Failed!");
            }
        } catch (err) {
            toastr.error("Failed")
        }
    }

    const handleAdd = async () => {
        try {
            if (data.dessert === ""
                && data.calory === ""
                && data.fat === ""
                && data.carb === ""
                && data.protein === "") {
                toastr.error("Enter all info");
            } else if (data.dessert === "") {
                toastr.error("Enter dessert info");
            } else if (data.calory === "") {
                toastr.error("Enter calory info");
            } else if (data.fat === "") {
                toastr.error("Enter fat info");
            } else if (data.carb === "") {
                toastr.error("Enter carb info");
            } else if (data.protein === "") {
                toastr.error("Enter protein info");
            } else {
                const response = await api.post('/newAdd', {
                    data: data
                });
                console.log(response);
                setTemp(data => {
                    return {
                        ...data,
                        open: false
                    }
                })
                if (response.status === 200) {
                    toastr.success(response.data.message);
                    dispatch(dessertAdd(data));
                    return;
                } else {
                    toastr.error(response.data.message);
                    return;
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleTest = () => {
        if (temp.state === 0) {
            handleAdd();
            return;
        } else {
            handleUpdate(temp.id);
        }
    }
    useEffect(() => {
        api.get('/getDessert').then((response) => {
            if (response.status === 200) {
                dispatch(getList(response.data));
            } else if (response.status === 202) {
                localStorage.removeItem("token");
                toastr.error(response.data);
            } else {
                toastr.error(response.data);
            }
        }).catch(() => {
            toastr.error("Can't connect to server!");
        });
    }, []);

    return (
        dessertList && <div>
            <TableContainer
                component={Paper}
                className='container'
                style={{
                    top: "25%",
                    left: "25%",
                    position: "absolute",
                    width: "50%"
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => handleOpen()}
                >
                    New
                </Button>

                <Table
                    sx={{ minWidth: 700, marginTop: "10px" }}
                    aria-label="customized table"
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                            <StyledTableCell align="right">calorys</StyledTableCell>
                            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                            <StyledTableCell align="right">Operate</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {dessertList.map((row, index) => (
                            <StyledTableRow key={row._id}>

                                <StyledTableCell component="th" scope="row">
                                    {row.dessert}
                                </StyledTableCell>

                                <StyledTableCell align="right">{row.calory}</StyledTableCell>
                                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                <StyledTableCell align="right">{row.carb}</StyledTableCell>
                                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                <StyledTableCell align="right">

                                    <Button v
                                        ariant='text'
                                        onClick={() => handleChange(index)}
                                    >
                                        edit
                                    </Button>

                                    <Button
                                        onClick={() => handleDelete(index)}
                                    >
                                        delete
                                    </Button>

                                </StyledTableCell>

                            </StyledTableRow>
                        ))}

                    </TableBody>

                </Table>

            </TableContainer>

            <Modal
                open={temp.open}
                onClose={() => handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1
                        style={{ fontSize: "30px" }}
                        className='text-center'
                    >
                        New Dessert
                    </h1>

                    <TextField
                        id="outlined-basic"
                        label="Dessert"
                        variant="outlined"
                        style={{
                            width: "100%",
                            marginTop: "20px"
                        }}
                        value={data.dessert || undefined}
                        size='small'
                        onChange={(e) => setData(data => {
                            return {
                                ...data,
                                dessert: e.target.value
                            }
                        })}
                    />

                    <TextField
                        value={data.calory || undefined}
                        id="outlined-basic"
                        label="calory"
                        variant="outlined"
                        style={{
                            width: "100%",
                            marginTop: "20px"
                        }}
                        size='small'
                        onChange={(e) => setData(data => {
                            return {
                                ...data,
                                calory: e.target.value
                            }
                        })}
                        type="number"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Fat"
                        value={data.fat || undefined}
                        variant="outlined"
                        style={{
                            width: "100%",
                            marginTop: "20px"
                        }}
                        size='small'
                        onChange={(e) => setData(data => {
                            return {
                                ...data,
                                fat: e.target.value
                            }
                        })}
                        type="number"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Carbs"
                        value={data.carb || undefined}
                        variant="outlined"
                        style={{
                            width: "100%",
                            marginTop: "20px"
                        }}
                        size='small'
                        onChange={(e) => setData(data => {
                            return {
                                ...data,
                                carb: e.target.value
                            }
                        })}
                        type="number"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Protein"
                        value={data.protein || undefined}
                        variant="outlined"
                        style={{
                            width: "100%",
                            marginTop: "20px"
                        }}
                        size='small'
                        onChange={(e) => setData(data => {
                            return {
                                ...data,
                                protein: e.target.value
                            }
                        })}
                        type="number"
                    />

                    <Button
                        variant='contained'
                        style={{
                            marginTop: "20px",
                            float: "right"
                        }}
                        onClick={() => handleTest()} >
                        Save
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default Dessert;