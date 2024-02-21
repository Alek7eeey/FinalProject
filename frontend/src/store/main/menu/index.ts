import {flow, types} from "mobx-state-tree";
import enumTypes from "../../../enumTypes";
import {INodeData} from "../interface";
import {rootNodeName, serverPaths} from "../../../constants";
import {axiosDelete, axiosPost} from "../../../axios";
import config from "../../../config.json";
import {Node} from '../node';
export const Menu = types.model({
    nodes: types.array(Node),
})
    .actions(self => ({
        addNode: flow(function *(nodeName:string, nodeType:enumTypes, toServer: boolean){
            if(toServer)
            {
                const data: INodeData = {
                    name: nodeName,
                    type: nodeType,
                    parentName: rootNodeName
                }
                yield axiosPost<INodeData>(data, config.server.url + serverPaths.createNode);
            }
            self.nodes.push({ nodeName, nodeType, subNodes: [] });
        }),

        removeNode: flow(function* (name:string, type: enumTypes) {
            const subNodeToRemove = self.nodes.find((node) => node.nodeName === name && node.nodeType === type);
            if (subNodeToRemove) {

                const data: INodeData = {
                    name: name,
                    type: type,
                    parentName: rootNodeName
                }
                yield axiosDelete<INodeData>(data, config.server.url + serverPaths.deleteNode);
                self.nodes.remove(subNodeToRemove);
            }
        }),
    }));