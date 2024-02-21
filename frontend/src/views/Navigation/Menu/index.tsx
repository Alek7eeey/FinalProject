import React, {FC} from 'react';
import { List, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Node from "../Node";
import SubNode from "../SubNode";
import {observer} from "mobx-react-lite";
import types from "../../../enumTypes";
import {rootNodeName} from "../../../constants";
import {IMenu} from "../interfaces";
import useStyles from "./style";

const NestedMenu: FC<IMenu> = observer(({data, openModal, openSubNodeModal, openEntryModal, removeNode, removeSubNode, filter }) => {
    const classes = useStyles();

    const handleOpenModal = (event: React.MouseEvent):void => {
        event.stopPropagation();
        openModal();
    };

    return (
        <div className={classes.root}>
            <List>
                <div className={classes.itemContainer} onClick={() => filter(rootNodeName, types.default as types)}>
                    {rootNodeName}
                    <IconButton color="primary" aria-label="add" onClick={handleOpenModal}>
                        <AddIcon style={{ color: 'green' }} />
                    </IconButton>
                </div>
                <ul>
                    {data.map((info) => (
                        <li key={info.nodeName}>
                            <Node
                                name={`${info.nodeName} (${info.nodeType})`}
                                openModal={() => openSubNodeModal(info.nodeName, info.nodeType as types)}
                                removeNode={() => removeNode(info.nodeName, info.nodeType)}
                                filter={() => filter(info.nodeName, info.nodeType as types)}
                            />
                            <ul>
                                {info.subNodes.map((subNode) => (
                                    <div key={subNode.name} onClick={() => filter(subNode.name, subNode.type as types)}>
                                        <SubNode
                                            name={subNode.name}
                                            type={subNode.type}
                                            removeNode={() => removeSubNode(subNode.name, info.nodeName)}
                                            openEntryModal={() => openEntryModal(info.nodeName, info.nodeType as types, subNode.name)}
                                        />
                                    </div>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </List>
        </div>
    );
});

export default NestedMenu;
