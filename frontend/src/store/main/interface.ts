import types from "../../enumTypes";

export interface INodeData {
    name: string,
    type: types,
    parentName: string
}

export interface IEntryData {
    name: string,
    type: types,
    description: string,
    parentName: string,
    childNodeName: string
}