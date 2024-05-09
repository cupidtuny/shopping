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

const CustomizedTables = (props) => {
    const dispatch = useDispatch();
    const { dessertList } = useSelector(
        (state) => state.dessert
    );

    const [temp, setTemp] = useState({
        open: false,
        id: "",
    });

    const [data, setData] = useState({
        dessert: "",
        calorie: "",
        fat: "",
        carb: "",
        protein: "",
    })

    const handleOpen = () => {
        setTemp({ open: true });
        setTemp({ state: 0 });
    }

    const handleClose = () => {
        setTemp({ open: false });
    }

    const handleUpdate = async (v) => {
        setTemp({ open: true });
        if (data.dessert === ""
            && data.calorie === ""
            && data.fat === ""
            && data.carb === ""
            && data.protein === "") {
            toastr.error("Enter all info");
        } else if (data.dessert === "") {
            toastr.error("Enter dessert info");
        } else if (data.calorie === "") {
            toastr.error("Enter calorie info");
        } else if (data.fat === "") {
            toastr.error("Enter fat info");
        } else if (data.carb === "") {
            toastr.error("Enter carb info");
        } else if (data.protein === "") {
            toastr.error("Enter protein info");
        } else if (data.dessert !== ""
            && data.calorie !== ""
            && data.fat !== ""
            && data.carb !== ""
            && data.protein !== ""
            && data.state === 0) {
            try {
                var dessertData = {
                    _id: dessertList[v]._id,
                    protein: data.protein,
                    calory: data.calorie,
                    name: data.dessert,
                    carb: data.carb,
                    fat: data.fat,
                    index: v,
                }
                const data = await api.post('/update', {
                    data: dessertData
                });
                if (data.status === 200) {
                    toastr.success("Successed!");
                    dispatch(dessertUpdate(dessertData));
                } else {
                    toastr.error("Failed!");
                }
            } catch (err) {
                toastr.error("Can't connect to server");
            }
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
        if (data.dessert === ""
            && data.calorie === ""
            && data.fat === ""
            && data.carb === ""
            && data.protein === "") {
            toastr.error("Enter all info");
        } else if (data.dessert === "") {
            toastr.error("Enter dessert info");
        } else if (data.calorie === "") {
            toastr.error("Enter calorie info");
        } else if (data.fat === "") {
            toastr.error("Enter fat info");
        } else if (data.carb === "") {
            toastr.error("Enter carb info");
        } else if (data.protein === "") {
            toastr.error("Enter protein info");
        } else if (data.dessert !== ""
            && data.calorie !== ""
            && data.fat !== ""
            && data.carb !== ""
            && data.protein !== ""
            && data.state === 0) {
            try {
                const data = await api.post('/newAdd', {
                    data: data
                });
                if (data.status === 200) {
                    toastr.success("Successed!");
                    dispatch(dessertAdd(data));
                } else {
                    toastr.error("Failed!");
                }
            } catch (err) {
                toastr.error("Can't connect to server");
            }
        }
    }

    useEffect(() => {
        api.get('/getDessert').then(({ data }) => {
            dispatch(dessertList(data));
        }).catch((err) => {
            toastr.error("Can't connect to server!");
        });
    }, []);

    return (
        <div>
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
                            <StyledTableCell align="right">Calories</StyledTableCell>
                            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                            <StyledTableCell align="right">Operate</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(dessertList || []).map((row, index) => (
                            <StyledTableRow key={row.name}>

                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>

                                <StyledTableCell align="right">{row.calory}</StyledTableCell>
                                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                <StyledTableCell align="right">{row.carb}</StyledTableCell>
                                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                <StyledTableCell align="right">

                                    <Button v
                                        ariant='text'
                                        onClick={() => handleUpdate(index)}
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
                        onChange={(e) => setData({
                            dessert: e.target.value
                        })}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Calorie"
                        variant="outlined"
                        style={{
                            width: "100%",
                            marginTop: "20px"
                        }}
                        value={data.calorie || undefined}
                        size='small'
                        onChange={(e) => setData({
                            calorie: e.target.value
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
                        onChange={(e) => setData({
                            fat: e.target.value
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
                        onChange={(e) => setData({
                            carb: e.target.value
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
                        onChange={(e) => setData({
                            protein: e.target.value
                        })}
                        type="number"
                    />

                    <Button
                        variant='contained'
                        style={{
                            marginTop: "20px"
                        }}
                        onClick={() => handleAdd()} >
                        Save
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default CustomizedTables;