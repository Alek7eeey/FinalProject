import {types} from "mobx-state-tree";

export const Entry = types.model({
    id: types.number,
    name: types.string,
    type: types.string,
    parentName: types.string,
    description: types.string,
});

