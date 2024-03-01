import {flow, types} from "mobx-state-tree";
import {Entry} from "../entry";
import enumTypes from "../../../enumTypes";
import {IEntryData} from "../interface";
import {axiosPost} from "../../../axios";
import {serverPaths} from "../../../constants";
import config from '../../../config.json';

export const SubNode = types.model({
    name: types.string,
    type: types.string,
    entries: types.array(Entry),
    idCounter: types.optional(types.number, 1),
})
    .actions(self => ({
        addEntry: flow(function* (id:number, name: string, type: enumTypes, description: string, childNodeName: string, parentName: string, toServer: boolean) {
            if(toServer)
            {
                const data:IEntryData = {
                    name: name,
                    type: type,
                    description: description,
                    parentName: parentName,
                    childNodeName: childNodeName
                }

                yield axiosPost<IEntryData>(data, config.server.url + serverPaths.createEntry);
            }
            else {
                self.entries.push({id, name, type, description, parentName: childNodeName});
            }
        }),
    }));