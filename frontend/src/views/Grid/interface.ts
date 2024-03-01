import types from "../../enumTypes";
import {TableCellProps} from "@material-ui/core";

export interface IGrid{
    data: {
        id: number;
        name: string;
        type: string;
        parentName: string;
        description: string;
    }[],

    clickEntry: (name: string, type: types, description: string, parentName: string, id: number)=> void;
}

export type DataKey = 'id' | 'name' | 'type' | 'parentName' | 'description';

export type CellConfig = {
    align: TableCellProps['align'],
    dataKey: DataKey,
    headerName: string
};