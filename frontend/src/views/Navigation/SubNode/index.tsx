import React, {FC} from "react";
import {IconButton} from "@material-ui/core";
// @ts-ignore
import icon from "../../../img/addNewNote.png";
import useStyles from "./style";
import RemoveIcon from "@material-ui/icons/Remove";
import {ColorButtonConfig, ISubNode} from "../interfaces";

const SubNode: FC<ISubNode> = ({name, type, removeNode, openEntryModal}) => {
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
            onClick: openEntryModal,
            children: <img src={icon} alt='icon'/>
        }
    ];

    return (
        <div className={classes.subItem}>
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
}

export default SubNode;