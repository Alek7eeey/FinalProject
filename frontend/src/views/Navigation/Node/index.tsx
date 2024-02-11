import React, {FC, ReactElement} from "react";
import {IconButton} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./style";
import RemoveIcon from '@material-ui/icons/Remove';

interface INode {
    name: string;
    openModal: ()=> void;
    removeNode: ()=>void;
    filter: ()=>void;
}
const Node:FC<INode> = ({name, openModal, removeNode, filter}):ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.itemContainer} id={name} onClick={filter}>
            <div className={classes.innerLeftPanel}>
                {name}
            </div>
            <div className={classes.innerRightPanel}>
            <IconButton color="secondary" aria-label="remove" onClick={(event) => {event.stopPropagation(); removeNode();}}>
                <RemoveIcon style={{ color: 'red' }} />
            </IconButton>
            <IconButton color="primary" aria-label="add" onClick={(event) => {event.stopPropagation(); openModal();}}>
                <AddIcon style={{ color: 'green' }} />
            </IconButton>
            </div>
        </div>
    )
}

export default Node;