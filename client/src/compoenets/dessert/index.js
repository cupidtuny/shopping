import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
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
import Box from '@mui/material/Box';
import toastr from 'toastr';
import axios from 'axios';

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
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
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

export default function CustomizedTables(props) {
    const [open, setOpen] = useState(false);
    const [dessert, setDessert] = useState("");
    const [calorie, setCalorie] = useState("");
    const [fat, setFat] = useState("");
    const [carb, setCarbs] = useState("");
    const [protein, setProtein] = useState("");
    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    const [state, setState] = useState(0);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_DOMIN}/getDessert`).then(res => {
            if (res.status === 304) toastr.error(res.data);
            else if (res.status === 200) setData(res.data);
        }).catch(e => {
            toastr.error("Can't connect to server");
        })
    }, []);

    const handleOpen = () => {
        setOpen(true);
        setState(0);
    }

    const handleClose = () => setOpen(false);

    const handleUpdate = (v) => {
        setState(1);
        setId(data[v]._id);
        setDessert(data[v].name);
        setCalorie(data[v].calory);
        setFat(data[v].fat);
        setCarbs(data[v].carb);
        setProtein(data[v].protein);
        setOpen(true);
    }

    const handleDelete = (v) => {
        axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/delete`, { _id: data[v]._id }).then(res => {
            toastr.success(res.data);
            let list = data.filter(item => item._id !== data[v]._id)
            setData(list);
        }).catch(e => {
            toastr.error("Can't connect to server");
        })
    }

    const handleAdd = () => {
        if (dessert === "" && calorie === "" && fat === "" && carb ===
            "" && protein === ""
        ) toastr.error("Enter all info");
        else if (dessert === "") toastr.error("Enter dessert info");
        else if (calorie === "") toastr.error("Enter calorie info");
        else if (fat === "") toastr.error("Enter fat info");
        else if (carb === "") toastr.error("Enter carb info");
        else if (protein === "") toastr.error("Enter protein info");
        else if (dessert !== "" && calorie !== "" && fat !== "" && carb !==
            "" && protein !== "" && state === 0) {
            axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/newAdd`, {
                name: dessert,
                calory: calorie,
                fat: fat,
                carb: carb,
                protein: protein
            }).then(res => {
                if (res.status === 200) {
                    setOpen(false);
                    toastr.success("Success add");
                    setData([...data, res.data])
                }
            }).catch(e => {
                toastr.error("Can't connect to server");
            })
        }
        else if (dessert !== "" && calorie !== "" && fat !== "" && carb !==
            "" && protein !== "" && state === 1) {
            axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/update`, {
                _id: id,
                name: dessert,
                calory: calorie,
                fat: fat,
                carb: carb,
                protein: protein
            }).then(res => {
                var exe = {
                    _id: id,
                    name: dessert,
                    calory: calorie,
                    fat: fat,
                    carb: carb,
                    protein: protein
                }
                var list = [];
                data.map(item => {
                    if (item._id !== id) list.push(item);
                    else list.push(exe);
                });
                setData(list);
                setOpen(false);
                toastr.success("Success updating");
            }).catch(e => {
                toastr.error("Can't connect to server");
            })
        }
    }
    
    return (
        <div>
            <TableContainer component={Paper} className='container' style={{ top: "25%", left: "25%", position: "absolute", width: "50%" }} >
                <Button variant="contained" onClick={() => handleOpen()}>
                    New
                </Button>
                <Table sx={{ minWidth: 700, marginTop: "10px" }} aria-label="customized table">
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
                        {(data || []).map((row, index) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.calory}</StyledTableCell>
                                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                <StyledTableCell align="right">{row.carb}</StyledTableCell>
                                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant='text' onClick={() => handleUpdate(index)} >
                                        edit
                                    </Button>
                                    <Button onClick={() => handleDelete(index)} >
                                        delete
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={() => handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1 style={{ fontSize: "30px" }} className='text-center'>New Dessert</h1>
                    <TextField id="outlined-basic" label="Dessert" variant="outlined" style={{ width: "100%", marginTop: "20px" }} value={dessert || undefined} size='small' onChange={(e) => setDessert(e.target.value)} />
                    <TextField id="outlined-basic" label="Calorie" variant="outlined" style={{ width: "100%", marginTop: "20px" }} value={calorie || undefined} size='small' onChange={(e) => setCalorie(e.target.value)} type="number" />
                    <TextField id="outlined-basic" label="Fat" value={fat || undefined} variant="outlined" style={{ width: "100%", marginTop: "20px" }} size='small' onChange={(e) => setFat(e.target.value)} type="number" />
                    <TextField id="outlined-basic" label="Carbs" value={carb || undefined} variant="outlined" style={{ width: "100%", marginTop: "20px" }} size='small' onChange={(e) => setCarbs(e.target.value)} type="number" />
                    <TextField id="outlined-basic" label="Protein" value={protein || undefined} variant="outlined" style={{ width: "100%", marginTop: "20px" }} size='small' onChange={(e) => setProtein(e.target.value)} type="number" />
                    <Button variant='contained' style={{ marginTop: "20px" }} onClick={() => handleAdd()} >{state === 0 ? "Save" : "Update"}</Button>
                </Box>
            </Modal>
        </div>
    );
}