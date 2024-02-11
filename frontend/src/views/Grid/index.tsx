import React, {FC, ReactElement} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from "./style";
import types from "../../enumTypes";

interface IGrid{
    data: {
        id: number;
        name: string;
        type: string;
        parentName: string;
        description: string;
    }[],

    clickEntry: (name: string, type: types, description: string)=> void;
}
const Grid:FC<IGrid> = ({data, clickEntry}) :ReactElement => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Название</TableCell>
                        <TableCell align="center">Тип</TableCell>
                        <TableCell align="center">Родитель</TableCell>
                        <TableCell align="center">Описание</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((data) => (
                        <TableRow key={data.id} className={classes.row} onClick={()=>clickEntry(data.name, data.type as types, data.description)}>
                            <TableCell component="th" scope="row">{data.id}</TableCell>
                            <TableCell align="center">{data.name}</TableCell>
                            <TableCell align="center">{data.type}</TableCell>
                            <TableCell align="center">{data.parentName}</TableCell>
                            <TableCell align="center">{data.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Grid;