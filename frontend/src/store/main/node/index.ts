import {flow, types} from "mobx-state-tree";
import enumTypes from "../../../enumTypes";
import {INodeData} from "../interface";
import {axiosDelete, axiosPost} from "../../../axios";
import config from "../../../config.json";
import {serverPaths} from "../../../constants";
import {SubNode} from "../subNode";

export const Node = types.model({
    nodeName: types.string,
    nodeType: types.string,
    subNodes: types.array(SubNode) || types.undefined || types.null,
})
    .actions(self => ({
        addSubNode:flow(function*  (name:string, type:enumTypes, parentName: string, toServer: boolean) {
            if(toServer)
            {
                const data:INodeData = {
                    name: name,
                    type: type,
                    parentName: parentName
                }
                yield axiosPost<INodeData>(data, config.server.url + serverPaths.createNode);
            }
            self.subNodes.push({ name, type });
        }),
        removeSubNode:flow (function* (name:string, type:enumTypes, parentName: string) {
            const subNodeToRemove = self.subNodes.find((subNode) => subNode.name === name && subNode.type === type);
            if (subNodeToRemove) {
                const data: INodeData = {
                    name: name,
                    type: type,
                    parentName: parentName
                }
                yield axiosDelete<INodeData>(data, config.server.url + serverPaths.deleteNode);
                self.subNodes.remove(subNodeToRemove);
            }
        }),
    }));