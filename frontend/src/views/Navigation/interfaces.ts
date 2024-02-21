import types from "../../enumTypes";

export interface IMenu {
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

export interface INode {
    name: string;
    openModal: ()=> void;
    removeNode: ()=>void;
    filter: ()=>void;
}

export interface ISubNode{
    name: string;
    type: string;
    removeNode: ()=> void;
    openEntryModal: ()=>void;
}

export type ColorButtonConfig = {
    color: 'default' | 'inherit' | 'primary' | 'secondary',
    ariaLabel: string,
    onClick: () => void,
    children: JSX.Element
};