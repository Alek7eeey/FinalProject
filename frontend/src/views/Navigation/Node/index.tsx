import React, {FC} from "react";
import {IconButton} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./style";
import RemoveIcon from '@material-ui/icons/Remove';
import {ColorButtonConfig, INode} from "../interfaces";

const Node:FC<INode> = ({name, openModal, removeNode, filter}) => {
    const classes = useStyles();

    const buttonsConfig: ColorButtonConfig[] = [
        {
            color: "secondary",
            ariaLabel: "remove",
            onClick: removeNode,
            children: <RemoveIcon style={{ color: 'red' }} />
        },
        {
            color: "primary",
            ariaLabel: "add",
            onClick: openModal,
            children: <AddIcon style={{ color: 'green' }} />
        }
    ];

    return (
        <div className={classes.itemContainer} id={name} onClick={filter}>
            <div className={classes.innerLeftPanel}>{name}</div>
            <div className={classes.innerRightPanel}>
                {buttonsConfig.map((button, index) => (
                    <IconButton
                        key={index}
                        color={button.color}
                        aria-label={button.ariaLabel}
                        onClick={(event) => {event.stopPropagation(); button.onClick();}}
                    >
                        {button.children}
                    </IconButton>
                ))}
            </div>
        </div>
    );
};

export default Node;