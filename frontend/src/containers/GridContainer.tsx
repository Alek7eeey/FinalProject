import Grid from "../views/Grid";
import {observer} from "mobx-react-lite";
import {FC, ReactElement} from "react";
import types from "../enumTypes";

interface IGridContainer  {
    data: {
        id: number;
        name: string;
        type: string;
        parentName: string;
        description: string;
    }[]
}

const GridContainer:FC<IGridContainer> = observer(({data}):ReactElement => {

    //временно так
    const clickEntry = (name: string, type: types, description: string):void => {
        alert(name + ' ' + type + ' ' + description);
    }

    return (
        <Grid data={data} clickEntry={clickEntry}/>
    )
})

export default GridContainer;