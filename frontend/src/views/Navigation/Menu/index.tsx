import React, {FC, ReactElement} from 'react';
import { List} from '@material-ui/core';
import useStyles from "./style";
import {IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Node from "../Node";
import SubNode from "../SubNode";
import {observer} from "mobx-react-lite";
import types from "../../../enumTypes";

interface IMenu {
    data: {
        nodeName: string,
        nodeType: string,
        subNodes: {name: string, type: string}[]
    }[],
    openModal: ()=>void;
    openSubNodeModal: (parentName: string, parentType: types)=>void;
    openEntryModal: (parentName: string, parentType: types, childNodeName: string)=>void;
    removeNode: (name: string, type: string)=>void;
    removeSubNode: (name: string, parentName: string) => void;
    filter: (name: string, type: types)=>void;
}
const NestedMenu: FC<IMenu> = observer(({data, openModal, openSubNodeModal, openEntryModal, removeNode, removeSubNode, filter }):ReactElement => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <List>
                    <div className={classes.itemContainer} onClick={()=>{filter('Объекты',types.default as types)}}>
                        Объекты
                        <IconButton color="primary" aria-label="add" onClick={(event)=>{event.stopPropagation();openModal();}}>
                            <AddIcon style={{ color: 'green' }} />
                        </IconButton>
                    </div>
                        <ul>
                            {data.map((info) => {
                                return (
                                    <li>
                                        <div>
                                            <Node name={info.nodeName + ' (' + info.nodeType + ')'}
                                                  openModal={()=>{openSubNodeModal(info.nodeName, info.nodeType as types)}}
                                                  removeNode={()=>{removeNode(info.nodeName, info.nodeType)}} filter={()=>{filter(info.nodeName, info.nodeType as types)}}/>
                                        </div>

                                        <ul>
                                            {info.subNodes.map((subNode) => {
                                                return(
                                                    <div onClick={()=>{filter(subNode.name, subNode.type as types)}}>
                                                        <SubNode name={subNode.name}
                                                                 type={subNode.type}
                                                                 removeNode={()=>{removeSubNode(subNode.name,info.nodeName)}}
                                                                 openEntryModal={()=>{openEntryModal(info.nodeName,info.nodeType as types, subNode.name)}}/>

                                                    </div>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                );
                            })}
                        </ul>
                </List>
            </div>
        </div>
    );
});

export default NestedMenu;
