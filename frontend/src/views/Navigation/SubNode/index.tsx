import React, {FC, ReactElement} from "react";
import {IconButton} from "@material-ui/core";
// @ts-ignore
import icon from "../../../img/addNewNote.png";
import useStyles from "./style";
import RemoveIcon from "@material-ui/icons/Remove";

interface ISubNode{
    name: string;
    type: string;
    removeNode: ()=> void;
    openEntryModal: ()=>void;
}

const SubNode: FC<ISubNode> = ({name, type, removeNode, openEntryModal}): ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.subItem}>
                <div className={classes.innerLeftPanel}>
                    {name}
                </div>
                <div className={classes.innerRightPanel}>
                    <IconButton color="secondary" aria-label="remove" onClick={(event) => {event.stopPropagation(); removeNode();}}>
                        <RemoveIcon style={{ color: 'red' }} />
                    </IconButton>

                    <IconButton color="primary" aria-label="add" onClick={(event)=>{event.stopPropagation(); openEntryModal();}}>
                        <img src={icon} alt='icon'/>
                    </IconButton>
                </div>
        </div>
    )
}

export default SubNode;