import types from "../enumTypes";

export interface IGridContainer  {
    data: {
        id: number;
        name: string;
        type: string;
        parentName: string;
        description: string;
    }[]
}

export interface INavigation {
    filter: (type: types, name: string) => void;
}

export interface INode{
    nodeName: string;
    nodeType: types | undefined;
}

export interface ISubNode{
    name: string | undefined;
    type: types | undefined;
}