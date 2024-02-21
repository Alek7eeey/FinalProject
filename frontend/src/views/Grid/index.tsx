import React, {FC} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from "./style";
import types from "../../enumTypes";
import {CellConfig, IGrid} from "./interface";

const Grid:FC<IGrid> = ({data, clickEntry}) => {
    const classes = useStyles();

    const cellConfig: CellConfig[] = [
        { align: "center", dataKey: "id", headerName: "ID" },
        { align: "center", dataKey: "name", headerName: "Название" },
        { align: "center", dataKey: "type", headerName: "Тип" },
        { align: "center", dataKey: "parentName", headerName: "Имя родителя" },
        { align: "center", dataKey: "description", headerName: "Описание" }
    ];

    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {cellConfig.map((cell, index) => (
                            <TableCell key={index} align={cell.align}>{cell.headerName}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((data) => (
                        <TableRow key={data.id} className={classes.row} onClick={()=>clickEntry(data.name, data.type as types, data.description)}>
                            {cellConfig.map((cell, index) => (
                                <TableCell key={index} component="th" scope="row" align={cell.align}>{data[cell.dataKey]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Grid;