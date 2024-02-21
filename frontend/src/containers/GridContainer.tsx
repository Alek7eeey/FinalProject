import Grid from "../views/Grid";
import {observer} from "mobx-react-lite";
import {FC} from "react";
import types from "../enumTypes";
import {IGridContainer} from "./interfaces";

const GridContainer:FC<IGridContainer> = observer(({data}) => {

    //временно так
    const clickEntry = (name: string, type: types, description: string):void => {
        alert(name + ' ' + type + ' ' + description);
    }

    return (
        <Grid data={data} clickEntry={clickEntry}/>
    )
})

export default GridContainer;